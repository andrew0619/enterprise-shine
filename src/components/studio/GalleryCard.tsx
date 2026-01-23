import { cn } from "@/lib/utils";

interface GalleryCardProps {
  gradient: string;
  title: string;
  subtitle: string;
  date: string;
  category?: string;
}

const GalleryCard = ({
  gradient,
  title,
  subtitle,
  date,
  category,
}: GalleryCardProps) => {
  return (
    <div className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer">
      {/* Background Image (Gradient Placeholder) */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
          gradient
        )}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Category Tag */}
      {category && (
        <div className="absolute top-4 left-4 z-10">
          <span className="text-xs text-white/70 uppercase tracking-wider font-medium">
            {category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm">{subtitle}</p>
      </div>

      {/* Date Badge */}
      <div className="absolute bottom-5 right-5 z-10">
        <span className="text-xs text-white/60 font-medium">{date}</span>
      </div>

      {/* Hover Brightness Effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
    </div>
  );
};

export default GalleryCard;
