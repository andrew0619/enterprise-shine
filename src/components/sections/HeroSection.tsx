import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        {/* Main Content */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6 animate-fade-in">
            {t("home.heroTitle")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t("home.heroSubtitle")}
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/contact">{t("common.getStarted")}</Link>
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
