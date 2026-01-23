import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroHolographic from "@/assets/gpu/hero-holographic.jpg";

const GPUHero = () => {
  return (
    <section className="relative overflow-hidden bg-heading py-20 md:py-28">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4">
            GPU 算力租賃
          </h1>
          <p className="text-lg text-white/70 mb-8">
            完整雲端整合的裸機伺服器，以最具競爭力的價格提供。
          </p>
          <Button asChild size="lg" className="px-8">
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
      
      {/* Holographic Visual - Right Side */}
      <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
        <img
          src={heroHolographic}
          alt=""
          className="w-full h-full object-cover opacity-90"
        />
        {/* Gradient fade to blend with background */}
        <div className="absolute inset-0 bg-gradient-to-r from-heading via-transparent to-transparent" />
      </div>
    </section>
  );
};

export default GPUHero;
