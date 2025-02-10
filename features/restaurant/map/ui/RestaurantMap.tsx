"use client";

import { StaticMap } from "@/features/map/ui/StaticMap";

interface RestaurantMapProps {
  name: string;
  latitude: number;
  longitude: number;
}

export function RestaurantMap({
  name,
  latitude,
  longitude,
}: RestaurantMapProps) {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="w-full overflow-hidden rounded-xl">
        <StaticMap latitude={latitude} longitude={longitude} name={name} />
      </div>
    </div>
  );
}
