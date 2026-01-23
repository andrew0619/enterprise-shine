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
    { key: "LLM", label: "LLM" },
    { key: "Vision", label: t("modelLibrary.filters.vision") },
    { key: "Video", label: t("modelLibrary.filters.video") },
    { key: "Embedding", label: t("modelLibrary.filters.embedding") },
  ];

  return (
    <div className="bg-white sticky top-16 z-40 py-4 border-b border-slate-200">
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors border",
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("modelLibrary.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-slate-50 border-slate-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelFilterBar;