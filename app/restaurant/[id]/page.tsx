import {
  MOCK_RESTAURANTS,
  MOCK_THEME_RESTAURANTS,
  Restaurant,
} from "@/shared/lib/mock-data";
import { RestaurantDetail } from "@/entities/restaurant/ui/RestaurantDetail";
import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  // 모든 레스토랑 데이터를 합칩니다
  const allRestaurants: Restaurant[] = [
    ...MOCK_RESTAURANTS,
    ...MOCK_THEME_RESTAURANTS,
  ];

  const restaurant = allRestaurants.find(
    (r) => r.id === parseInt(params.id, 10)
  );

  if (!restaurant) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-safe-top">
      <div className="pt-4">
        <RestaurantDetail restaurant={restaurant} />
      </div>
    </main>
  );
}
