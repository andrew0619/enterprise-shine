import GalleryCard from "./GalleryCard";

// Import images
import gallerySnow from "@/assets/studio/gallery-snow.jpg";
import galleryCar from "@/assets/studio/gallery-car.jpg";
import galleryFriends from "@/assets/studio/gallery-friends.jpg";
import galleryPortrait from "@/assets/studio/gallery-portrait.jpg";
import galleryTypography from "@/assets/studio/gallery-typography.jpg";
import galleryAnime from "@/assets/studio/gallery-anime.jpg";

const galleryItems = [
  {
    imageSrc: gallerySnow,
    title: "World of Depth",
    author: "Rinessa Official",
    aiTools: ["Gemini 2.5", "Gemini 3"],
  },
  {
    imageSrc: galleryCar,
    title: "Automotive in Motion",
    author: "Josh",
    aiTools: ["Veo 1", "Gemini 3 Pro"],
  },
  {
    imageSrc: galleryFriends,
    title: "Long Distance Friends",
    author: "Mia Zhu",
    aiTools: ["Gemini 3 Pro", "Kling 2.6"],
  },
  {
    imageSrc: galleryPortrait,
    title: "One Character, Many Worlds",
    author: "Jie",
    aiTools: ["Gemini 3 Pro"],
  },
  {
    imageSrc: galleryTypography,
    title: "Wear the Process",
    author: "Lloyd",
    aiTools: ["Nano Banana", "Kling 2.5"],
  },
  {
    imageSrc: galleryAnime,
    title: "The Walk-In Shot",
    author: "Viri",
    aiTools: ["Mini26", "Gemini 3 Pro"],
  },
];

const StudioGallery = () => {
  return (
    <section className="bg-[#000000] py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            One canvas for your
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            entire creative process
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <GalleryCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioGallery;
