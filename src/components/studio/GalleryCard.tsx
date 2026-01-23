import { cn } from "@/lib/utils";

interface GalleryCardProps {
  imageSrc: string;
  title: string;
  author: string;
  aiTools: string[];
}

const GalleryCard = ({
  imageSrc,
  title,
  author,
  aiTools,
}: GalleryCardProps) => {
  return (
    <div className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer">
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        
        {/* Author */}
        <p className="text-zinc-400 text-sm mb-3">{author}</p>
        
        {/* AI Tools Tags */}
        <div className="flex flex-wrap gap-1.5">
          {aiTools.map((tool, index) => (
            <span
              key={index}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 backdrop-blur-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Brightness Effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
    </div>
  );
};

export default GalleryCard;
