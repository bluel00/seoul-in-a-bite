# **개발 명세서 - 맛집 목록 페이지**

## **개발 우선순위 설정**

1. **맛집 목록 UI 구현** (쉬운 기능)
2. **필터(위치, 정렬 옵션) UI 구현** (쉬운 기능)
3. **테마/카테고리 기반 동적 라우팅** (중간 난이도)
4. **무한 스크롤 데이터 로드** (어려운 기능)

---

# **📌 프론트엔드 기능명세서 - 맛집 목록 페이지**

## **1. 페이지 및 파일 구조**

📌 **파일 위치:**

- `app/category/[slug]/page.tsx` (카테고리 기반 맛집 목록)
- `app/theme/[slug]/page.tsx` (테마 기반 맛집 목록)

📌 **사용할 UI 컴포넌트:**

- `맛집 카드 UI` → `entities/restaurant/ui/RestaurantCard.tsx` (ShadCN `Card` 사용)
- `필터(위치, 정렬)` → `features/filter/ui/FilterBar.tsx`
- `무한 스크롤 로더` → `features/pagination/ui/InfiniteScrollLoader.tsx`

---

## **2. 화면 레이아웃 및 UI 상세**

### **📍 1. 헤더 영역 (카테고리/테마 정보 + 필터 바)**

- 페이지 상단에 현재 선택된 카테고리/테마 표시
- 사용자는 **위치 선택(탭다운)** 및 **정렬 옵션(평점순, 리뷰순 등)** 변경 가능

✅ **ShadCN 컴포넌트 사용:**

- `DropdownMenu` → `shared/ui/dropdown.tsx`

📌 **파일 경로:** `features/filter/ui/FilterBar.tsx`

---

### **📍 2. 맛집 카드 리스트 (2열 그리드 레이아웃)**

- 각 맛집을 **카드 UI**로 표시
- **맛집 대표 이미지 + 이름 + 평점 + 위치 정보 포함**
- 클릭 시 **맛집 상세 페이지(`app/restaurant/[id]/page.tsx`) 이동**

✅ **ShadCN 컴포넌트 사용:**

- `Card` → `shared/ui/card.tsx`

📌 **파일 경로:** `entities/restaurant/ui/RestaurantCard.tsx`

---

### **📍 3. 무한 스크롤 데이터 로드**

- 사용자가 **페이지 하단까지 스크롤 시 추가 데이터 자동 로드**
- `useIntersectionObserver`를 활용하여 **스크롤 이벤트 감지**

✅ **사용할 라이브러리:**

- `react-intersection-observer` (or Next.js 내장 API)

📌 **파일 경로:** `features/pagination/ui/InfiniteScrollLoader.tsx`

---

## **3. 페이지 간 이동 (라우팅) 및 API 연동**

📌 **라우팅:**

- `메인 페이지` → `/category/[slug]` 또는 `/theme/[slug]` 이동
- 클릭한 테마/카테고리에 따라 동적으로 리스트 표시

✅ **예제 URL:**

- `/category/korean-food` → `"한식"` 카테고리 맛집 리스트
- `/theme/michelin` → `"미슐랭 추천 맛집"` 테마 리스트

📌 **API 연동:**

- `GET /api/restaurants?category=korean-food&sort=rating`
- `GET /api/restaurants?theme=michelin&page=2` (무한 스크롤)

---

## **4. 테스트 항목**

✅ 카테고리/테마 클릭 시 올바른 페이지로 이동하는가?  
✅ 필터(위치, 정렬 옵션) 변경 시 데이터가 정상적으로 업데이트되는가?  
✅ 무한 스크롤 시 추가 맛집이 로드되는가?  
✅ 모바일/PC에서 UI가 정상적으로 표시되는가?

---

# **📌 백엔드 기능명세서 - 맛집 목록 페이지**

## **1. API 엔드포인트 및 파일 구조**

📌 **파일 위치:**

- `app/api/restaurants/route.ts`

📌 **사용할 기술:**

- **Next.js Route Handler** (`app/api/.../route.ts`)
- **Drizzle ORM** (DB 연동)

---

## **2. API 상세 정의**

### **📍 1. 카테고리/테마별 맛집 리스트 API**

✅ **엔드포인트:** `GET /api/restaurants`

- **설명:**
  - 카테고리(`category`) 또는 테마(`theme`)에 맞는 맛집 리스트 반환
  - 정렬(`sort`) 및 위치(`location`) 필터 적용 가능
  - 무한 스크롤 지원을 위해 `page` 파라미터 사용

**📌 요청 예시:**

```ts
GET /api/restaurants?category=korean-food&location=seoul&sort=rating&page=1
```

**📌 응답 예시:**

```json
{
  "restaurants": [
    {
      "id": 1,
      "name": "한식당 A",
      "rating": 4.5,
      "reviews": 120,
      "location": "서울 강남구",
      "imageUrl": "/images/restaurant_a.jpg"
    },
    {
      "id": 2,
      "name": "한식당 B",
      "rating": 4.3,
      "reviews": 98,
      "location": "서울 마포구",
      "imageUrl": "/images/restaurant_b.jpg"
    }
  ],
  "nextPage": 2
}
```

📌 **파일 경로:** `app/api/restaurants/route.ts`

---

## **3. 데이터베이스 설계**

📌 **파일 경로:** `db/schema.ts`

#### **📍 맛집 테이블**

```ts
export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  theme: varchar("theme", { length: 50 }),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviews: integer("reviews").default(0),
  location: varchar("location", { length: 100 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
});
```

---

## **4. 테스트 항목**

✅ `GET /api/restaurants?category=korean-food` 호출 시 한식 맛집 리스트가 반환되는가?  
✅ `GET /api/restaurants?theme=michelin` 호출 시 미슐랭 맛집 리스트가 반환되는가?  
✅ `GET /api/restaurants?page=2` 호출 시 무한 스크롤 데이터가 정상적으로 반환되는가?  
✅ 정렬 옵션(`sort=rating`)이 올바르게 동작하는가?  
✅ 위치 필터(`location=seoul`)가 정상적으로 반영되는가?

---

# **🚀 최종 요약**

✅ **프론트엔드:**

- `FilterBar.tsx` (위치, 정렬 옵션)
- `RestaurantCard.tsx` (맛집 카드 UI)
- `InfiniteScrollLoader.tsx` (무한 스크롤)
- `category/[slug]/page.tsx`, `theme/[slug]/page.tsx` (라우팅)

✅ **백엔드:**

- `GET /api/restaurants` (카테고리/테마별 맛집 리스트)
- `Drizzle ORM` 사용해 DB 설계 (`restaurants` 테이블)
- **무한 스크롤 지원 (page 기반 데이터 로드)**

✅ **테스트 체크리스트 포함**

---
