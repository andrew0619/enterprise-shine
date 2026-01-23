import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingNodeCard from "./FloatingNodeCard";
import NodeNetwork from "./NodeNetwork";

const floatingCards = [
  { gradient: "from-rose-400 via-pink-500 to-purple-500", size: "md" as const, animation: "float" as const, position: "top-[15%] left-[10%]", delay: "0s" },
  { gradient: "from-sky-400 via-blue-500 to-indigo-500", size: "sm" as const, animation: "float-reverse" as const, position: "top-[12%] right-[12%]", delay: "0.5s" },
  { gradient: "from-amber-400 via-orange-500 to-red-500", size: "lg" as const, animation: "float-slow" as const, position: "top-[40%] left-[5%]", delay: "1s" },
  { gradient: "from-emerald-400 via-teal-500 to-cyan-500", size: "md" as const, animation: "float" as const, position: "top-[45%] right-[8%]", delay: "1.5s" },
  { gradient: "from-violet-400 via-purple-500 to-fuchsia-500", size: "sm" as const, animation: "float-reverse" as const, position: "bottom-[20%] left-[15%]", delay: "0.8s" },
  { gradient: "from-lime-400 via-green-500 to-emerald-500", size: "md" as const, animation: "float-slow" as const, position: "bottom-[18%] right-[15%]", delay: "1.2s" },
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
            gradient={card.gradient}
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
