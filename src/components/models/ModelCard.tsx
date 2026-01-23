import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface ModelCardProps {
  id: string;
  name: string;
  provider: string;
  type: string;
  category: "LLM" | "Vision" | "Embedding";
  logoColor: string;
  logoIcon: string;
  isNew?: boolean;
}

const ModelCard = ({
  id,
  name,
  provider,
  type,
  logoColor,
  logoIcon,
  isNew,
}: ModelCardProps) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/models/${id}`}
      className="group block bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between mb-3">
        {/* Logo */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold",
            logoColor
          )}
        >
          {logoIcon}
        </div>

        {/* New Badge */}
        {isNew && (
          <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-primary rounded-full">
            {t("common.new")}
          </span>
        )}
      </div>

      {/* Provider */}
      <p className="text-xs text-muted-foreground mb-1">{provider}</p>

      {/* Model Name */}
      <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
        {name}
      </h3>

      {/* Type Tag */}
      <p className="text-xs text-muted-foreground mb-3">{type}</p>

      {/* Action */}
      <div className="flex justify-end">
        <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          {t("common.viewModel")}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
};

export default ModelCard;
