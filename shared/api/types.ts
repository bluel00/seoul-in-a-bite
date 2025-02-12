export interface ApiRestaurant {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  rating?: number;
  review_count?: number;
  description?: string;
  price_range?: string;
  restaurant_locations?: {
    latitude: number;
    longitude: number;
  }[];
  restaurant_tags?: {
    tags: {
      name: string;
    };
  }[];
  business_hours?: {
    start_time?: string;
    end_time?: string;
  }[];
  restaurant_themes?: {
    themes: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
}

export interface ApiTheme {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
}

export interface ApiRestaurantWithDistance extends ApiRestaurant {
  distance: number;
}
