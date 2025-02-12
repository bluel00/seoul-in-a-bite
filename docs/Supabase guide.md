## Supabase DB 스키마

-- 식당 기본 정보
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  phone VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_restaurant_name UNIQUE (name)
);

-- 위치 정보
CREATE TABLE restaurant_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_restaurant_location UNIQUE (restaurant_id)
);

-- 영업 시간
CREATE TABLE business_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  day VARCHAR NOT NULL,
  start_time TIME,
  end_time TIME,
  break_start TIME,
  break_end TIME,
  last_order TIME,
  is_holiday BOOLEAN DEFAULT false,
  holiday_reason VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_restaurant_day UNIQUE (restaurant_id, day)
);

-- 메뉴 정보
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  price INTEGER,
  description TEXT,
  image_url VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 태그 마스터
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_tag_name UNIQUE (name)
);

-- 식당-태그 관계 (태그 분석 결과)
CREATE TABLE restaurant_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  count INTEGER NOT NULL DEFAULT 0,
  sentiment VARCHAR CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_restaurant_tag UNIQUE (restaurant_id, tag_id)
);

-- 테마 마스터
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL,
  image_url VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_theme_name UNIQUE (name),
  CONSTRAINT unique_theme_slug UNIQUE (slug)
);

-- 식당-테마 관계
CREATE TABLE restaurant_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_restaurant_theme UNIQUE (restaurant_id, theme_id)
);