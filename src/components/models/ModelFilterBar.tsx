import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ModelFilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const filters = ["All", "LLM", "Vision", "Embedding"];

const ModelFilterBar = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: ModelFilterBarProps) => {
  return (
    <div className="bg-background sticky top-16 z-40 py-4 border-b">
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-slate-100 text-muted-foreground hover:bg-slate-200"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelFilterBar;
