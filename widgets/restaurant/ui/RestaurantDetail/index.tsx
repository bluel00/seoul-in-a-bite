"use client";

import { Restaurant } from "@/entities/restaurant/model/types";
import Image from "next/image";
import { NavigationButton } from "@/features/restaurant/navigation/ui/NavigationButton";
import { RestaurantMap } from "@/features/restaurant/map/ui/RestaurantMap";

interface RestaurantDetailProps {
  restaurant: Restaurant;
}

export function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const { name, imageUrl, latitude, longitude, tags = [] } = restaurant;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[480px] flex flex-col gap-4 px-4">
        {/* 메인 이미지 및 기본 정보 */}
        <div className="bg-white overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={480}
            height={360}
            className="w-full h-auto object-cover"
            sizes="(max-width: 480px) 100vw, 480px"
            priority
            quality={75}
          />
        </div>

        {/* 태그 영역 */}
        {tags.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">태그</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-medium shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 지도 */}
        <div>
          <RestaurantMap
            name={name}
            latitude={latitude}
            longitude={longitude}
          />
        </div>

        {/* 길찾기 버튼 */}
        <div>
          <NavigationButton
            name={name}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
      </div>
    </div>
  );
}
