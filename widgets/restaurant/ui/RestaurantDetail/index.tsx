"use client";

import { Restaurant } from "@/entities/restaurant/model/types";
import Image from "next/image";
import { NavigationButton } from "@/features/restaurant/navigation/ui/NavigationButton";
import { RestaurantMap } from "@/features/restaurant/map/ui/RestaurantMap";

interface RestaurantDetailProps {
  restaurant: Restaurant;
}

export function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const { name, imageUrl, latitude, longitude } = restaurant;

  return (
    <div className="bg-orange-100 min-h-screen px-4 pt-20 pb-8">
      <div className="mx-auto max-w-[480px] flex flex-col gap-12">
        {/* 메인 이미지 및 기본 정보 */}
        <section className="w-full">
          <div className="bg-white rounded-3xl p-4">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={name}
                width={480}
                height={360}
                className="object-cover rounded-2xl"
                sizes="(max-width: 480px) 100vw, 480px"
                priority
                quality={75}
              />
            </div>
          </div>
        </section>

        {/* 지도 */}
        <section className="w-full">
          <RestaurantMap
            name={name}
            latitude={latitude}
            longitude={longitude}
          />
        </section>

        {/* 길찾기 버튼 */}
        <section className="w-full">
          <NavigationButton
            name={name}
            latitude={latitude}
            longitude={longitude}
          />
        </section>
      </div>
    </div>
  );
}
