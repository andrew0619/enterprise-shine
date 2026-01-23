import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ctaLandscape from "@/assets/cluster/cta-landscape.jpg";

const DualCTABanners = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Banner 1 - Dark with nature background */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={ctaLandscape} 
            alt="Beautiful landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("clusterEngine.darkCtaTitle")}
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {t("clusterEngine.darkCtaSubtitle")}
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">{t("common.learnMore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Banner 2 - Simple Light */}
      <section className="bg-blue-100 py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t("clusterEngine.ctaTitle")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("clusterEngine.ctaSubtitle")}
          </p>
          <Button asChild size="lg" className="font-semibold">
            <Link to="/contact">{t("common.getStarted")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default DualCTABanners;
