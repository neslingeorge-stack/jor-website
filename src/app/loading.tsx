export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-steel border-t-ember" />
        <p className="font-heading text-sm text-silver">Loading...</p>
      </div>
    </div>
  );
}
