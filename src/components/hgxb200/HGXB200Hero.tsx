import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroSystem from "@/assets/hgxb200/hero-system.jpg";

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

          {/* Right Visual - HGX B200 System Image */}
          <div className="relative flex items-center justify-center">
            <img
              src={heroSystem}
              alt="NVIDIA HGX B200"
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HGXB200Hero;
