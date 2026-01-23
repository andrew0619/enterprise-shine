const logos = [
  { name: "ddn", color: "text-red-600", weight: "font-bold" },
  { name: "Taiwan Mobile", color: "text-sky-500", weight: "font-semibold" },
  { name: "SOFTFRONT", color: "text-purple-600", weight: "font-bold" },
  { name: "TREND MICRO", color: "text-red-500", weight: "font-bold" },
  { name: "MAGNA", color: "text-indigo-600", weight: "font-bold" },
  { name: "MACNICA", color: "text-red-600", weight: "font-bold" },
  { name: "wiAdvance", color: "text-emerald-600", weight: "font-semibold" },
];

const LogoMarquee = () => {
  return (
    <section className="bg-muted/30 py-12 overflow-hidden">
      <p className="text-center text-sm text-muted-foreground mb-8">
        攜手全球夥伴，共同推動 AI 發展
      </p>
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <span className={`text-2xl ${logo.color} ${logo.weight} tracking-wide`}>
                {logo.name}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <span className={`text-2xl ${logo.color} ${logo.weight} tracking-wide`}>
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
