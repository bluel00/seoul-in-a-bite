// BE 응답 타입 정의
export interface RestaurantResponse {
  id: string;
  name: string;
  description: string | null;
  image_url: string;
  rating: number | null;
  // ... 다른 BE 응답 필드들
}

export interface ThemeResponse {
  slug: string;
  title: string;
  // ... 다른 BE 응답 필드들
}
