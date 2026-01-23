const logos = [
  { name: "ddn", color: "text-red-600", weight: "font-bold" },
  { name: "台灣大哥大", color: "text-sky-500", weight: "font-semibold" },
  { name: "SOFTFRONT", color: "text-purple-600", weight: "font-bold" },
  { name: "TREND MICRO", color: "text-red-500", weight: "font-bold" },
  { name: "宏碁資訊", color: "text-indigo-600", weight: "font-bold" },
  { name: "叡揚資訊", color: "text-blue-600", weight: "font-bold" },
  { name: "MACNICA", color: "text-red-600", weight: "font-bold" },
  { name: "緯謙", color: "text-emerald-600", weight: "font-semibold" },
  { name: "台智雲", color: "text-orange-500", weight: "font-semibold" },
];

const LogoMarquee = () => {
  return (
    <section className="bg-muted/30 py-10 overflow-hidden">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center"
            >
              <span className={`text-xl ${logo.color} ${logo.weight} tracking-wide`}>
                {logo.name}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center"
            >
              <span className={`text-xl ${logo.color} ${logo.weight} tracking-wide`}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
