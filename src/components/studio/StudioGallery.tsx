import GalleryCard from "./GalleryCard";

const galleryItems = [
  {
    gradient: "from-zinc-600 via-stone-500 to-zinc-400",
    title: "Winter Streets",
    subtitle: "Urban exploration",
    date: "DEC 2025",
    category: "Photography",
  },
  {
    gradient: "from-amber-500 via-yellow-400 to-orange-300",
    title: "Yellow Cab",
    subtitle: "City life series",
    date: "NOV 2025",
    category: "Digital Art",
  },
  {
    gradient: "from-slate-700 via-blue-900 to-slate-600",
    title: "Neon Nights",
    subtitle: "Cyberpunk dreams",
    date: "OCT 2025",
    category: "3D Render",
  },
  {
    gradient: "from-teal-500 via-emerald-400 to-cyan-300",
    title: "Digital Muse",
    subtitle: "Character design",
    date: "SEP 2025",
    category: "Illustration",
  },
  {
    gradient: "from-blue-600 via-indigo-500 to-purple-400",
    title: "Rainy Reflections",
    subtitle: "Mood photography",
    date: "AUG 2025",
    category: "Photography",
  },
  {
    gradient: "from-purple-400 via-pink-300 to-rose-200",
    title: "Dream Sequence",
    subtitle: "Abstract visions",
    date: "JUL 2025",
    category: "AI Art",
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
