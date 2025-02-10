import { MOCK_RESTAURANTS, THEMES } from "@/shared/lib/mock-data";
import { RestaurantCard } from "@/app/components/RestaurantCard";
import { Header } from "@/app/components/Header";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

interface ThemePageProps {
  params: {
    slug: string;
  };
}

export default function ThemePage({ params }: ThemePageProps) {
  const theme = THEMES.find((t) => t.slug === params.slug);
  const restaurants = MOCK_RESTAURANTS.filter((r) => r.theme === params.slug);

  if (!theme) {
    return (
      <>
        <Header showCloseButton />
        <main className="min-h-screen bg-background">
          <div className="mx-auto w-full max-w-[480px] px-4 py-6">
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <SearchX className="h-12 w-12 text-muted-foreground" />
              <h1 className="text-xl font-semibold">
                존재하지 않는 테마입니다
              </h1>
              <p className="text-sm text-muted-foreground text-center">
                요청하신 테마를 찾을 수 없습니다.
                <br />
                다른 테마를 선택해주세요.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header showCloseButton />
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-[480px] px-4 py-6">
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Theme
              </span>
              <h1 className="text-xl font-semibold">{theme.label}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {restaurants.length}개의 맛집을 찾았습니다
            </p>
          </section>

          {restaurants.length > 0 ? (
            <section className="grid grid-cols-2 gap-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  description={restaurant.description}
                  imageUrl={restaurant.imageUrl}
                />
              ))}
            </section>
          ) : (
            <section className="flex flex-col items-center justify-center gap-4 py-12">
              <SearchX className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-lg font-medium">등록된 맛집이 없습니다</h2>
              <p className="text-sm text-muted-foreground text-center">
                아직 이 테마에 등록된 맛집이 없습니다.
                <br />
                다른 테마를 선택해주세요.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
