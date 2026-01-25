/**
 * PageHeader - 通用頁面標題組件
 * 用於頁面頂部的標題區域，減少重複代碼
 */

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
  // 背景變體
  variant?: "default" | "dark" | "gradient";
  // 間距
  spacing?: "sm" | "md" | "lg";
}

export function PageHeader({
  title,
  subtitle,
  description,
  badge,
  align = "center",
  className,
  children,
  variant = "default",
  spacing = "md",
}: PageHeaderProps) {
  const variantClasses = {
    default: "bg-background",
    dark: "bg-foreground text-background",
    gradient: "bg-gradient-to-b from-primary/5 to-background",
  };

  const spacingClasses = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-20",
    lg: "py-20 md:py-28",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
  };

  return (
    <section
      className={cn(
        variantClasses[variant],
        spacingClasses[spacing],
        className
      )}
    >
      <div className="container">
        <div className={cn(alignClasses[align], align === "center" && "max-w-3xl mx-auto")}>
          {/* Badge */}
          {badge && (
            <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
              {badge}
            </span>
          )}

          {/* Title */}
          <h1
            className={cn(
              "text-4xl md:text-5xl font-bold mb-4",
              variant === "dark" ? "text-background" : "text-heading"
            )}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={cn(
                "text-lg md:text-xl mb-4",
                variant === "dark" ? "text-background/80" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p
              className={cn(
                "text-base max-w-2xl",
                align === "center" && "mx-auto",
                variant === "dark" ? "text-background/70" : "text-muted-foreground"
              )}
            >
              {description}
            </p>
          )}

          {/* Custom Content (e.g., CTA buttons) */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export default PageHeader;


