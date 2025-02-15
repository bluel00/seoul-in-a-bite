import { db } from "@/shared/lib/database";
import type { Restaurant as SupabaseRestaurant } from "./schema";
import type { Restaurant as FrontendRestaurant } from "@/entities/restaurant/model/types";

// 기본 타입 정의
interface DbRestaurant extends SupabaseRestaurant {
  id: string;
  rating?: number;
  review_count?: number;
  description?: string;
  price_range?: string;
  restaurant_locations?: { latitude: number; longitude: number }[];
  restaurant_tags?: { tags: { name: string } }[];
  business_hours?: {
    start_time?: string;
    end_time?: string;
  }[];
}

interface RestaurantWithDistance extends FrontendRestaurant {
  distance: number;
}

interface ThemeInfo {
  id: string;
  title: string;
  imageUrl: string;
  slug: string;
}

function getRestaurantImage(category: string, id: string): string {
  const categoryImages: Record<string, string[]> = {
    korean: [
      "/images/restaurants/korean-1.png", // 국수
      "/images/restaurants/korean-2.png", // 육회
      "/images/restaurants/korean-3.png", // 삼겹살
      "/images/restaurants/korean-4.png", // 국물요리
      "/images/restaurants/korean-5.png", // 전골
      "/images/restaurants/korean-6.png", // 김치찌개
      "/images/restaurants/korean-7.png", // 새로운 이미지
      "/images/restaurants/korean-8.png", // 새로운 이미지
      "/images/restaurants/korean-9.png", // 새로운 이미지
      "/images/restaurants/korean-10.png", // 새로운 이미지
    ],
    // 다른 카테고리 이미지들도 추가 가능
  };

  const images = categoryImages[category] || categoryImages["korean"];
  const index = parseInt(id.replace(/\D/g, "")) % images.length;
  return images[index];
}

// 데이터 변환을 위한 어댑터 함수
function adaptRestaurant(dbRestaurant: DbRestaurant): FrontendRestaurant {
  return {
    id: dbRestaurant.id,
    name: dbRestaurant.name,
    description: dbRestaurant.description || "",
    category: dbRestaurant.category,
    rating: dbRestaurant.rating || null,
    reviewCount: dbRestaurant.review_count || 0,
    address: dbRestaurant.address,
    imageUrl: getRestaurantImage(dbRestaurant.category, dbRestaurant.id),
    priceRange: dbRestaurant.price_range || "",
    operatingHours: dbRestaurant.business_hours?.[0]?.start_time
      ? `${dbRestaurant.business_hours[0].start_time} - ${dbRestaurant.business_hours[0].end_time}`
      : "",
    isOpen: true,
    latitude:
      dbRestaurant.restaurant_locations?.[0]?.latitude ??
      getDefaultLocation(dbRestaurant.category, dbRestaurant.address).latitude,
    longitude:
      dbRestaurant.restaurant_locations?.[0]?.longitude ??
      getDefaultLocation(dbRestaurant.category, dbRestaurant.address).longitude,
    tags: dbRestaurant.restaurant_tags?.map((rt) => rt.tags.name) ?? [],
    phoneNumber: dbRestaurant.phone ?? undefined,
    theme: undefined,
    snsUrl: undefined,
  };
}

// 거리 계산 유틸리티 함수
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // 지구의 반경 (미터)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// 카테고리와 주소에 따른 기본 위치 정보를 반환하는 함수
function getDefaultLocation(category: string, address: string) {
  // 주소에서 구 정보 추출
  const district = address.split(" ")[1] || "";

  // 구별 기본 위치
  const districtLocations: Record<
    string,
    { latitude: number; longitude: number }
  > = {
    강남구: { latitude: 37.5172, longitude: 127.0473 },
    서초구: { latitude: 37.4837, longitude: 127.0324 },
    종로구: { latitude: 37.5704, longitude: 126.9922 },
    중구: { latitude: 37.5642, longitude: 126.9975 },
    마포구: { latitude: 37.5665, longitude: 126.9018 },
    용산구: { latitude: 37.5384, longitude: 126.9654 },
    성동구: { latitude: 37.5635, longitude: 127.0365 },
    광진구: { latitude: 37.5385, longitude: 127.0825 },
    동대문구: { latitude: 37.5744, longitude: 127.0395 },
    중랑구: { latitude: 37.6066, longitude: 127.0927 },
    성북구: { latitude: 37.5894, longitude: 127.0167 },
    강북구: { latitude: 37.6396, longitude: 127.0257 },
    도봉구: { latitude: 37.6688, longitude: 127.0471 },
    노원구: { latitude: 37.6542, longitude: 127.0568 },
    은평구: { latitude: 37.6026, longitude: 126.9295 },
    서대문구: { latitude: 37.5791, longitude: 126.9368 },
    양천구: { latitude: 37.5171, longitude: 126.8665 },
    강서구: { latitude: 37.5509, longitude: 126.8497 },
    구로구: { latitude: 37.4952, longitude: 126.8878 },
    금천구: { latitude: 37.4566, longitude: 126.8954 },
    영등포구: { latitude: 37.5264, longitude: 126.8965 },
    동작구: { latitude: 37.5121, longitude: 126.9395 },
    관악구: { latitude: 37.4784, longitude: 126.9516 },
    송파구: { latitude: 37.5145, longitude: 127.106 },
    강동구: { latitude: 37.5492, longitude: 127.1464 },
  };

  // 카테고리별 위치 오프셋 (약간의 랜덤성 부여)
  const offset = {
    latitude: (Math.random() - 0.5) * 0.01, // ±0.005 정도의 변화
    longitude: (Math.random() - 0.5) * 0.01,
  };

  // 구에 해당하는 기본 위치가 있으면 사용, 없으면 강남구 기본값 사용
  const baseLocation =
    districtLocations[district] || districtLocations["강남구"];

  return {
    latitude: baseLocation.latitude + offset.latitude,
    longitude: baseLocation.longitude + offset.longitude,
  };
}

