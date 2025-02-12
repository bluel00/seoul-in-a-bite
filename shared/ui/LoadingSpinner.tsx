import { useLoadingStore } from "@/shared/store/loadingStore";

export default function LoadingSpinner() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
}
