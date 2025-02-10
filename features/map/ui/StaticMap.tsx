"use client";

import { useEffect, useRef, useState } from "react";

interface StaticMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: naver.maps.MapConstructor;
        LatLng: naver.maps.LatLngConstructor;
        Marker: naver.maps.MarkerConstructor;
        InfoWindow: naver.maps.InfoWindowConstructor;
        Size: naver.maps.SizeConstructor;
      };
    };
  }
}

export function StaticMap({ latitude, longitude, name }: StaticMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver?.maps) {
        console.error("Naver Maps API is not loaded");
        return;
      }

      if (!mapRef.current) {
        console.error("Map container element not found");
        return;
      }

      try {
        const position = new window.naver.maps.LatLng(latitude, longitude);
        const mapOptions: naver.maps.MapOptions = {
          center: position,
          zoom: 17,
          draggable: false,
          pinchZoom: false,
          scrollWheel: false,
          keyboardShortcuts: false,
          disableKineticPan: true,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          mapTypeControl: false,
        };

        const map = new window.naver.maps.Map(mapRef.current, mapOptions);

        // 마커 생성
        const marker = new window.naver.maps.Marker({
          position,
          map,
        });

        // 정보창 생성
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${name}</div>`,
        });

        infoWindow.open(map, marker);
        setIsMapInitialized(true);

        // 지도 크기 재조정
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
          if (mapRef.current) {
            map.setSize(
              new window.naver.maps.Size(
                mapRef.current.clientWidth,
                mapRef.current.clientHeight
              )
            );
          }
        }, 300);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    // 지도 API 로드 확인 및 초기화
    if (window.naver?.maps) {
      initializeMap();
    } else {
      const script = document.querySelector('script[src*="maps.js"]');
      script?.addEventListener("load", initializeMap);
    }

    // 클린업
    return () => {
      const script = document.querySelector('script[src*="maps.js"]');
      script?.removeEventListener("load", initializeMap);
    };
  }, [latitude, longitude, name]);

  return (
    <div
      className="flex-shrink-0 relative w-full"
      style={{
        height: "400px",
        minHeight: "400px",
      }}
    >
      {!isMapInitialized && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          지도를 불러오는 중...
        </div>
      )}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
