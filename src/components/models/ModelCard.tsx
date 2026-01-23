import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import logo images
import logoWan from "@/assets/models/logo-wan.png";
import logoKling from "@/assets/models/logo-kling.png";
import logoLuma from "@/assets/models/logo-luma.png";
import logoGoogle from "@/assets/models/logo-google.png";
import logoMistral from "@/assets/models/logo-mistral.png";
import logoMeta from "@/assets/models/logo-meta.png";
import logoDeepseek from "@/assets/models/logo-deepseek.png";
import logoStability from "@/assets/models/logo-stability.png";
import logoQwen from "@/assets/models/logo-qwen.png";

export interface ModelCardProps {
  id: string;
  name: string;
  provider: string;
  type: string;
  category: "LLM" | "Vision" | "Embedding" | "Video";
  logoImage?: string;
  isNew?: boolean;
}

// Logo mapping by provider
export const providerLogos: Record<string, string> = {
  "Meta": logoMeta,
  "Mistral AI": logoMistral,
  "Google": logoGoogle,
  "Alibaba": logoQwen,
  "DeepSeek": logoDeepseek,
  "Stability AI": logoStability,
  "LMSys": logoStability,
  "Tsinghua": logoDeepseek,
  "Luma AI": logoLuma,
  "Kuaishou": logoKling,
  "BAAI": logoDeepseek,
  "Microsoft": logoMeta,
  "Wan": logoWan,
};

const ModelCard = ({
  id,
  name,
  type,
  provider,
  logoImage,
  isNew,
}: ModelCardProps) => {
  const { t } = useTranslation();
  
  // Get logo from provider or use provided logoImage
  const logo = logoImage || providerLogos[provider] || logoMeta;

  return (
    <Link
      to={`/models/${id}`}
      className="group block bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-sm transition-all"
    >
      {/* Top Row - Logo and Badge */}
      <div className="flex items-start justify-between mb-6">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white">
          <img 
            src={logo} 
            alt={provider}
            className="w-10 h-10 object-contain"
          />
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