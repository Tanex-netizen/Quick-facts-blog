export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
        <div className="mt-4 text-center text-ink-muted text-sm">Loading...</div>
      </div>
    </div>
  );
}
