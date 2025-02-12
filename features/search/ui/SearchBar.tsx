import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        placeholder="Search for restaurants or dishes"
        className="w-full rounded-full bg-background py-3 pl-10 pr-4 text-sm border border-input shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
      />
    </div>
  );
}
