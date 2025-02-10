import { Utensils } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-primary z-50">
        <div className="mx-auto w-full max-w-[480px] px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-white" />
            <h1 className="text-lg font-bold text-white">Seoul in a Bite</h1>
          </Link>
        </div>
      </header>
      <div className="h-[60px]" />
    </>
  );
}
