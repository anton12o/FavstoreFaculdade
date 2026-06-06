import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Gem } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { user, favorites, logout } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/shop" className="flex items-center gap-2 transition-opacity hover:opacity-70">
          <Gem size={14} style={{ color: 'var(--gold)' }} />
          <span
            className="text-sm tracking-[0.18em] uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--text)',
              fontWeight: 500,
            }}
          >
            Favstore
          </span>
        </Link>

        {/* Nav central */}
        <nav className="flex items-center gap-8">
          <NavLink
            to="/shop"
            className="text-xs tracking-[0.12em] uppercase transition-colors"
            style={({ isActive }) => ({
              color: isActive ? 'var(--text)' : 'var(--muted)',
              fontWeight: isActive ? 500 : 400,
            })}
          >
            Coleção
          </NavLink>

          <NavLink
            to="/favorites"
            className="relative text-xs tracking-[0.12em] uppercase transition-colors"
            style={({ isActive }) => ({
              color: isActive ? 'var(--text)' : 'var(--muted)',
              fontWeight: isActive ? 500 : 400,
            })}
          >
            Salvos
            {favorites.size > 0 && (
              <span
                className="absolute -top-2 -right-4 font-medium"
                style={{ color: 'var(--gold)', fontSize: '10px' }}
              >
                {favorites.size}
              </span>
            )}
          </NavLink>
        </nav>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <div
              className="w-7 h-7 flex items-center justify-center text-xs font-medium flex-shrink-0"
              style={{
                background: 'var(--gold-light)',
                color: 'var(--gold-dark)',
                borderRadius: '50%',
              }}
            >
              {user?.name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <span className="text-xs hidden sm:block" style={{ color: 'var(--muted)' }}>
              {user?.name?.split(' ')[0]}
            </span>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 top-full mt-3 w-44 z-50"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>
                    {user?.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-xs transition-colors hover:opacity-70"
                  style={{ color: 'var(--muted)' }}
                >
                  <LogOut size={13} />
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}