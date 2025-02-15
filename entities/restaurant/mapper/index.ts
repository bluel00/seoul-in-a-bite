import type {
  ApiRestaurant,
  ApiTheme,
  ApiRestaurantWithDistance,
} from "@/shared/api/restaurant/types";
import type { Restaurant, Theme, RestaurantWithDistance } from "../model/types";

// 랜덤 이미지 인덱스 생성 함수
function getRandomImageIndex(): number {
  return Math.floor(Math.random() * 10) + 1;
}

export const restaurantMapper = {
  toDomain(apiRestaurant: ApiRestaurant): Restaurant {
    return {
      id: apiRestaurant.id,
      name: apiRestaurant.name,
      description: apiRestaurant.description ?? "",
      category: apiRestaurant.category,
      rating: apiRestaurant.rating ?? null,
      reviewCount: apiRestaurant.review_count ?? 0,
      address: apiRestaurant.address,
      imageUrl: `/images/restaurants/korean-${getRandomImageIndex()}.png`,
      priceRange: apiRestaurant.price_range ?? "",
      operatingHours: apiRestaurant.business_hours?.[0]?.start_time
        ? `${apiRestaurant.business_hours[0].start_time} - ${apiRestaurant.business_hours[0].end_time}`
        : "",
      isOpen: true,
      latitude: apiRestaurant.restaurant_locations?.[0]?.latitude ?? 0,
      longitude: apiRestaurant.restaurant_locations?.[0]?.longitude ?? 0,
      tags: apiRestaurant.restaurant_tags?.map((rt) => rt.tags.name) ?? [],
      phoneNumber: apiRestaurant.phone,
      theme: apiRestaurant.restaurant_themes?.[0]?.themes.name,
      snsUrl: undefined,
    };
  },

  toDomainWithDistance(
    apiRestaurant: ApiRestaurantWithDistance
  ): RestaurantWithDistance {
    return {
      ...this.toDomain(apiRestaurant),
      distance: apiRestaurant.distance,
    };
  },
};

export const themeMapper = {
  toDomain(apiTheme: ApiTheme): Theme {
    return {
      id: apiTheme.id,
      title: apiTheme.name,
      imageUrl:
        apiTheme.image_url ||
        `/images/restaurants/korean-${getRandomImageIndex()}.png`,
      slug: apiTheme.slug,
    };
  },
};
