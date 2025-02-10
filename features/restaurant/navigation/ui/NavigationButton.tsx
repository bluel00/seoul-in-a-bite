"use client";

import { Button } from "@/shared/ui/button";
import { Navigation2 } from "lucide-react";

interface NavigationButtonProps {
  name: string;
  latitude: number;
  longitude: number;
}

export function NavigationButton({
  name,
  latitude,
  longitude,
}: NavigationButtonProps) {
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
    <Button
      onClick={handleNavigation}
      className="w-full flex items-center justify-center gap-2 h-14 text-lg shadow-md"
      variant="default"
    >
      <Navigation2 className="h-5 w-5" />
      길찾기
    </Button>
  );
}
