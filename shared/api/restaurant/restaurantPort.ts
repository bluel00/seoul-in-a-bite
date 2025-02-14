import { db } from "@/shared/lib/database";
import type { ApiRestaurant, ApiTheme } from "./types";
import { restaurantMapper, themeMapper } from "@/entities/restaurant/mapper";
import type {
  Restaurant,
  Theme,
  RestaurantWithDistance,
} from "@/entities/restaurant/model/types";
import { calculateDistance } from "@/shared/lib/distance";

export const restaurantService = {
  async getRestaurants(): Promise<Restaurant[]> {
    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations(*),
        restaurant_tags(tags(*)),
        business_hours(*),
        restaurant_themes(themes(*))
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as ApiRestaurant[]).map(restaurantMapper.toDomain);
  },

  async getRestaurantDetail(id: string): Promise<Restaurant> {
    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations(*),
        restaurant_tags(tags(*)),
        business_hours(*),
        restaurant_themes(themes(*))
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return restaurantMapper.toDomain(data as ApiRestaurant);
  },

  async getRestaurantsByCategory(category: string): Promise<Restaurant[]> {
    const { data, error } = await db
      .from("restaurants")
      .select(
        `
        *,
        restaurant_locations(*),
        restaurant_tags(tags(*)),
        business_hours(*),
        restaurant_themes(themes(*))
      `
      )
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as ApiRestaurant[]).map(restaurantMapper.toDomain);
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
        business_hours(*),
        restaurant_themes(themes(*))
      `
      )
      .gte("restaurant_locations.latitude", latitude - 0.1)
      .lte("restaurant_locations.latitude", latitude + 0.1)
      .gte("restaurant_locations.longitude", longitude - 0.1)
      .lte("restaurant_locations.longitude", longitude + 0.1);

    if (error) throw error;

    return (data as ApiRestaurant[])
      .map((restaurant) => ({
        ...restaurant,
        distance: calculateDistance(
          latitude,
          longitude,
          restaurant.restaurant_locations?.[0]?.latitude ?? 0,
          restaurant.restaurant_locations?.[0]?.longitude ?? 0
        ),
      }))
      .filter((restaurant) => restaurant.distance <= radiusInMeters)
      .sort((a, b) => a.distance - b.distance)
      .map(restaurantMapper.toDomainWithDistance);
  },

  async getAllThemes(): Promise<Theme[]> {
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

    if (error) throw error;
    return (data as ApiTheme[]).map(themeMapper.toDomain);
  },

  async getThemeBySlug(slug: string): Promise<Theme | null> {
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

    return themeMapper.toDomain(data as ApiTheme);
  },
};
