const partnerLogos = [
  { name: "NVIDIA", display: "NVIDIA" },
  { name: "Reuters", display: "Reuters" },
  { name: "Headline", display: "Headline" },
  { name: "HOT", display: "HOT" },
  { name: "Digital", display: "Digital" },
  { name: "ORB", display: "ORB" },
  { name: "WeaveAI", display: "WeaveAI" },
];

const PartnerLogosStrip = () => {
  return (
    <section className="bg-black py-8 border-t border-zinc-900">
      <div className="container">
        <p className="text-center text-xs text-zinc-600 mb-6 uppercase tracking-wider">
          Built in partnership with
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="text-zinc-600 font-semibold text-sm md:text-base tracking-wide hover:text-zinc-400 transition-colors"
            >
              {logo.display}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosStrip;
