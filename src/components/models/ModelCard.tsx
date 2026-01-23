import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface ModelCardProps {
  id: string;
  name: string;
  provider: string;
  type: string;
  category: "LLM" | "Vision" | "Embedding" | "Video";
  logoColor: string;
  logoIcon: string;
  isNew?: boolean;
}

const ModelCard = ({
  id,
  name,
  type,
  logoColor,
  logoIcon,
  isNew,
}: ModelCardProps) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/models/${id}`}
      className="group block bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-sm transition-all"
    >
      {/* Top Row - Logo and Badge */}
      <div className="flex items-start justify-between mb-6">
        {/* Logo */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm",
            logoColor
          )}
        >
          {logoIcon}
        </div>

        {/* New Badge */}
        {isNew && (
          <span className="px-3 py-1 text-xs font-medium border border-rose-300 text-rose-500 rounded-full bg-rose-50">
            NEW
          </span>
        )}
      </div>

      {/* Model Name */}
      <h3 className="text-base font-medium text-foreground mb-6 line-clamp-2 min-h-[48px]">
        {name}
      </h3>

      {/* Bottom Row - Type Tag and Action */}
      <div className="flex items-center justify-between">
        {/* Type Tag */}
        <span className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-slate-100 rounded-full">
          {type}
        </span>

        {/* Action */}
        <span className="text-sm text-primary font-medium group-hover:underline transition-all">
          {t("common.viewModel")}
        </span>
      </div>
    </Link>
  );
};

export default ModelCard;