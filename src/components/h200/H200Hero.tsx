import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroGpu from "@/assets/h200/hero-gpu.jpg";

const H200Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="text-primary text-sm font-semibold">
              {t("h200Page.hero.price")}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {t("h200Page.hero.title")}
            </h1>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("h200Page.hero.description")}
            </p>
            
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Link to="/contact">{t("h200Page.hero.cta")}</Link>
            </Button>
          </div>
          
          {/* Right Visual - H200 GPU Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroGpu}
                alt="NVIDIA H200 GPU"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default H200Hero;
