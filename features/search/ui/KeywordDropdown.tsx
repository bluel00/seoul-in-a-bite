"use client";

import { MOCK_SEARCH_KEYWORDS } from "@/shared/lib/mock-data";
import { useEffect, useRef } from "react";

interface KeywordDropdownProps {
  onSelect: (keyword: string) => void;
  onClose: () => void;
}

export function KeywordDropdown({ onSelect, onClose }: KeywordDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200"
    >
      <div className="py-2">
        <h3 className="px-4 py-2 text-sm font-medium text-gray-500">
          추천 검색어
        </h3>
        <ul>
          {MOCK_SEARCH_KEYWORDS.map((keyword) => (
            <li key={keyword}>
              <button
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                onClick={() => onSelect(keyword)}
              >
                {keyword}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
