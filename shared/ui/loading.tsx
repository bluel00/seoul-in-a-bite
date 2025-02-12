export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
}
