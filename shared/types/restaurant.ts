export type Restaurant = {
  id: string
  name: string
  category: string
  address: string
  phone?: string
  created_at: string
  updated_at: string
}

export type RestaurantLocation = {
  id: string
  restaurant_id: string
  latitude: number
  longitude: number
  created_at: string
}

export type BusinessHours = {
  id: string
  restaurant_id: string
  day: string
  start_time?: string
  end_time?: string
  break_start?: string
  break_end?: string
  last_order?: string
  is_holiday: boolean
  holiday_reason?: string
  created_at: string
}

export type MenuItem = {
  id: string
  restaurant_id: string
  name: string
  price?: number
  description?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export type Tag = {
  id: string
  name: string
  created_at: string
}

export type RestaurantTag = {
  id: string
  restaurant_id: string
  tag_id: string
  count: number
  sentiment: 'positive' | 'negative' | 'neutral'
  created_at: string
  updated_at: string
}

export type Theme = {
  id: string
  name: string
  created_at: string
}

export type RestaurantTheme = {
  id: string
  restaurant_id: string
  theme_id: string
  created_at: string
}