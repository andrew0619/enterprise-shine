import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const H200CTABanner = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Dark Background with Abstract Metallic Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          
          {/* Light Reflection Effects */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full" />
          
          {/* Metallic Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 max-w-4xl mx-auto">
              Don't miss out on the opportunity to deploy the most powerful GPU resources in the world.
            </h2>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 px-8"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default H200CTABanner;
