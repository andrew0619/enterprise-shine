import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ctaSupport from "@/assets/models/cta-support.jpg";

const ModelCTABanner = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-8 md:py-12">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={ctaSupport}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Dark gradient overlay on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full min-h-[320px] md:min-h-[400px] px-8 md:px-12 py-12 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("modelLibrary.ctaTitle")}
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {t("modelLibrary.ctaSubtitle")}
            </p>
            <div>
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">{t("common.contactSales")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelCTABanner;
