## **개발 우선순위 설정 - 메인 페이지**

**📌 우선순위:**

1. **검색 바(서칭바) 및 탭다운 추천 키워드** (쉬운 기능)
2. **테마별 맛집 카드 UI** (쉬운 기능)
3. **테마 카드 클릭 시 맛집 목록 페이지 이동 (라우팅)** (중간 난이도)
4. **검색어 입력 시 실시간 자동완성 (추후 확장 가능)** (어려운 기능)

---

# **프론트엔드 기능명세서 - 메인 페이지**

### **1. 페이지 및 파일 구조**

📌 **파일 위치:** `app/page.tsx` (메인 페이지)  
📌 **사용할 UI 컴포넌트:**

- **검색 바(Search Bar)** → `shared/ui/input.tsx` (ShadCN 사용)
- **테마별 맛집 카드** → `entities/restaurant/ui/ThemeCard.tsx` (ShadCN 사용)
- **추천 키워드 리스트** → `features/search/ui/KeywordDropdown.tsx`

---

### **2. 화면 레이아웃 및 UI 상세**

#### **📍 검색 바(서칭바)**

- 위치: 페이지 최상단
- 입력창 내부에 🔍 아이콘 표시 (ShadCN `Input` 컴포넌트 사용)
- 검색어 입력 시 **X(삭제 버튼)** 표시
- 클릭 시 **추천 키워드 리스트(탭다운 메뉴) 표시**

✅ **ShadCN 컴포넌트 사용:**

- `Input` → `shared/ui/input.tsx`

📌 **파일 경로:** `features/search/ui/SearchBar.tsx`

---

#### **📍 추천 키워드 리스트 (탭다운 메뉴)**

- **검색 바 클릭 시** 하단에 **추천 키워드 표시**
- 사용자가 추천 키워드 선택 시, 해당 키워드가 검색창에 자동 입력됨
- 키워드 예시: `"한식"`, `"미슐랭 맛집"`, `"대만인이 많이 찾는 맛집"`

📌 **파일 경로:** `features/search/ui/KeywordDropdown.tsx`

---

#### **📍 테마별 맛집 카드 (2x3 배열)**

- **배열 형태:** 2행 3열 (총 6개 카드)
- 각 카드 클릭 시 **해당 테마에 맞는 맛집 목록 페이지로 이동**
- **배경 이미지 + 타이틀 텍스트** 표시
- **ShadCN 카드 컴포넌트 사용**
- **호버 효과:** 터치 시 확대(Scale 1.05)

✅ **ShadCN 컴포넌트 사용:**

- `Card` → `shared/ui/card.tsx`

📌 **파일 경로:** `entities/restaurant/ui/ThemeCard.tsx`

---

### **3. 페이지 간 이동 (라우팅) 및 API 연동**

📌 **라우팅:**

- 검색어 입력 후 **Enter** → `app/search/page.tsx` (검색 결과 페이지로 이동)
- 테마 카드 클릭 → `app/category/[slug]/page.tsx` (해당 테마의 맛집 리스트 페이지)

📌 **API 연동:**

- 검색창 입력 시 **자동완성 API 호출** (추후 개발)
- 추천 키워드 리스트는 **백엔드에서 제공받음** (`GET /api/search/keywords`)

---

### **4. 테스트 항목**

✅ 검색 바 클릭 시 추천 키워드 리스트가 정상적으로 표시되는가?  
✅ 추천 키워드 클릭 시 검색 바에 자동 입력되는가?  
✅ 테마별 카드 클릭 시 올바른 페이지로 이동하는가?  
✅ 모바일 환경에서 UI가 정상적으로 표시되는가?

---

# **백엔드 기능명세서 - 메인 페이지**

### **1. API 엔드포인트 및 파일 구조**

📌 **파일 위치:** `app/api/search/route.ts`

📌 **사용할 기술:**

- **Next.js Route Handler** (`app/api/.../route.ts`)
- **Drizzle ORM** (DB 연동)

---

### **2. API 상세 정의**

#### **📍 1. 추천 키워드 리스트 API**

**✅ 엔드포인트:** `GET /api/search/keywords`

- **설명:**
  - 검색 바 클릭 시, 추천 키워드 리스트 반환
  - 키워드는 DB에서 관리

**📌 요청:**

```ts
GET / api / search / keywords;
```

**📌 응답:**

```json
{
  "keywords": ["한식", "미슐랭 맛집", "대만인이 많이 찾는 맛집"]
}
```

📌 **파일 경로:** `app/api/search/keywords/route.ts`

---

#### **📍 2. 테마별 맛집 리스트 API**

**✅ 엔드포인트:** `GET /api/restaurants/themes`

- **설명:**
  - 메인 페이지에서 테마별 맛집 카드 정보를 불러옴
  - 테마 이름과 대표 이미지 반환

**📌 요청:**

```ts
GET / api / restaurants / themes;
```

**📌 응답:**

```json
{
  "themes": [
    {
      "id": 1,
      "title": "미슐랭 가이드 선정 맛집",
      "imageUrl": "/images/michelin.jpg",
      "slug": "michelin"
    },
    {
      "id": 2,
      "title": "SNS에서 인기 있는 맛집",
      "imageUrl": "/images/sns.jpg",
      "slug": "sns"
    }
  ]
}
```

📌 **파일 경로:** `app/api/restaurants/themes/route.ts`

---

### **3. 데이터베이스 설계**

📌 **파일 경로:** `db/schema.ts`

#### **📍 추천 키워드 테이블**

```ts
export const searchKeywords = pgTable("search_keywords", {
  id: serial("id").primaryKey(),
  keyword: varchar("keyword", { length: 50 }).unique().notNull(),
});
```

#### **📍 테마별 맛집 테이블**

```ts
export const restaurantThemes = pgTable("restaurant_themes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 50 }).unique().notNull(),
});
```

---

### **4. 테스트 항목**

✅ `GET /api/search/keywords` 호출 시 추천 키워드가 정상적으로 반환되는가?  
✅ `GET /api/restaurants/themes` 호출 시 테마 카드 데이터가 정상적으로 반환되는가?  
✅ API 요청 시 DB에서 올바른 데이터를 가져오는가?  
✅ `slug`를 기반으로 올바른 맛집 페이지로 이동하는가?

---

# **🚀 최종 요약**

✅ **프론트엔드:**

- `SearchBar.tsx` (`ShadCN Input 사용`)
- `KeywordDropdown.tsx` (추천 키워드 리스트)
- `ThemeCard.tsx` (`ShadCN Card 사용`)
- 검색 시 `app/search/page.tsx`로 이동

✅ **백엔드:**

- `GET /api/search/keywords` (추천 키워드 API)
- `GET /api/restaurants/themes` (테마별 맛집 API)
- `Drizzle`을 사용해 DB 설계 (`search_keywords`, `restaurant_themes` 테이블)

✅ **테스트 체크리스트 포함**

---
