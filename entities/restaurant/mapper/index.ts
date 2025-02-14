import type {
  ApiRestaurant,
  ApiTheme,
  ApiRestaurantWithDistance,
} from "@/shared/api/restaurant/types";
import type { Restaurant, Theme, RestaurantWithDistance } from "../model/types";

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
      imageUrl: `https://picsum.photos/seed/${apiRestaurant.id}/400/300`,
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
        `https://picsum.photos/seed/${apiTheme.slug}/400/300`,
      slug: apiTheme.slug,
    };
  },
};
