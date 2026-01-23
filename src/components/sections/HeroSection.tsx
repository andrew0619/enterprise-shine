import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Server, Zap } from "lucide-react";

const pillars = [
  {
    label: "GPUs",
    icon: Cpu,
    gradient: "from-primary/80 to-primary",
  },
  {
    label: "A100/H100",
    icon: Server,
    gradient: "from-primary to-primary/90",
  },
  {
    label: "Inference",
    icon: Zap,
    gradient: "from-primary/90 to-primary/70",
  },
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

        {/* 3D Pillars Visual */}
        <div className="flex justify-center items-end gap-6 md:gap-10 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {pillars.map((pillar, index) => (
            <div
              key={pillar.label}
              className="group relative"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div
                className={`w-24 md:w-32 h-40 md:h-56 rounded-xl bg-gradient-to-b ${pillar.gradient} shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 flex flex-col items-center justify-center gap-3`}
              >
                <pillar.icon className="h-8 w-8 md:h-12 md:w-12 text-primary-foreground" />
                <span className="text-primary-foreground font-semibold text-sm md:text-base">
                  {pillar.label}
                </span>
              </div>
              {/* Reflection */}
              <div
                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 md:w-28 h-4 rounded-full bg-gradient-to-r ${pillar.gradient} opacity-20 blur-md`}
              />
            </div>
          ))}
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
