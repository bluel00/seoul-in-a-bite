"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useRouter } from "next/navigation";

export function CategorySelect() {
  const router = useRouter();

  return (
    <Select onValueChange={(value) => router.push(`/category/${value}`)}>
      <SelectTrigger className="w-full bg-orange-50 border-orange-100 hover:bg-orange-100 focus:ring-orange-200">
        <SelectValue placeholder="카테고리 선택하기" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-orange-100 shadow-md">
        <SelectItem value="korean">한식</SelectItem>
        <SelectItem value="chinese">중식</SelectItem>
        <SelectItem value="japanese">일식</SelectItem>
        <SelectItem value="dessert">디저트</SelectItem>
        <SelectItem value="24-hours">24시간 운영</SelectItem>
        <SelectItem value="vegan">비건/채식</SelectItem>
      </SelectContent>
    </Select>
  );
}
