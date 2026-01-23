import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ModelFilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ModelFilterBar = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: ModelFilterBarProps) => {
  const { t } = useTranslation();

  const filters = [
    { key: "All", label: t("modelLibrary.filters.all") },
    { key: "LLM", label: t("modelLibrary.filters.llm") },
    { key: "Vision", label: t("modelLibrary.filters.vision") },
    { key: "Embedding", label: t("modelLibrary.filters.embedding") },
  ];

  return (
    <div className="bg-background sticky top-16 z-40 py-4 border-b">
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-slate-100 text-muted-foreground hover:bg-slate-200"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("modelLibrary.searchPlaceholder")}
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
