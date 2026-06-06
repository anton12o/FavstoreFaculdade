export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all
          focus:ring-2 focus:ring-[var(--volt)]/40 placeholder:text-[var(--muted)]"
        style={{
          background: 'var(--surface-2)',
          border: `1px solid ${error ? 'var(--coral)' : 'var(--border)'}`,
          color: 'var(--text)',
        }}
      />
      {error && <p className="text-xs" style={{ color: 'var(--coral)' }}>{error}</p>}
    </div>
  );
}
