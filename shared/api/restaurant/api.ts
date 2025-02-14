import { db } from "@/shared/lib/database";
import type { RestaurantResponse, ThemeResponse } from "./types";

export const restaurantApi = {
  async getRestaurants(): Promise<RestaurantResponse[]> {
    const { data, error } = await db.from("restaurants").select("*");
    if (error) throw error;
    return data;
  },

  async getRestaurantsByTheme(slug: string): Promise<RestaurantResponse[]> {
    // ... 기존 restaurants.ts의 로직
  },

  // ... 다른 API 메서드들
};
