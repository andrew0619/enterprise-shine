import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingNodeCard from "./FloatingNodeCard";
import NodeNetwork from "./NodeNetwork";

// Import images
import heroPortrait from "@/assets/studio/hero-portrait.jpg";
import heroClouds from "@/assets/studio/hero-clouds.jpg";
import heroStones from "@/assets/studio/hero-stones.jpg";
import heroDancer from "@/assets/studio/hero-dancer.jpg";
import heroMusicians from "@/assets/studio/hero-musicians.jpg";
import hero3DFigure from "@/assets/studio/hero-3dfigure.jpg";

const floatingCards = [
  { imageSrc: heroPortrait, size: "md" as const, animation: "float" as const, position: "top-[15%] left-[10%]", delay: "0s" },
  { imageSrc: heroClouds, size: "sm" as const, animation: "float-reverse" as const, position: "top-[12%] right-[12%]", delay: "0.5s" },
  { imageSrc: heroMusicians, size: "lg" as const, animation: "float-slow" as const, position: "top-[40%] left-[5%]", delay: "1s" },
  { imageSrc: hero3DFigure, size: "md" as const, animation: "float" as const, position: "top-[45%] right-[8%]", delay: "1.5s" },
  { imageSrc: heroStones, size: "sm" as const, animation: "float-reverse" as const, position: "bottom-[20%] left-[15%]", delay: "0.8s" },
  { imageSrc: heroDancer, size: "md" as const, animation: "float-slow" as const, position: "bottom-[18%] right-[15%]", delay: "1.2s" },
];

const StudioHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#000000]">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Node Network Lines */}
      <NodeNetwork />

      {/* Floating Cards */}
      {floatingCards.map((card, index) => (
        <div
          key={index}
          className={`absolute ${card.position} hidden md:block z-10`}
        >
          <FloatingNodeCard
            imageSrc={card.imageSrc}
            size={card.size}
            animation={card.animation}
            delay={card.delay}
          />
        </div>
      ))}

      {/* Center Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Creativity That Flows.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Your intelligent canvas for dreaming, iterating, and shaping workflows.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-black hover:bg-zinc-200 rounded-full px-10 py-6 text-lg font-medium"
        >
          <Link to="/contact">Start Now</Link>
        </Button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent" />
    </section>
  );
};

export default StudioHero;
