import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroCubes from "@/assets/home/hero-cubes.png";

const partnerLogos = [
  { name: "DeepSeek", icon: "🐋" },
  { name: "OpenAI", icon: "◯" },
  { name: "Anthropic", icon: "A" },
  { name: "NVIDIA", icon: "◆" },
  { name: "LangChain", icon: "🔗" },
  { name: "Hugging Face", icon: "🤗" },
  { name: "Meta", icon: "∞" },
  { name: "Mistral", icon: "M" },
];

const HeroSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        {/* Main Content */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 animate-fade-in">
            Build AI Without Limits
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            We build complete GPU infrastructure so you can focus on what really matters — your AI.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* 3D Cubes Visual */}
        <div className="max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <img
            src={heroCubes}
            alt="GPU, AI/ML Ops, and Inference cubes"
            className="w-full h-auto"
          />
        </div>

        {/* Partner Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              <span className="text-lg">{logo.icon}</span>
              <span className="text-sm md:text-base font-medium">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
