import Link from "next/link";
import { THEMES } from "@/shared/lib/mock-data";

export function ThemeBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map((theme) => (
        <Link
          key={theme.slug}
          href={`/theme/${theme.slug}`}
          className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 active:bg-primary/75 transition-colors touch-manipulation"
        >
          #{theme.label}
        </Link>
      ))}
    </div>
  );
}
