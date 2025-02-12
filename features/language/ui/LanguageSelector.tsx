"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/shared/i18n/settings"; // 수정된 import 경로

const languageNames: Record<string, string> = {
  en: "English",
  ko: "한국어",
  zh: "繁體中文",
};

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split("/")[1];

  const handleLanguageChange = (newLang: string) => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPathname);
  };

  return (
    <select
      value={currentLang}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="bg-black/20 border border-white/30 rounded-md px-2 py-1 text-sm text-white appearance-none cursor-pointer hover:bg-black/30 transition-colors"
    >
      {i18n.locales.map((locale) => (
        <option key={locale} value={locale}>
          {languageNames[locale]}
        </option>
      ))}
    </select>
  );
}
