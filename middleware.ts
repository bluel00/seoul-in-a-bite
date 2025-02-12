import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/shared/i18n/settings";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 루트 경로로 접근시 기본 언어로 리다이렉트
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
