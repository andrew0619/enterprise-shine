import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroCubes from "@/assets/home/hero-cubes.jpg";

const pillars = [
  { label: "GPUs" },
  { label: "AI/ML Ops" },
  { label: "Inference" },
];

const partnerLogos = [
  "NVIDIA",
  "Lenovo",
  "VMware",
  "Dell",
  "Intel",
  "AMD",
];

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Borderless Deployment.
            <br />
            <span className="text-primary">Unlimited AI.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Deploy AI infrastructure at scale with enterprise-grade GPU clusters. 
            From development to production, we power the world's most demanding AI workloads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link to="/products">View Products</Link>
            </Button>
          </div>
        </div>

        {/* 3D Cubes Visual */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <img
            src={heroCubes}
            alt="GPU, AI/ML Ops, and Inference cubes"
            className="w-full h-auto"
          />
        </div>

        {/* Partner Strip */}
        <div className="border-t pt-12">
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partnerLogos.map((logo) => (
              <span
                key={logo}
                className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
