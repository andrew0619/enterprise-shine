import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HolographicVisual from "./HolographicVisual";

const GPUHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#020617] via-slate-900 to-purple-950 py-20 md:py-28 lg:py-32">
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              GPU 算力租賃
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              Global high-performance computing infrastructure for enterprise AI workloads.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
          
          {/* Right Visual */}
          <div className="flex-1 flex justify-center md:justify-end">
            <HolographicVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GPUHero;
