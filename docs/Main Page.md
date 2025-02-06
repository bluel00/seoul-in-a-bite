# **📝 메인 페이지 기능 명세서 (FSD 기반)**

## **📌 1. 개요**

- **페이지명:** `메인 페이지` (맛집 리스트)
- **경로:** `/`
- **주요 기능:**  
  ✅ 검색 및 필터링을 통한 맛집 탐색  
  ✅ 리스트 형태로 맛집 정보 제공  
  ✅ 맛집 선택 시 상세 페이지 이동  
  ✅ 길찾기 버튼을 통한 지도 앱(카카오맵/구글맵) 연결

---

## **📌 2. 프로젝트 구조 (FSD 적용)**

```
your-nextjs-project/
├── app/
│   ├── api/
│   │   └── restaurants/route.ts         # 맛집 리스트 API (Route Handler)
│   ├── page.tsx                         # 메인 페이지 (맛집 리스트)
│   ├── restaurants/                     # 맛집 관련 페이지
│   │   ├── [id]/page.tsx                 # 맛집 상세 페이지
│   │   ├── ui/RestaurantList.tsx         # 맛집 리스트 UI
│   │   ├── ui/RestaurantCard.tsx         # 개별 맛집 카드 UI
│   │   ├── lib/useRestaurant.ts          # 맛집 데이터 호출 로직 (react-query)
│   │   ├── lib/mappers.ts                 # API 응답 데이터 매핑
│   │   └── index.ts
│
├── entities/
│   ├── restaurant/
│   │   ├── model/                         # Drizzle ORM 스키마 정의
│   │   ├── lib/restaurant-api.ts           # API 호출 로직 (fetcher)
│   │   ├── ui/RestaurantRating.tsx         # 맛집 평점 UI
│   │   ├── ui/RestaurantLocation.tsx       # 맛집 위치 UI
│   │   ├── ui/RestaurantPrice.tsx          # 맛집 가격대 UI
│   │   └── index.ts
│
├── features/
│   ├── search/
│   │   ├── ui/SearchBar.tsx                # 검색창 UI
│   │   ├── lib/useSearch.ts                 # 검색 기능 로직
│   │   └── index.ts
│   ├── filters/
│   │   ├── ui/FilterButton.tsx              # 필터 버튼 UI
│   │   ├── ui/FilterModal.tsx               # 필터 모달 UI
│   │   ├── lib/useFilters.ts                 # 필터 로직
│   │   ├── lib/filter-options.ts             # 필터 옵션 정의
│   │   └── index.ts
│
├── shared/
│   ├── ui/button.tsx                         # ShadCN 버튼 컴포넌트
│   ├── lib/fetcher.ts                        # API Fetch 유틸 함수
│   ├── lib/navigation.ts                     # 길찾기 기능 네비게이션 유틸
│   ├── config/constants.ts                   # 프로젝트 공통 상수
│   ├── config/theme.ts                        # 테마 설정
│   ├── layout/Header.tsx                      # 공통 헤더
│   ├── layout/Footer.tsx                      # 공통 푸터
│   ├── styles/globals.css
│   └── index.ts
│
├── db/
│   ├── schema.ts                              # DrizzleORM 데이터베이스 스키마
│   └── index.ts                               # DB 초기화
```

---

## **📌 3. 프론트엔드 기능 명세**

### **📍 3.1 컴포넌트 구조**

| 컴포넌트명               | 역할                        |
| ------------------------ | --------------------------- |
| `SearchBar.tsx`          | 검색어 입력 UI 및 검색 기능 |
| `FilterButton.tsx`       | 필터 버튼 UI                |
| `FilterModal.tsx`        | 필터 옵션 선택 모달         |
| `RestaurantList.tsx`     | 맛집 리스트 UI              |
| `RestaurantCard.tsx`     | 개별 맛집 카드 UI           |
| `RestaurantRating.tsx`   | 맛집 평점 UI                |
| `RestaurantPrice.tsx`    | 가격대 표시 UI              |
| `RestaurantLocation.tsx` | 위치 정보 UI                |
| `button.tsx`             | ShadCN 버튼 컴포넌트        |

---

### **📍 3.2 검색 기능 (`features/search/ui/SearchBar.tsx`)**

**🔹 기능:**

- 사용자가 검색어를 입력하면 실시간으로 리스트를 필터링
- 입력값 변경 시 `useSearch.ts` 훅을 통해 API 요청

**🔹 인터페이스:**

```tsx
export interface SearchBarProps {
  onSearch: (query: string) => void;
}
```

**🔹 UI 예시:**

```tsx
export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input
      placeholder="검색어를 입력하세요..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
```

---

### **📍 3.3 필터 기능 (`features/filters/ui/FilterButton.tsx`)**

**🔹 기능:**

- 버튼 클릭 시 `FilterModal.tsx`를 오픈
- 사용자가 선택한 필터 값을 `useFilters.ts`를 통해 저장

**🔹 UI 예시:**

```tsx
export function FilterButton({ onOpen }: { onOpen: () => void }) {
  return <Button onClick={onOpen}>필터</Button>;
}
```

---

### **📍 3.4 맛집 리스트 (`restaurants/ui/RestaurantList.tsx`)**

**🔹 기능:**

- `useRestaurant.ts`에서 API 데이터를 가져와 리스트 렌더링
- `RestaurantCard.tsx`를 반복 렌더링

**🔹 UI 예시:**

```tsx
export function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <div>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
```

---

### **📍 3.5 길찾기 기능 (`shared/lib/navigation.ts`)**

**🔹 기능:**

- `kakaomap://route` 또는 `https://maps.google.com/?q=목적지` 호출
- `RestaurantCard.tsx`에서 사용

```tsx
export function openMap(location: string) {
  window.open(`https://maps.google.com/?q=${location}`, "_blank");
}
```

---

## **📌 4. 백엔드 기능 명세**

### **📍 4.1 API 엔드포인트 (`app/api/restaurants/route.ts`)**

| 엔드포인트              | 메서드 | 설명                         |
| ----------------------- | ------ | ---------------------------- |
| `/api/restaurants`      | `GET`  | 맛집 리스트 가져오기         |
| `/api/restaurants/[id]` | `GET`  | 특정 맛집 상세 정보 가져오기 |

```tsx
export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const filter = url.searchParams.get("filter") || "";

  const results = await db
    .select()
    .from(restaurants)
    .where(like(restaurants.name, `%${search}%`))
    .where(eq(restaurants.priceRange, filter))
    .execute();

  return Response.json(results);
}
```

---

## **📌 5. 결론**

✅ **FSD 적용하여 기능별 구조 분리**  
✅ **검색 및 필터 기능 구현 (Feature-Sliced Design 방식)**  
✅ **Drizzle ORM을 통한 DB 연동**  
✅ **Route Handler 기반 API 구현**  
✅ **ShadCN UI 활용하여 일관된 스타일 유지**
