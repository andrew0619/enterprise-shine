import { cn } from "@/lib/utils";

interface FloatingNodeCardProps {
  imageSrc: string;
  size: "sm" | "md" | "lg";
  animation: "float" | "float-slow" | "float-reverse";
  delay?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-20 h-28 md:w-24 md:h-32",
  md: "w-28 h-36 md:w-32 md:h-44",
  lg: "w-32 h-44 md:w-40 md:h-52",
};

const FloatingNodeCard = ({
  imageSrc,
  size,
  animation,
  delay = "0s",
  className,
}: FloatingNodeCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden shadow-2xl border border-white/10",
        sizeClasses[size],
        animation === "float" && "animate-float",
        animation === "float-slow" && "animate-float-slow",
        animation === "float-reverse" && "animate-float-reverse",
        className
      )}
      style={{ animationDelay: delay }}
    >
      <img 
        src={imageSrc} 
        alt="" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default FloatingNodeCard;
