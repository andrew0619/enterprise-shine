import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CareersHero = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Build the Future of AI with NexusAI
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At NexusAI, we're not just building cutting-edge cloud infrastructure — we're shaping the future of AI and high-performance computing. Innovation thrives when brilliant minds have the freedom to push boundaries, which is why we foster a dynamic, fast-paced environment where creativity and expertise drive progress.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">Join NexusAI</Link>
              </Button>
              <Link
                to="#positions"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                See Open Positions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual - Professional working on laptop */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100">
              {/* CSS-based illustration of person working */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Desk/workspace simulation */}
                <div className="relative w-full h-full">
                  {/* Background warmth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100" />
                  
                  {/* Window light effect */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/60 to-transparent" />
                  
                  {/* Person silhouette area */}
                  <div className="absolute bottom-0 left-1/4 w-1/2 h-3/4">
                    {/* Laptop */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-20 bg-slate-300 rounded-t-lg shadow-lg">
                      <div className="absolute inset-2 bg-slate-700 rounded" />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-2 bg-slate-400 rounded-b" />
                    </div>
                    
                    {/* Coffee cup */}
                    <div className="absolute bottom-16 right-4 w-6 h-8 bg-white rounded-b-lg shadow-md">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-amber-800 rounded-t-sm" />
                    </div>
                    
                    {/* Plant */}
                    <div className="absolute bottom-16 left-4">
                      <div className="w-4 h-6 bg-amber-700 rounded-sm" />
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-6 bg-green-500 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-8 left-8 w-16 h-16 border-2 border-amber-200/50 rounded-lg" />
                  <div className="absolute top-24 right-12 w-8 h-8 bg-rose-200/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
