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
    imageUrl: `https://picsum.photos/seed/${dbRestaurant.id}/400/300`,
    priceRange: dbRestaurant.price_range || "",
    operatingHours: dbRestaurant.business_hours?.[0]?.start_time
      ? `${dbRestaurant.business_hours[0].start_time} - ${dbRestaurant.business_hours[0].end_time}`
      : "",
    isOpen: true,
    latitude: dbRestaurant.restaurant_locations?.[0]?.latitude ?? 0,
    longitude: dbRestaurant.restaurant_locations?.[0]?.longitude ?? 0,
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