// API 객체
export const restaurantApi = {
  async getRestaurants(): Promise<FrontendRestaurant[]> {
    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations(*),
        restaurant_tags(tags(*)),
        business_hours(*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as DbRestaurant[]).map(adaptRestaurant);
  },

  async getRestaurantDetail(id: string): Promise<FrontendRestaurant> {
    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations(*),
        business_hours(*),
        restaurant_tags(tags(*))
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return adaptRestaurant(data as DbRestaurant);
  },

  async getRestaurantsByCategory(
    category: string
  ): Promise<FrontendRestaurant[]> {
    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations(*),
        restaurant_tags(tags(*)),
        business_hours(*)
      `
      )
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as DbRestaurant[]).map(adaptRestaurant);
  },

  async getRestaurantsByTag(tagName: string): Promise<FrontendRestaurant[]> {
    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations(*),
        restaurant_tags!inner(
          tags!inner(*)
        ),
        business_hours(*)
      `
      )
      .eq("restaurant_tags.tags.name", tagName);

    if (error) throw error;
    return (data as DbRestaurant[]).map(adaptRestaurant);
  },

  async getNearbyRestaurants(
    latitude: number,
    longitude: number,
    radiusInMeters = 3000
  ): Promise<RestaurantWithDistance[]> {
    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations!inner(*),
        restaurant_tags(tags(*)),
        business_hours(*)
      `
      )
      .gte("restaurant_locations.latitude", latitude - 0.1)
      .lte("restaurant_locations.latitude", latitude + 0.1)
      .gte("restaurant_locations.longitude", longitude - 0.1)
      .lte("restaurant_locations.longitude", longitude + 0.1)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data as DbRestaurant[])
      .map((restaurant) => {
        const adaptedRestaurant = adaptRestaurant(restaurant);
        const distance = calculateDistance(
          latitude,
          longitude,
          restaurant.restaurant_locations?.[0]?.latitude ?? 0,
          restaurant.restaurant_locations?.[0]?.longitude ?? 0
        );

        return {
          ...adaptedRestaurant,
          distance,
        };
      })
      .filter((restaurant) => restaurant.distance <= radiusInMeters)
      .sort((a, b) => a.distance - b.distance);
  },

  async getRestaurantsByTheme(
    themeSlug: string
  ): Promise<FrontendRestaurant[]> {
    const { data: themeData, error: themeError } = await db
      .from("themes")
      .select("id")
      .eq("slug", themeSlug)
      .single();

    if (themeError) throw themeError;
    if (!themeData) throw new Error("Theme not found");

    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations(*),
        restaurant_tags(tags(*)),
        business_hours(*),
        restaurant_themes!inner(themes(*))
      `
      )
      .eq("restaurant_themes.theme_id", themeData.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as DbRestaurant[]).map(adaptRestaurant);
  },

  async getAllThemes(): Promise<ThemeInfo[]> {
    const { data, error } = await db
      .from("themes")
      .select(
        `
        id,
        name,
        slug,
        image_url
      `
      )
      .order("name");

    console.log("Supabase response:", { data, error }); // API 응답 확인

    if (error) {
      console.error("Failed to fetch themes:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("No themes found in database");
      return [];
    }

    const themes = data.map((theme) => ({
      id: theme.id,
      title: theme.name,
      imageUrl:
        theme.image_url || `https://picsum.photos/seed/${theme.slug}/400/300`,
      slug: theme.slug,
    }));

    console.log("Transformed themes:", themes); // 변환된 데이터 확인
    return themes;
  },

  async getThemeBySlug(slug: string): Promise<ThemeInfo | null> {
    const { data, error } = await db
      .from("themes")
      .select(
        `
        id,
        name,
        slug,
        image_url
      `
      )
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return {
      id: data.id,
      title: data.name,
      imageUrl:
        data.image_url || `https://picsum.photos/seed/${data.slug}/400/300`,
      slug: data.slug,
    };
  },
};
