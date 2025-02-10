import {
  MOCK_RESTAURANTS,
  MOCK_THEME_RESTAURANTS,
} from "@/shared/lib/mock-data";
import { RestaurantCard } from "@/entities/restaurant/ui/RestaurantCard";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

function getCategoryName(slug: string): string {
  const categoryMap: { [key: string]: string } = {
    korean: "한식",
    chinese: "중식",
    japanese: "일식",
    dessert: "디저트",
    "24-hours": "24시간 영업",
    vegan: "비건/채식",
    michelin: "미슐랭 가이드 선정 맛집",
    sns: "SNS에서 인기 있는 맛집",
    date: "데이트하기 좋은 맛집",
    local: "현지인이 추천하는 맛집",
    value: "가성비 좋은 맛집",
    taiwan: "대만인이 많이 찾는 맛집",
  };

  return categoryMap[slug] || slug;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  // 카테고리별 맛집과 테마별 맛집을 모두 가져옵니다
  const categoryRestaurants = MOCK_RESTAURANTS.filter(
    (restaurant) => restaurant.category === slug
  );
  const themeRestaurants = MOCK_THEME_RESTAURANTS.filter(
    (restaurant) => restaurant.theme === slug
  );

  // 두 배열을 합칩니다
  const restaurants = slug.match(/^(michelin|sns|date|local|value|taiwan)$/)
    ? themeRestaurants
    : categoryRestaurants;

  return (
    <main className="min-h-screen bg-background pt-safe-top">
      <div className="mx-auto w-full max-w-[480px] px-4 py-6">
        <section className="mb-6">
          <h1 className="text-2xl font-bold">{getCategoryName(slug)}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {restaurants.length}개의 맛집이 있습니다
          </p>
        </section>

        <section className="space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </section>
      </div>
    </main>
  );
}
