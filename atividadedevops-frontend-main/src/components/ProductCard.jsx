import { Heart, Star } from 'lucide-react';

export default function ProductCard({ product, isFavorite, onToggleFavorite, showRemoveLabel = false }) {
  const rate  = product.rating?.rate ?? 0;
  const count = product.rating?.count ?? 0;

  return (
    <div
      className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: 'var(--surface)' }}
    >
      {/* Imagem */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'var(--surface-2)', aspectRatio: '1 / 1' }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-10 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Botão favoritar — visível sempre se ativo, no hover se inativo */}
        <button
          onClick={() => onToggleFavorite?.(product)}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200 active:scale-90"
          style={{
            background: isFavorite ? 'var(--gold)' : 'var(--surface)',
            border: '1px solid',
            borderColor: isFavorite ? 'var(--gold)' : 'var(--border)',
            color: isFavorite ? '#fff' : 'var(--muted)',
            opacity: isFavorite ? 1 : 0,
            // hover handled via group CSS below
          }}
        >
          <Heart size={13} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Duplicate button for hover state (CSS group trick) */}
        <button
          onClick={() => onToggleFavorite?.(product)}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200 active:scale-90 opacity-0 group-hover:opacity-100"
          style={{
            background: isFavorite ? 'var(--gold)' : 'var(--surface)',
            border: '1px solid',
            borderColor: isFavorite ? 'var(--gold)' : 'var(--border)',
            color: isFavorite ? '#fff' : 'var(--muted)',
          }}
        >
          <Heart size={13} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col p-4 flex-1" style={{ gap: '12px' }}>
        {/* Título com altura fixa para alinhar cards */}
        <p
          className="text-sm leading-snug line-clamp-2"
          style={{
            color: 'var(--text)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            minHeight: '2.8rem', // garante altura igual em todos os cards
          }}
        >
          {product.title}
        </p>

        {/* Rodapé: avaliação + preço */}
        <div
          className="flex items-center justify-between pt-3 mt-auto"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-1">
            <Star size={11} fill="var(--gold)" stroke="none" />
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              {rate.toFixed(1)}
              <span style={{ opacity: 0.5 }}> ({count})</span>
            </span>
          </div>
          <span
            style={{
              color: 'var(--gold-dark)',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Botão remover — só na página de favoritos */}
        {showRemoveLabel && (
          <button
            onClick={() => onToggleFavorite?.(product)}
            className="flex items-center justify-center gap-1.5 w-full py-2 text-xs transition-all duration-200 hover:opacity-60"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <Heart size={11} fill="var(--gold)" stroke="none" />
            Remover
          </button>
        )}
      </div>
    </div>
  );
}