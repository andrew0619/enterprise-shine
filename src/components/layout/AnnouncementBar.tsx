import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { siteConfig } from "@/config/site-config";

const AnnouncementBar = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  // 根據 siteConfig 控制顯示
  if (!siteConfig.navigation.showAnnouncementBar || !isVisible) return null;

  return (
    <div className="bg-announcement text-announcement-foreground py-2.5 px-4">
      <div className="container flex items-center justify-center gap-2 text-sm">
        <span className="font-medium">
          New: Latest H100 GPU clusters now available in 12 regions
        </span>
        <a
          href="#"
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline"
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-destructive/20 rounded-full transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
