"use client";

import { Card, CardHeader, CardTitle } from "@/shared/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ThemeCardProps {
  id: number;
  title: string;
  imageUrl: string;
  slug: string;
}

export function ThemeCard({ title, imageUrl, slug }: ThemeCardProps) {
  return (
    <Link href={`/category/${slug}`} className="block">
      <Card className="group h-[140px] overflow-hidden">
        <div className="relative w-full h-[90px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={180}
            height={90}
            className="transition-transform group-hover:scale-105 duration-300"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            priority
          />
        </div>
        <CardHeader className="p-2 h-[50px]">
          <CardTitle className="text-xs font-medium line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
