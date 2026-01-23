import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InferenceHero = () => {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              NexusAI Cloud Inference Engine
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Run and scale generative AI models with ease. Deploy pre-trained models for fast, low-latency inference deployment with blazing speed and scalability at scale you can rely on.
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Right Visual - 3D Cube Device */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              {/* Main cube body */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative transform rotate-12">
                  {/* Front face */}
                  <div className="w-44 h-52 md:w-52 md:h-60 bg-gradient-to-b from-slate-700 to-slate-900 rounded-xl shadow-2xl">
                    {/* Top face (3D effect) */}
                    <div 
                      className="absolute -top-4 left-2 right-2 h-8 bg-gradient-to-b from-slate-500 to-slate-700 rounded-t-lg"
                      style={{ clipPath: "polygon(8% 100%, 92% 100%, 100% 0%, 0% 0%)" }} 
                    />
                    
                    {/* Right face (3D effect) */}
                    <div 
                      className="absolute top-0 -right-4 w-8 h-full bg-gradient-to-r from-slate-800 to-slate-950 rounded-r-lg"
                      style={{ clipPath: "polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)" }} 
                    />
                    
                    {/* Label on front */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="bg-primary/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                        <p className="text-primary text-xs font-medium">Inference</p>
                        <p className="text-white text-sm font-bold">Engine</p>
                      </div>
                    </div>
                    
                    {/* Status LED */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
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

export default InferenceHero;
