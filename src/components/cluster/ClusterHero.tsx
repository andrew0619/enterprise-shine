import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroCube from "@/assets/cluster/hero-cube.jpg";

const ClusterHero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("clusterEngine.heroTitle")}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("clusterEngine.heroSubtitle")}
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">{t("clusterEngine.deployNow")}</Link>
            </Button>
          </div>

          {/* Right Visual - 3D Cube Device Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <img 
                src={heroCube} 
                alt="Cluster Engine Server Cube"
                className="w-full h-full object-contain"
              />
              {/* Label overlay */}
              <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm">
                Cluster Engine
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClusterHero;
