import { Button } from "@/components/ui/button";
import { ExternalLink, Code } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DemoAppCardProps {
  title: string;
  description: string;
  tags: string[];
  mockupType: "chat" | "form" | "agent";
}

const DemoAppCard = ({ title, description, tags, mockupType }: DemoAppCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Window Mockup */}
      <div className="bg-slate-100 rounded-lg p-4 h-48">
        <div className="bg-white rounded-md h-full overflow-hidden shadow-sm">
          {/* Window header bar */}
          <div className="h-7 bg-slate-200 flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          
          {/* Content area - varies by type */}
          <div className="p-3">
            {mockupType === "chat" && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2.5 bg-slate-100 rounded w-3/4" />
                    <div className="h-2.5 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="bg-primary/10 rounded-lg p-2 max-w-[70%]">
                    <div className="h-2 bg-primary/20 rounded w-full mb-1" />
                    <div className="h-2 bg-primary/20 rounded w-2/3" />
                  </div>
                </div>
                <div className="h-8 bg-slate-50 rounded mt-3 flex items-center px-2">
                  <div className="h-2 bg-slate-200 rounded w-1/3" />
                </div>
              </div>
            )}
            
            {mockupType === "form" && (
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded w-1/3 mb-3" />
                <div className="h-6 bg-slate-50 rounded border border-slate-200" />
                <div className="h-3 bg-slate-200 rounded w-1/4 mt-2" />
                <div className="h-6 bg-slate-50 rounded border border-slate-200" />
                <div className="h-6 bg-primary/20 rounded w-1/3 mt-3" />
              </div>
            )}
            
            {mockupType === "agent" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded bg-primary/30" />
                  <div className="h-2.5 bg-slate-200 rounded w-1/2" />
                </div>
                <div className="bg-slate-50 rounded p-2 space-y-1">
                  <div className="h-2 bg-slate-200 rounded w-full" />
                  <div className="h-2 bg-slate-200 rounded w-4/5" />
                  <div className="h-2 bg-slate-200 rounded w-3/5" />
                </div>
                <div className="flex gap-1 mt-2">
                  <div className="h-4 bg-green-100 rounded w-12" />
                  <div className="h-4 bg-blue-100 rounded w-16" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 mt-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 text-sm mt-2 leading-relaxed">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <Button size="sm" className="gap-1.5">
          <ExternalLink className="h-3.5 w-3.5" />
          {t("developers.link")}
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50">
          <Code className="h-3.5 w-3.5" />
          {t("developers.code")}
        </Button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DemoAppCard;