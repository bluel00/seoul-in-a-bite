import { restaurantApi } from "@/shared/api/restaurants";
import { RestaurantDetail } from "@/widgets/restaurant/ui/RestaurantDetail";
import { notFound } from "next/navigation";
import { DetailHeader } from "@/app/components/DetailHeader";

interface RestaurantDetailPageProps {
  params: Promise<{ id: string }> | undefined;
}

export default async function RestaurantDetailPage({
  params,
}: RestaurantDetailPageProps) {
  if (!params) {
    notFound();
  }

  const { id } = await params;
  const restaurant = await restaurantApi.getRestaurantDetail(id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="fixed inset-0 bg-orange-100 z-50 overflow-y-auto">
      <DetailHeader title={restaurant.name} rating={restaurant.rating} />
      <div className="mx-auto w-full max-w-[480px] pt-4">
        <RestaurantDetail restaurant={restaurant} />
      </div>
    </div>
  );
}
