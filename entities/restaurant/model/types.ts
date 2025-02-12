export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number | null;
  reviewCount: number;
  address: string;
  imageUrl: string;
  priceRange: string;
  operatingHours: string;
  isOpen: boolean;
  theme?: string;
  latitude: number;
  longitude: number;
  tags: string[];
  phoneNumber?: string;
  snsUrl?: string;
}

export interface Theme {
  id: string;
  title: string;
  imageUrl: string;
  slug: string;
}

export interface RestaurantWithDistance extends Restaurant {
  distance: number;
}
