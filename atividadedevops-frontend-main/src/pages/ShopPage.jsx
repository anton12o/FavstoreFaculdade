import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { SkeletonCard } from '../components/Skeleton';

export default function ShopPage() {
  const { favorites, toggleFavorite, allProducts, productsLoading } = useApp();
  const [search, setSearch]     = useState('');
  const [sort, setSort]         = useState('default');

  const handleToggle = useCallback((product) => {
    toggleFavorite(product);
  }, [toggleFavorite]);

  const filtered = allProducts
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating')     return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
      return 0;
    });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">

      {/* Hero */}
      <div className="space-y-3">
        <p
          className="text-xs tracking-[0.25em] uppercase"
          style={{ color: 'var(--gold)' }}
        >
          Coleção exclusiva
        </p>
        <h1
          className="font-light leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
          }}
        >
          Joias &amp; Acessórios
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Peças selecionadas para momentos especiais
        </p>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--muted)' }}
          />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar peça..."
            className="w-full pl-9 pr-9 py-2.5 text-sm outline-none"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
              style={{ color: 'var(--muted)' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="text-sm px-3 py-2.5 outline-none cursor-pointer"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            minWidth: '160px',
          }}
        >
          <option value="default">Relevância</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
        </select>
      </div>

      {/* Contagem */}
      {!productsLoading && (
        <p className="text-xs" style={{ color: 'var(--muted)', marginTop: '-1.5rem' }}>
          {filtered.length} {filtered.length === 1 ? 'peça encontrada' : 'peças encontradas'}
          {search && ` para "${search}"`}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {productsLoading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                isFavorite={favorites.has(p.id)}
                onToggleFavorite={handleToggle}
              />
            ))
        }
      </div>

      {!productsLoading && filtered.length === 0 && (
        <div className="text-center py-24 space-y-3">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Nenhuma peça encontrada
            {search && ` para "${search}"`}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-xs underline underline-offset-4 transition-opacity hover:opacity-60"
              style={{ color: 'var(--gold)' }}
            >
              Limpar busca
            </button>
          )}
        </div>
      )}
    </div>
  );
}
