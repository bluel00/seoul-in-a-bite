import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface DetailHeaderProps {
  title: string;
  rating?: number;
}

export function DetailHeader({ title, rating }: DetailHeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 bg-background z-50 border-b">
      <div className="mx-auto w-full max-w-[480px] px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1 -ml-1 hover:bg-accent rounded-full transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium text-orange-500 truncate">
              {title}
            </h1>
          </div>
          {rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
