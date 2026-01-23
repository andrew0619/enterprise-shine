import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import postDatacenter from "@/assets/blog/post-datacenter.jpg";
import postAiNetwork from "@/assets/blog/post-ai-network.jpg";
import postTeam from "@/assets/blog/post-team.jpg";

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

const thumbnailImages: Record<ThumbnailType, string> = {
  servers: postDatacenter,
  abstract: postAiNetwork,
  event: postTeam,
  tech: postAiNetwork,
};

const BlogPostCard = ({
  id,
  title,
  date,
  category,
  categoryColor,
  thumbnail,
}: BlogPostCardProps) => {
  const thumbnailImage = thumbnailImages[thumbnail];

  return (
    <Link to={`/blog/${id}`} className="group block">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
        <img
          src={thumbnailImage}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
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
