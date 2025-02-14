import { RestaurantCard } from "@/entities/restaurant/ui/RestaurantCard";
import { Header } from "@/features/navigation/ui/Header";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { restaurantApi } from "@/shared/api/restaurant/restaurantAdapter";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { Locale } from "@/shared/i18n/settings";

interface ThemePageProps {
  params: Promise<{
    slug: string;
    lang: Locale;
  }>;
}

export default async function ThemePage(props: ThemePageProps) {
  const params = await props.params;

  const {
    slug,
    lang
  } = params;

  const dictionary = await getDictionary(lang);

  if (!slug) {
    return (
      <>
        <Header showCloseButton />
        <main className="min-h-screen bg-background">
          <div className="mx-auto w-full max-w-[480px] px-4 py-6">
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <SearchX className="h-12 w-12 text-muted-foreground" />
              <h1 className="text-xl font-semibold">
                {dictionary.themeNotFoundTitle}
              </h1>
              <p className="text-sm text-muted-foreground text-center">
                {dictionary.themeNotFoundDescription}
                <br />
                {dictionary.chooseAnotherTheme}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {dictionary.home}
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const restaurants = await restaurantApi.getRestaurantsByTheme(slug);
  const theme = await restaurantApi.getThemeBySlug(slug);

  if (!theme) {
    return (
      <>
        <Header showCloseButton />
        <main className="min-h-screen bg-background">
          <div className="mx-auto w-full max-w-[480px] px-4 py-6">
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <SearchX className="h-12 w-12 text-muted-foreground" />
              <h1 className="text-xl font-semibold">
                {dictionary.themeNotFoundTitle}
              </h1>
              <p className="text-sm text-muted-foreground text-center">
                {dictionary.themeNotFoundDescription}
                <br />
                {dictionary.chooseAnotherTheme}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {dictionary.home}
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
                {dictionary.theme}
              </span>
              <h1 className="text-xl font-semibold">{theme.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {restaurants.length}
              {dictionary.restaurantsFound}
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
              <h2 className="text-lg font-medium">
                {dictionary.noRestaurantsFoundTitle}
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                {dictionary.noRestaurantsFoundDescription}
                <br />
                {dictionary.chooseAnotherTheme}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {dictionary.home}
              </Link>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
