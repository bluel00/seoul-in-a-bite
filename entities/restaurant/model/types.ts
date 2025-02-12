export interface Restaurant {
  id: string; // UUID 받을 수 있게 변경
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
