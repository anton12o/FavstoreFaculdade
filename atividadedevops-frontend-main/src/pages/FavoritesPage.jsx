import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, allProducts } = useApp();

  // Filtra produtos favoritados a partir da lista global do contexto
  const favoriteProducts = (allProducts ?? []).filter(p => favorites.has(p.id));
  const count = favoriteProducts.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 space-y-10">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--gold)' }}>
            Sua lista
          </p>
          <h1
            className="text-6xl font-light leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--text)', letterSpacing: '-0.02em' }}
          >
            Salvos
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {count} {count === 1 ? 'produto salvo' : 'produtos salvos'}
          </p>
        </div>

        <Link
          to="/shop"
          className="flex items-center gap-2 text-xs transition-opacity hover:opacity-60"
          style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}
        >
          <ArrowLeft size={13} />
          Continuar comprando
        </Link>
      </div>

      {/* Vazio */}
      {count === 0 && (
        <div
          className="flex flex-col items-center justify-center py-32 gap-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div
            className="w-20 h-20 flex items-center justify-center"
            style={{ border: '1px solid var(--border)' }}
          >
            <Heart size={28} style={{ color: 'var(--border)' }} />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Nenhum produto salvo ainda
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Explore a coleção e salve o que gostar
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs px-6 py-2.5 transition-all duration-200 hover:opacity-80"
            style={{
              background: 'var(--text)',
              color: 'var(--bg)',
              letterSpacing: '0.08em',
            }}
          >
            Explorar coleção
          </Link>
        </div>
      )}

      {/* Grid de favoritos */}
      {count > 0 && (
        <>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px"
            style={{ background: 'var(--border)' }}
          >
            {favoriteProducts.map(p => (
              <div key={p.id} style={{ background: 'var(--bg)' }}>
                <ProductCard
                  product={p}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  showRemoveLabel
                />
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div
            className="flex items-center justify-between pt-6"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Total estimado:{' '}
              <span style={{ color: 'var(--text)', fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}>
                ${favoriteProducts.reduce((acc, p) => acc + p.price, 0).toFixed(2)}
              </span>
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Clique no ❤ para remover um item
            </p>
          </div>
        </>
      )}
    </div>
  );
}