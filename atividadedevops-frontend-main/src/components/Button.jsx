export default function Button({
  children, onClick, type = 'button',
  variant = 'primary', size = 'md',
  loading = false, disabled = false,
  className = '', icon: Icon,
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variants = {
    primary: 'bg-[var(--volt)] text-black hover:brightness-110 active:scale-95',
    secondary: 'bg-white/8 text-[var(--text)] hover:bg-white/12 active:scale-95 border border-[var(--border)]',
    danger: 'bg-[var(--coral)] text-white hover:brightness-110 active:scale-95',
    ghost: 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 active:scale-95',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : 16} />
      ) : null}
      {children}
    </button>
  );
}
