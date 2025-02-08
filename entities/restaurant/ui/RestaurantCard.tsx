"use client";

import { Card } from "@/shared/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Restaurant } from "@/shared/lib/mock-data";

type RestaurantCardProps = Restaurant;

export function RestaurantCard({
  id,
  name,
  rating,
  reviewCount,
  address,
  imageUrl,
  priceRange,
  operatingHours,
  isOpen,
}: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${id}`} className="block w-full">
      <Card className="overflow-hidden">
        <div className="relative w-full h-[200px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={300}
            className="transition-transform hover:scale-105 duration-300"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            priority
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
            {isOpen ? "영업중" : "영업종료"}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-1">{name}</h3>
          <div className="flex items-center gap-1 text-sm mb-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500">({reviewCount})</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{address}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{priceRange}</span>
            <span className="text-gray-500">{operatingHours}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
