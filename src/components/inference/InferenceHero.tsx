import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroCube from "@/assets/inference/hero-cube.jpg";

const InferenceHero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("inferenceEngine.heroTitle")}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("inferenceEngine.heroSubtitle")}
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">{t("common.getStarted")}</Link>
            </Button>
          </div>

          {/* Right Visual - 3D Cube Image */}
          <div className="relative flex items-center justify-center">
            <img
              src={heroCube}
              alt="Inference Engine"
              className="w-full max-w-sm md:max-w-md rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InferenceHero;
