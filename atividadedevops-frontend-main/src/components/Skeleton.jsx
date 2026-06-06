export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="h-48 shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 rounded shimmer" />
        <div className="h-4 rounded shimmer w-3/4" />
        <div className="flex justify-between">
          <div className="h-3 w-16 rounded shimmer" />
          <div className="h-3 w-12 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl"
      style={{ background: 'var(--surface)' }}>
      <div className="w-9 h-9 rounded-full shimmer flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 rounded shimmer w-1/3" />
        <div className="h-3 rounded shimmer w-1/2" />
      </div>
    </div>
  );
}
