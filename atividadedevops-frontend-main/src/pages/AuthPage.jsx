import { useState } from 'react';
import { Gem } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const { register } = useApp();
  const [mode, setMode]   = useState('login');
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (mode === 'register' && !name.trim()) e.name = 'Nome obrigatório';
    if (!email.trim()) e.email = 'E-mail obrigatório';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'E-mail inválido';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      await register({
        name: mode === 'register' ? name.trim() : email.split('@')[0],
        email: email.trim(),
      });
      toast.success(mode === 'register' ? 'Conta criada!' : 'Bem-vindo de volta!');
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-sm space-y-8">

        {/* Logo */}
        <div className="text-center space-y-3">
          <Gem size={24} className="mx-auto" style={{ color: 'var(--gold)' }} />
          <div>
            <h1
              className="text-3xl font-light tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--text)', letterSpacing: '0.15em' }}
            >
              Favstore
            </h1>
            <p className="text-xs mt-2 tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              {mode === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}
            </p>
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: '1px', background: 'var(--border)' }} />

        {/* Form */}
        <div className="space-y-4">
          {mode === 'register' && (
            <Input
              label="Nome"
              placeholder="Seu nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
              error={errors.name}
            />
          )}
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
          <Button className="w-full" loading={loading} onClick={handleSubmit}>
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </Button>
        </div>

        {/* Toggle */}
        <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
          {mode === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
          <button
            className="underline underline-offset-2 transition-colors hover:text-[var(--gold)]"
            style={{ color: 'var(--text)' }}
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrors({}); }}
          >
            {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
          </button>
        </p>
      </div>
    </div>
  );
}
