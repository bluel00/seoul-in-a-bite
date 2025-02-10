import Image from "next/image";
import Link from "next/link";

interface RestaurantCardProps {
  id: number;
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
  return (
    <Link href={`/restaurant/${id}`}>
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-border hover:shadow-md transition-shadow">
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
