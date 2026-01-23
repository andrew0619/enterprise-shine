import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PartnersHero = () => {
  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden min-h-[80vh] flex items-center">
      {/* Metallic Fluid Ribbon - Top Right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
        {/* Gold/Bronze layer */}
        <div className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 opacity-80">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 rounded-full blur-3xl transform rotate-12" />
        </div>
        {/* Blue metallic layer */}
        <div className="absolute top-10 right-20 w-72 h-72 md:w-[400px] md:h-[400px] opacity-70">
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-500 via-cyan-400 to-blue-600 rounded-full blur-3xl transform -rotate-12" />
        </div>
        {/* Silver/white accent */}
        <div className="absolute top-32 right-32 w-48 h-48 md:w-64 md:h-64 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-200 to-slate-400 rounded-full blur-2xl" />
        </div>
        {/* Ribbon curve simulation */}
        <div className="absolute top-16 right-8 w-80 h-40 md:w-[450px] md:h-56 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent blur-xl transform skew-y-12 rotate-[-20deg]" />
        </div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Join the <span className="text-primary">NexusAI</span> Partner Program
          </h1>
          
          {/* Subtext */}
          <p className="text-zinc-400 text-lg md:text-xl mb-8 max-w-xl">
            Join a robust ecosystem of technology leaders to drive growth and innovation in AI infrastructure.
          </p>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-zinc-100 font-semibold px-8"
          >
            <Link to="/contact">Join Now</Link>
          </Button>
        </div>

        {/* Stats Row */}
        <div className="mt-16 md:mt-24 grid grid-cols-3 gap-8 max-w-2xl">
          <div>
            <div className="text-3xl md:text-4xl font-mono font-bold text-white">2023</div>
            <div className="text-sm text-zinc-500 mt-1">Founded</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-mono font-bold text-white">60+</div>
            <div className="text-sm text-zinc-500 mt-1">Partners</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-mono font-bold text-primary">800K+</div>
            <div className="text-sm text-zinc-500 mt-1">GPU Hours</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersHero;
