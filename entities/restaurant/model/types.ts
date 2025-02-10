export interface Restaurant {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
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
