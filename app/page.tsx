import { SearchBar } from "@/features/search/ui/SearchBar";
import { ThemeCard } from "@/entities/restaurant/ui/ThemeCard";
import { MOCK_RESTAURANT_THEMES } from "@/shared/lib/mock-data";

export default function Home() {
  return (
    <main className="max-w-md mx-auto px-4 py-6">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          서울의 맛집을 찾아보세요
        </h1>
        <SearchBar />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">테마별 맛집</h2>
        <div className="grid grid-cols-2 gap-3">
          {MOCK_RESTAURANT_THEMES.map((theme) => (
            <ThemeCard
              key={theme.id}
              id={theme.id}
              title={theme.title}
              imageUrl={theme.imageUrl}
              slug={theme.slug}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
