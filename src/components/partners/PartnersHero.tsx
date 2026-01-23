import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroFluid from "@/assets/partners/hero-fluid.jpg";

const PartnersHero = () => {
  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden min-h-[80vh] flex items-center">
      {/* Metallic Fluid Image - Top Right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
        <img
          src={heroFluid}
          alt=""
          className="w-full h-full object-contain object-right-top"
        />
        {/* Subtle glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/50" />
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
