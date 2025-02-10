import { CategorySelect } from "@/widgets/CategorySelect";
import { ThemeCard } from "@/entities/restaurant/ui/ThemeCard";
import { MOCK_RESTAURANT_THEMES } from "@/shared/lib/mock-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* 모바일 컨테이너 */}
      <div className="mx-auto w-full max-w-[480px] px-4 py-6">
        {/* 카테고리 선택 섹션 */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            서울의 맛집을 찾아보세요
          </h1>
          <CategorySelect />
        </section>

        {/* 테마 섹션 */}
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
      </div>
    </main>
  );
}
