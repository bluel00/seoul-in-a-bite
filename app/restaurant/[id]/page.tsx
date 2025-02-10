import { getRestaurantById, Restaurant } from "@/shared/lib/mock-data";
import { RestaurantDetail } from "@/widgets/restaurant/ui/RestaurantDetail";
import { notFound } from "next/navigation";
import { DetailHeader } from "@/app/components/DetailHeader";

interface RestaurantDetailPageProps {
  params: {
    id: string;
  };
}

export default function RestaurantDetailPage({
  params: { id },
}: RestaurantDetailPageProps) {
  const restaurant = getRestaurantById(id);

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
