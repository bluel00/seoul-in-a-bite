"use client";

import { Restaurant } from "@/shared/lib/mock-data";
import { Card } from "@/shared/ui/card";
import { Star, MapPin, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

interface RestaurantDetailProps {
  restaurant: Restaurant;
}

export function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const {
    name,
    imageUrl,
    rating,
    reviewCount,
    address,
    operatingHours,
    priceRange,
    isOpen,
    category,
  } = restaurant;

  return (
    <div className="mx-auto w-full max-w-[480px] px-4 space-y-6">
      {/* 메인 이미지 및 기본 정보 */}
      <Card className="overflow-hidden border-0 shadow-none">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={480}
            height={360}
            className="object-cover"
            sizes="(max-width: 480px) 100vw, 480px"
            priority
            quality={75}
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md">
            {isOpen ? "영업중" : "영업종료"}
          </div>
        </div>

        <div className="py-6 space-y-4">
          {/* 레스토랑 이름 및 카테고리 */}
          <div>
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <span className="text-sm text-gray-500 capitalize">{category}</span>
          </div>

          {/* 평점 및 리뷰 수 */}
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-lg">{rating}</span>
            <span className="text-gray-500">({reviewCount} 리뷰)</span>
          </div>

          {/* 주소, 영업시간, 가격대 정보 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>{operatingHours}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="h-5 w-5" />
              <span>{priceRange}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
