import "server-only";
import type { Locale } from "./settings";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ko: () => import("./dictionaries/ko.json").then((module) => module.default),
  zh: () => import("./dictionaries/zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = {
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
};
