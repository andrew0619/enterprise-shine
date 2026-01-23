import { Button } from "@/components/ui/button";
import { ExternalLink, Code } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DemoAppCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const DemoAppCard = ({ title, description, tags, image }: DemoAppCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Image with dark overlay */}
      <div className="relative rounded-lg overflow-hidden h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mt-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <Button size="sm" className="gap-1.5">
          <ExternalLink className="h-3.5 w-3.5" />
          {t("developers.link")}
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Code className="h-3.5 w-3.5" />
          {t("developers.code")}
        </Button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DemoAppCard;
