import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ctaLandscape from "@/assets/inference/cta-landscape.jpg";

const InferenceCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={ctaLandscape}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t("inferenceEngine.cta.title")}
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            {t("inferenceEngine.cta.subtitle")}
          </p>
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-slate-900"
          >
            <Link to="/contact">{t("common.getStarted")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InferenceCTA;
