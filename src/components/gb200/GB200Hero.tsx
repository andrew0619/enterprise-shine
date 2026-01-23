import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroRack from "@/assets/gb200/hero-rack.jpg";

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
          
          {/* Right Visual - GB200 NVL72 Server Rack Image */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={heroRack}
              alt="NVIDIA GB200 NVL72"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GB200Hero;
