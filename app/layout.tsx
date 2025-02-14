import "@/shared/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "@/shared/ui/layout/ClientLayout";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { Locale } from "@/shared/i18n/settings";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: Locale;
  }>;
}

export async function generateMetadata(props: RootLayoutProps): Promise<Metadata> {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);

  return {
    title: dictionary.appName,
    description: dictionary.appDescription,
  };
}

export default async function RootLayout(props: RootLayoutProps) {
  const params = await props.params;

  const {
    children
  } = props;

  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
