"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RestaurantCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export function RestaurantCard({
  id,
  name,
  description,
  imageUrl,
}: RestaurantCardProps) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];

  return (
    <Link
      href={`/${lang}/restaurant/${id}`}
      className="block touch-manipulation"
    >
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-border hover:bg-primary/5 active:bg-primary/10 transition-colors">
        <div className="relative w-full aspect-[4/3] mb-3">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 480px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-base line-clamp-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
