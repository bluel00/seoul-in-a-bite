export interface Restaurant {
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  address: string;
  operatingHours: string;
  priceRange: string;
  isOpen: boolean;
  category: string;
  latitude: number;
  longitude: number;
  tags: string[];
}
