import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ctaDeveloper from "@/assets/developers/cta-developer.jpg";

const DemoReadyBanner = () => {
  return (
    <div className="relative h-[280px] md:h-[300px] rounded-2xl overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={ctaDeveloper}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Left side dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 max-w-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Ready to build?
        </h2>
        <p className="text-white/90 mt-3 text-sm md:text-base">
          Explore powerful AI models and launch your project in just a few clicks.
        </p>
        <Button asChild className="mt-6 w-fit">
          <Link to="/contact">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default DemoReadyBanner;
