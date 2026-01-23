import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const H200Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="text-primary text-sm font-semibold">
              Starts from $2.15 / GPU-hour
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Accelerate AI Innovation with NVIDIA H200 Cloud GPUs
            </h1>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              The NVIDIA H200 Tensor Core GPU supercharges generative AI and high-performance computing (HPC) workloads with game-changing performance and memory capabilities. With 141GB of HBM3e memory and 4.8TB/s bandwidth, it delivers unprecedented throughput for large language model inference.
            </p>
            
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Link to="/contact">Deploy Now</Link>
            </Button>
          </div>
          
          {/* Right Visual - H200 Chip */}
          <div className="relative">
            <div className="bg-secondary/30 rounded-2xl p-8 md:p-12 flex items-center justify-center">
              {/* H200 GPU Visual */}
              <div className="relative w-full max-w-md aspect-square">
                {/* GPU Base */}
                <div className="absolute inset-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg shadow-2xl transform rotate-3">
                  {/* Heatsink Pattern */}
                  <div className="absolute inset-4 flex flex-col gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-sm"
                      />
                    ))}
                  </div>
                  
                  {/* NVIDIA Label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 text-black text-xs font-bold px-3 py-1 rounded inline-block">
                      NVIDIA H200
                    </div>
                  </div>
                  
                  {/* Gold Connector Pins */}
                  <div className="absolute -bottom-2 left-8 right-8 h-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-b opacity-80" />
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 via-transparent to-blue-500/20 rounded-lg blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default H200Hero;
