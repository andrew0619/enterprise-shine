import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DemoReadyBanner = () => {
  return (
    <div className="relative h-[280px] md:h-[300px] rounded-2xl overflow-hidden">
      {/* Background gradient simulating a lifestyle photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-orange-100 to-slate-300" />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_transparent_40%,_rgba(0,0,0,0.05)_100%)]" />
      
      {/* "Person working" visual representation */}
      <div className="absolute right-8 md:right-16 bottom-0 top-8 w-48 md:w-64 opacity-60">
        {/* Laptop shape */}
        <div className="absolute bottom-16 right-0 w-32 md:w-40 h-24 bg-slate-400/40 rounded-t-lg transform -rotate-3" />
        <div className="absolute bottom-12 right-0 w-36 md:w-44 h-2 bg-slate-500/40 rounded transform -rotate-3" />
        {/* Person silhouette suggestion */}
        <div className="absolute bottom-20 right-12 w-16 h-20 bg-slate-400/30 rounded-full blur-sm" />
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
