### 📌 **메인 페이지 개발 명세서 - 한국을 방문하는 대만 관광객을 위한 맛집 정보 서비스 (모바일웹 MVP 버전)**

**아키텍처**: FSD (Feature-Sliced Design)  
**개발 방식**: 선언형 방식 (유지보수 용이)  
**주요 기술 스택**:

- **Next.js (App Router)**
- **ShadCN (UI 라이브러리, Radix UI 기반)**
- **TailwindCSS (스타일링)**
- **Next.js Route Handler (백엔드 API 개발)**

---

# **1️⃣ 메인 페이지 개요 (`/main`)**

## **📍 기능 및 구성**

✅ **탭다운 카테고리 버튼 (ShadCN Select 사용)**  
✅ **테마별 맛집 추천 카드 (2x3 그리드)**  
✅ **PC 환경에서 좌우 20% 여백 추가 후 중앙 정렬**  
✅ **클릭 시 해당 페이지(`category/[slug]` 또는 `theme/[slug]`)로 이동**

## **📍 주요 컴포넌트**

### **1) `CategorySelect.tsx` (탭다운 카테고리 버튼)**

**위치:** `widgets/CategorySelect.tsx`  
**사용 라이브러리:** `ShadCN <Select>`, `React useState`

📌 **기능**

- 기본값: `"카테고리 선택하기"`
- 클릭 시 카테고리 리스트 (`한식, 중식, 일식, 디저트, 24시간 운영, 비건/채식`) 표시
- 선택한 카테고리의 **맛집 리스트 페이지로 이동 (`/category/[slug]`)**

```tsx
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function CategorySelect() {
  const router = useRouter();

  return (
    <Select onValueChange={(value) => router.push(`/category/${value}`)}>
      <SelectTrigger>카테고리 선택하기</SelectTrigger>
      <SelectContent>
        <SelectItem value="korean">한식</SelectItem>
        <SelectItem value="chinese">중식</SelectItem>
        <SelectItem value="japanese">일식</SelectItem>
        <SelectItem value="dessert">디저트</SelectItem>
        <SelectItem value="24-hours">24시간 운영</SelectItem>
        <SelectItem value="vegan">비건/채식</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

---

### **2) `ThemeCard.tsx` (테마별 추천 맛집 카드)**

**위치:** `entities/ThemeCard.tsx`  
**사용 라이브러리:** `Next.js <Link>`, `TailwindCSS`

📌 **기능**

- `props`로 `title`, `image`, `href` 값을 받아 동적으로 렌더링
- 클릭 시 해당 URL로 이동 (`/theme/[slug]`)

```tsx
import Link from "next/link";

export default function ThemeCard({
  title,
  image,
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="relative w-full h-40 bg-cover bg-center rounded-xl shadow-md hover:scale-105 transition-transform"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
        {title}
      </div>
    </Link>
  );
}
```

---

### **3) `MainPage.tsx` (메인 페이지)**

**위치:** `pages/main/MainPage.tsx`  
**사용 라이브러리:** `Next.js <Link>`, `TailwindCSS`, `ShadCN Select`

📌 **기능**

- **상단에 `CategorySelect.tsx` 포함**
- **아래 `ThemeCard.tsx` 6개 배치 (2x3 그리드)**
- **PC에서는 중앙 정렬 및 좌우 20% 여백 추가**

📌 **반응형 TailwindCSS 적용**

```tsx
<div className="container mx-auto max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
```

📌 **전체 코드**

```tsx
import CategorySelect from "@/widgets/CategorySelect";
import ThemeCard from "@/entities/ThemeCard";

export default function MainPage() {
  const themes = [
    {
      title: "미슐랭 가이드 선정 맛집",
      image: "/images/michelin.jpg",
      href: "/theme/michelin",
    },
    {
      title: "현지인이 추천하는 숨은 맛집",
      image: "/images/local.jpg",
      href: "/theme/local",
    },
    {
      title: "SNS에서 인기 있는 맛집",
      image: "/images/sns.jpg",
      href: "/theme/sns",
    },
    {
      title: "대만인이 많이 찾는 맛집",
      image: "/images/taiwan.jpg",
      href: "/theme/taiwan",
    },
    {
      title: "비건/채식 옵션이 있는 맛집",
      image: "/images/vegan.jpg",
      href: "/theme/vegan",
    },
    {
      title: "24시간 운영하는 맛집",
      image: "/images/24hours.jpg",
      href: "/theme/24-hours",
    },
  ];

  return (
    <div className="container mx-auto max-w-md px-4 md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
      <div className="my-6">
        <CategorySelect />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme, index) => (
          <ThemeCard key={index} {...theme} />
        ))}
      </div>
    </div>
  );
}
```

---

# **2️⃣ 반응형 및 스타일링**

📌 **모바일 (360~414px)**

- 전체 페이지 너비: `max-width: 480px`
- 2x3 그리드 레이아웃 유지

📌 **PC (좌우 20% 여백 추가 후 중앙 정렬)**

- `max-width: 1024px`
- **좌우 여백 적용 (`lg:max-w-2xl xl:max-w-4xl`)**
- Tailwind 적용:

```tsx
<div className="container mx-auto max-w-[480px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1200px]">
```

---

# **3️⃣ 메인 페이지 API 명세**

📌 **API 엔드포인트**
| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| `GET` | `/api/categories` | 전체 카테고리 리스트 반환 |
| `GET` | `/api/theme` | 테마별 추천 맛집 리스트 반환 |

---

# **4️⃣ 결론**

✅ **ShadCN Select 적용한 탭다운 카테고리 버튼**  
✅ **테마별 추천 맛집 카드 UI (2x3 그리드)**  
✅ **PC 환경 중앙 정렬 및 좌우 20% 여백 적용**  
✅ **FSD 구조 적용하여 유지보수 용이**

🚀 **다음 단계**

- API 연동 (`/api/categories`, `/api/theme`)
- 애니메이션 적용 (`hover:scale-105`)
- 번체 중국어 지원 (i18n 적용) 🚀
