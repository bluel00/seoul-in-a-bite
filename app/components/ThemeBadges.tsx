import Link from "next/link";
import type { ThemeInfo } from "@/shared/api/restaurants";

interface ThemeBadgesProps {
  themes: ThemeInfo[];
}

export function ThemeBadges({ themes }: ThemeBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((theme) => (
        <Link
          key={theme.slug}
          href={`/theme/${theme.slug}`}
          className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 active:bg-primary/75 transition-colors touch-manipulation"
        >
          #{theme.title}
        </Link>
      ))}
    </div>
  );
}
