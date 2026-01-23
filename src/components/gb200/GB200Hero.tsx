import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GB200Hero = () => {
  return (
    <section className="bg-[#000000] py-20 md:py-28">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Next-Gen AI Acceleration with NVIDIA GB200 NVL72
            </h1>
            
            <p className="text-zinc-400 text-lg leading-relaxed">
              Advanced AI infrastructure designed for the most demanding enterprise workloads. The GB200 NVL72 combines Grace CPUs with Blackwell GPUs for unprecedented performance.
            </p>
            
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-black hover:bg-zinc-200 px-8"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
          
          {/* Right Visual - Dual Server Racks */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-[400px]">
              {/* Server Rack 1 */}
              <div className="absolute left-8 bottom-0 w-32 h-80 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 rounded-t-lg shadow-2xl">
                {/* Rack Details */}
                <div className="absolute inset-2 flex flex-col gap-2 pt-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-full h-6 bg-zinc-900 rounded-sm flex items-center px-2 gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <div className="flex-1 h-1 bg-zinc-700 rounded ml-2" />
                    </div>
                  ))}
                </div>
                {/* Ventilation Grid */}
                <div className="absolute bottom-4 left-2 right-2 h-16 bg-zinc-950 rounded grid grid-cols-6 gap-0.5 p-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-zinc-800 rounded-sm" />
                  ))}
                </div>
              </div>
              
              {/* Server Rack 2 */}
              <div className="absolute right-8 bottom-0 w-32 h-96 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 rounded-t-lg shadow-2xl">
                {/* Rack Details */}
                <div className="absolute inset-2 flex flex-col gap-2 pt-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="w-full h-6 bg-zinc-900 rounded-sm flex items-center px-2 gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <div className="flex-1 h-1 bg-zinc-700 rounded ml-2" />
                    </div>
                  ))}
                </div>
                {/* Ventilation Grid */}
                <div className="absolute bottom-4 left-2 right-2 h-16 bg-zinc-950 rounded grid grid-cols-6 gap-0.5 p-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-zinc-800 rounded-sm" />
                  ))}
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/10 blur-3xl rounded-full" />
              
              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GB200Hero;
