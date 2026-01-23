import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ClusterHero = () => {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              NexusAI Cloud Cluster Engine
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Automated orchestration for AI workloads at scale. Deploy, manage, and monitor GPU clusters with enterprise-grade reliability and performance.
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">Deploy Now</Link>
            </Button>
          </div>

          {/* Right Visual - 3D Cube Device */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Main cube body */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 3D Cube representation */}
                <div className="relative">
                  {/* Front face */}
                  <div className="w-48 h-56 md:w-56 md:h-64 bg-gradient-to-b from-slate-700 to-slate-900 rounded-xl shadow-2xl transform perspective-1000">
                    {/* Top face (3D effect) */}
                    <div className="absolute -top-4 left-2 right-2 h-8 bg-gradient-to-b from-slate-500 to-slate-700 rounded-t-lg transform skew-x-0" 
                         style={{ clipPath: "polygon(8% 100%, 92% 100%, 100% 0%, 0% 0%)" }} />
                    
                    {/* Right face (3D effect) */}
                    <div className="absolute top-0 -right-4 w-8 h-full bg-gradient-to-r from-slate-800 to-slate-950 rounded-r-lg"
                         style={{ clipPath: "polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)" }} />
                    
                    {/* Front panel details */}
                    <div className="absolute inset-4 flex flex-col gap-3 pt-6">
                      {/* Ventilation lines */}
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-2 bg-slate-600/50 rounded-full" />
                      ))}
                      
                      {/* Status LED */}
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    
                    {/* NexusAI branding on cube */}
                    <div className="absolute bottom-6 right-4 text-slate-400 text-xs font-mono">
                      CLUSTER
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating glow effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-primary/20 blur-2xl rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClusterHero;
