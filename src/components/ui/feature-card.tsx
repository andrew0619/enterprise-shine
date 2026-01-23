/**
 * FeatureCard - 通用特色卡片組件
 * 用於展示產品特色、服務項目等
 */

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  // 基本內容
  title: string;
  description: string;
  
  // 圖標選項 (二選一)
  icon?: LucideIcon;
  emoji?: string;
  iconColor?: string;
  
  // 標籤
  badge?: string;
  badgeVariant?: "default" | "primary" | "secondary" | "destructive";
  
  // 連結
  href?: string;
  linkText?: string;
  external?: boolean;
  
  // 樣式
  className?: string;
  featured?: boolean;
  
  // 自定義內容
  children?: ReactNode;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  emoji,
  iconColor = "text-primary",
  badge,
  badgeVariant = "primary",
  href,
  linkText,
  external = false,
  className,
  featured = false,
  children,
}: FeatureCardProps) {
  const badgeVariants = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive/10 text-destructive",
  };

  const cardContent = (
    <CardContent className="p-6">
      {/* Badge */}
      {badge && (
        <span
          className={cn(
            "inline-block text-xs font-medium px-2 py-0.5 rounded mb-4",
            badgeVariants[badgeVariant]
          )}
        >
          {badge}
        </span>
      )}

      {/* Icon */}
      {(Icon || emoji) && (
        <div className="mb-4">
          {Icon ? (
            <Icon className={cn("h-8 w-8", iconColor)} />
          ) : (
            <span className={cn("text-4xl", iconColor)}>{emoji}</span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Custom Content */}
      {children}

      {/* Link */}
      {href && linkText && (
        external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary group"
          >
            {linkText}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        ) : (
          <Link
            to={href}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary group"
          >
            {linkText}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )
      )}
    </CardContent>
  );

  return (
    <Card
      className={cn(
        "group border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg",
        featured && "ring-2 ring-primary",
        className
      )}
    >
      {cardContent}
    </Card>
  );
}

export default FeatureCard;

