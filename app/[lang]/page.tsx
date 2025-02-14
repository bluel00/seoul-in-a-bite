import { RestaurantCard } from "@/entities/restaurant/ui/RestaurantCard";
import { Header } from "@/features/navigation/ui/Header";
import { SearchBar } from "@/features/search/ui/SearchBar";
import { ThemeBadges } from "@/features/theme/ui/ThemeBadges";
import { restaurantService } from "@/shared/api/restaurant/restaurantPort";
import type { Restaurant } from "@/entities/restaurant/model/types";
import { i18n, type Locale } from "@/shared/i18n/settings";
import { getDictionary } from "@/shared/i18n/dictionaries";

// 랜덤으로 지정된 개수의 레스토랑을 선택하는 함수
function getRandomRestaurants(restaurants: Restaurant[], count: number) {
  const shuffled = [...restaurants].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

interface HomePageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Home(props: HomePageProps) {
  const params = await props.params;
  const lang = params.lang;
  const dictionary = await getDictionary(lang);
  const allRestaurants = await restaurantService.getRestaurants();
  const randomRestaurants = getRandomRestaurants(allRestaurants, 6);
  const themes = await restaurantService.getAllThemes();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-[480px] px-4 py-6">
          <section className="mb-4">
            <SearchBar />
          </section>

          <section className="mb-8">
            <ThemeBadges themes={themes} />
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {dictionary.recommended}
              </span>
              <h2 className="text-xl font-semibold">
                {dictionary.restaurantList}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {randomRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  description={restaurant.description}
                  imageUrl={restaurant.imageUrl}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
