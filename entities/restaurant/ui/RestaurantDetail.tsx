"use client";

import { Restaurant } from "@/shared/lib/mock-data";
import { Card } from "@/shared/ui/card";
import { Star, MapPin, Clock, DollarSign, Navigation2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";

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
    latitude,
    longitude,
  } = restaurant;

  const handleNavigation = () => {
    // 모바일 기기 확인
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // 네이버 지도 URL
    const naverMapsUrl = `nmap://place?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(
      name
    )}&appname=seoul-in-a-bite`;

    // 카카오 지도 URL
    const kakaoMapsUrl = `kakaomap://look?p=${latitude},${longitude}`;

    // 구글 지도 URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    if (isMobile) {
      // 모바일에서는 네이버 지도나 카카오맵 앱으로 연결 시도
      try {
        window.location.href = naverMapsUrl;
        setTimeout(() => {
          window.location.href = kakaoMapsUrl;
        }, 1000);
      } catch {
        // 앱이 없는 경우 구글 지도로 연결
        window.location.href = googleMapsUrl;
      }
    } else {
      // 데스크톱에서는 구글 지도로 연결
      window.open(googleMapsUrl, "_blank");
    }
  };

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

          {/* 길찾기 버튼 */}
          <Button
            onClick={handleNavigation}
            className="w-full flex items-center justify-center gap-2"
            variant="default"
          >
            <Navigation2 className="h-5 w-5" />
            길찾기
          </Button>
        </div>
      </Card>
    </div>
  );
}
