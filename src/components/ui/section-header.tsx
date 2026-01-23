/**
 * SectionHeader - 通用頁面區塊標題組件
 * 減少重複的標題+副標題模式
 */

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={cn("max-w-3xl mb-12", alignmentClasses[align], className)}>
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold text-heading mb-4",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg text-muted-foreground",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
      {description && (
        <p
          className={cn(
            "text-base text-muted-foreground mt-4",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;

