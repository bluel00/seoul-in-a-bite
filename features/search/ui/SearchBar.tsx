"use client";

import { Input } from "@/shared/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { KeywordDropdown } from "./KeywordDropdown";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClear = () => {
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="맛집을 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </form>
      {isDropdownOpen && (
        <KeywordDropdown
          onSelect={(keyword) => {
            setSearchTerm(keyword);
            setIsDropdownOpen(false);
          }}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
