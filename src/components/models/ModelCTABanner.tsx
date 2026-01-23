import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ModelCTABanner = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-8 md:py-12">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px]">
          {/* Background - Professional conversation visual */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800">
            {/* Abstract people silhouettes */}
            <div className="absolute inset-0 opacity-40">
              {/* Person 1 */}
              <div className="absolute bottom-0 right-1/4 w-32 h-64 bg-gradient-to-t from-slate-500 to-slate-600 rounded-t-full" />
              {/* Person 2 */}
              <div className="absolute bottom-0 right-1/3 w-28 h-56 bg-gradient-to-t from-slate-600 to-slate-700 rounded-t-full" />
              
              {/* Office elements */}
              <div className="absolute bottom-0 right-8 left-1/2 h-20 bg-slate-500/30" />
            </div>
            
            {/* Warm lighting accent */}
            <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
          </div>

          {/* Dark gradient overlay on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />

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
