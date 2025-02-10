import { MOCK_RESTAURANTS, THEMES } from "@/shared/lib/mock-data";
import { RestaurantCard } from "@/app/components/RestaurantCard";
import { Header } from "@/app/components/Header";

interface ThemePageProps {
  params: {
    slug: string;
  };
}

export default function ThemePage({ params }: ThemePageProps) {
  const theme = THEMES.find((t) => t.slug === params.slug);
  const restaurants = MOCK_RESTAURANTS.filter((r) => r.theme === params.slug);

  if (!theme) {
    return <div>Theme not found</div>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-[480px] px-4 py-6">
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Theme
              </span>
              <h1 className="text-xl font-semibold">{theme.label}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {restaurants.length}개의 맛집을 찾았습니다
            </p>
          </section>

          <section className="grid grid-cols-2 gap-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                description={restaurant.description}
                imageUrl={restaurant.imageUrl}
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
