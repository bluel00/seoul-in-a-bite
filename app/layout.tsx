import "@/shared/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "@/shared/ui/layout/ClientLayout";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { Locale } from "@/shared/i18n/settings";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export async function generateMetadata({
  params,
}: RootLayoutProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: dictionary.appName,
    description: dictionary.appDescription,
  };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
