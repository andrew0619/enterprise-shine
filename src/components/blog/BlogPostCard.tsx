import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type ThumbnailType = "servers" | "abstract" | "event" | "tech";
type CategoryColor = "blue" | "purple" | "green" | "orange";

interface BlogPostCardProps {
  id: number;
  title: string;
  date: string;
  category: string;
  categoryColor: CategoryColor;
  thumbnail: ThumbnailType;
}

const categoryColorClasses: Record<CategoryColor, string> = {
  blue: "bg-blue-600 text-white",
  purple: "bg-purple-600 text-white",
  green: "bg-green-600 text-white",
  orange: "bg-orange-500 text-white",
};

const ThumbnailServers = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="absolute inset-0 flex flex-col justify-around px-6 py-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-4 bg-slate-700/60 rounded flex items-center px-2 gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          <div className="flex-1 h-1 bg-slate-600/50 rounded ml-2" />
        </div>
      ))}
    </div>
    <div className="absolute bottom-3 right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
  </div>
);

const ThumbnailAbstract = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent)]" />
  </div>
);

const ThumbnailEvent = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />
    <div className="absolute bottom-4 left-4 right-4 h-8 bg-white/10 rounded backdrop-blur-sm" />
  </div>
);

const ThumbnailTech = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="absolute inset-0 opacity-30">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M10 0 L10 10 M0 10 L20 10" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-cyan-500" />
          <circle cx="10" cy="10" r="2" fill="currentColor" className="text-cyan-500" />
        </pattern>
        <rect width="100" height="100" fill="url(#circuit)" />
      </svg>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl" />
  </div>
);

const thumbnailComponents: Record<ThumbnailType, React.ComponentType> = {
  servers: ThumbnailServers,
  abstract: ThumbnailAbstract,
  event: ThumbnailEvent,
  tech: ThumbnailTech,
};

const BlogPostCard = ({
  id,
  title,
  date,
  category,
  categoryColor,
  thumbnail,
}: BlogPostCardProps) => {
  const ThumbnailComponent = thumbnailComponents[thumbnail];

  return (
    <Link to={`/blog/${id}`} className="group block">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
        <ThumbnailComponent />
        
        {/* Category Badge */}
        <span
          className={cn(
            "absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full",
            categoryColorClasses[categoryColor]
          )}
        >
          {category}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground mt-1.5">{date}</p>
    </Link>
  );
};

export default BlogPostCard;
