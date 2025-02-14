import "server-only";
import type { Locale } from "./settings";

type Dictionary = {
  recommended: string;
  restaurantList: string;
  themeNotFoundTitle: string;
  themeNotFoundDescription: string;
  chooseAnotherTheme: string;
  home: string;
  theme: string;
  noRestaurantsFoundTitle: string;
  noRestaurantsFoundDescription: string;
  restaurantsFound: string;
  appName: string;
  appDescription: string;
};

async function getDictionaryModule(locale: Locale) {
  switch (locale) {
    case "ko":
      return (await import("./dictionaries/ko.json")).default;
    case "en":
      return (await import("./dictionaries/en.json")).default;
    case "zh":
      // zh.json에 누락된 필드 추가 필요
      return (await import("./dictionaries/zh.json")).default;
    default:
      return (await import("./dictionaries/en.json")).default;
  }
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return getDictionaryModule(locale);
};

export type { Dictionary };
