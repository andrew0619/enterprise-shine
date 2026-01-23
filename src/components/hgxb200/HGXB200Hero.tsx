import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HGXB200Hero = () => {
  return (
    <section className="bg-[#000000] py-20 md:py-28 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Unleash the Power of NVIDIA HGX™ B200
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
              Top-tier performance for complex models and enterprise-scale AI deployments. The ultimate 8-GPU platform for AI training and inference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 px-8"
              >
                <Link to="/contact">Contact Sales</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 px-8"
              >
                <Link to="#features">Learn more</Link>
              </Button>
            </div>
          </div>

          {/* Right Visual - HGX B200 Module (8-GPU Baseboard) */}
          <div className="relative h-[350px] md:h-[400px] flex items-center justify-center">
            {/* Glow effect underneath */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80 h-24 bg-blue-500/15 blur-3xl" />
            
            {/* Main Baseboard Module */}
            <div className="relative w-full max-w-md">
              {/* Base platform */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-3 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-sm" />
              
              {/* Main board */}
              <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg p-4 border border-zinc-700/50">
                {/* Circuit trace lines */}
                <div className="absolute inset-0 overflow-hidden rounded-lg opacity-20">
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                </div>
                
                {/* GPU Grid - 2 rows x 4 columns */}
                <div className="grid grid-cols-4 grid-rows-2 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-zinc-950 rounded border border-zinc-700/30 flex flex-col items-center justify-center p-2"
                    >
                      {/* Heatsink representation */}
                      <div className="w-full flex-1 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-t relative overflow-hidden">
                        {/* Heatsink fin lines */}
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div
                            key={j}
                            className="absolute left-0 right-0 h-px bg-zinc-600"
                            style={{ top: `${(j + 1) * 16}%` }}
                          />
                        ))}
                      </div>
                      {/* LED indicator */}
                      <div 
                        className="w-2 h-2 bg-green-500 rounded-full mt-1 animate-pulse"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    </div>
                  ))}
                </div>
                
                {/* NVLink connectors at bottom */}
                <div className="flex justify-center gap-2 mt-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-2 bg-zinc-700 rounded-sm border border-zinc-600/50"
                    />
                  ))}
                </div>
              </div>
              
              {/* Product label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 text-xs tracking-wider">
                NVIDIA HGX™ B200
              </div>
            </div>
            
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HGXB200Hero;
