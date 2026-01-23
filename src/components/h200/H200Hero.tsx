import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroGpu from "@/assets/h200/hero-gpu.jpg";

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
          
          {/* Right Visual - H200 GPU Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroGpu}
                alt="NVIDIA H200 GPU"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default H200Hero;
