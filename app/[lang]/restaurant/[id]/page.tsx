import { restaurantApi } from "@/shared/api/restaurant/restaurantAdapter";
import { RestaurantDetail } from "@/widgets/restaurant/ui/RestaurantDetail";
import { notFound } from "next/navigation";
import { DetailHeader } from "@/entities/restaurant/ui/DetailHeader";

interface RestaurantDetailPageProps {
  params: {
    id: string;
  };
}

export default async function RestaurantDetailPage({
  params: { id },
}: RestaurantDetailPageProps) {
  const restaurant = await restaurantApi.getRestaurantDetail(id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="fixed inset-0 bg-orange-100 z-50 overflow-y-auto">
      <DetailHeader
        title={restaurant.name}
        rating={restaurant.rating ?? undefined}
      />
      <div className="mx-auto w-full max-w-[480px] pt-4">
        <RestaurantDetail restaurant={restaurant} />
      </div>
    </div>
  );
}
