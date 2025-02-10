import {
  MOCK_RESTAURANTS,
  MOCK_THEME_RESTAURANTS,
  Restaurant,
} from "@/shared/lib/mock-data";
import { RestaurantDetail } from "@/entities/restaurant/ui/RestaurantDetail";
import { notFound } from "next/navigation";
import { DetailHeader } from "@/app/components/DetailHeader";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = params;

  // 모든 레스토랑 데이터를 합칩니다
  const allRestaurants: Restaurant[] = [
    ...MOCK_RESTAURANTS,
    ...MOCK_THEME_RESTAURANTS,
  ];

  const restaurant = allRestaurants.find((r) => r.id === parseInt(id, 10));

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <DetailHeader title={restaurant.name} rating={restaurant.rating} />
      <div className="mx-auto w-full max-w-[480px] pt-4">
        <RestaurantDetail restaurant={restaurant} />
      </div>
    </div>
  );
}
