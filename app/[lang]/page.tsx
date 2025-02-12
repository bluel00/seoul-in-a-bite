import { RestaurantCard } from "../components/RestaurantCard";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { ThemeBadges } from "../components/ThemeBadges";
import { restaurantApi } from "@/shared/api/restaurants";
import type { Restaurant } from "@/entities/restaurant/model/types";
import { i18n, type Locale } from "../i18n/settings";
import { getDictionary } from "../i18n/dictionaries";

// 랜덤으로 지정된 개수의 레스토랑을 선택하는 함수
function getRandomRestaurants(restaurants: Restaurant[], count: number) {
  const shuffled = [...restaurants].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // 모든 레스토랑을 가져온 후 랜덤으로 6개 선택
  const allRestaurants = await restaurantApi.getRestaurants();
  const randomRestaurants = getRandomRestaurants(allRestaurants, 6);
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-[480px] px-4 py-6">
          <section className="mb-4">
            <SearchBar />
          </section>

          <section className="mb-8">
            <ThemeBadges />
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
