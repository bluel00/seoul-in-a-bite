import { Utensils, X } from "lucide-react";
import Link from "next/link";
import { LanguageSelector } from "@/features/language/ui/LanguageSelector";

interface HeaderProps {
  showCloseButton?: boolean;
}

export function Header({ showCloseButton }: HeaderProps) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-primary z-50">
        <div className="mx-auto w-full max-w-[480px] px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Utensils className="h-6 w-6 text-white" />
              <h1 className="text-lg font-bold text-white">Seoul in a Bite</h1>
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              {showCloseButton && (
                <Link
                  href="/"
                  className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-[60px]" />
    </>
  );
}
