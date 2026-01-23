import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ctaTech from "@/assets/h200/cta-tech.jpg";

const H200CTABanner = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useTranslation();

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={ctaTech}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 max-w-4xl mx-auto">
              {t("h200Page.cta.title")}
            </h2>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 px-8"
            >
              <Link to="/contact">{t("h200Page.cta.button")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

H200CTABanner.displayName = "H200CTABanner";

export default H200CTABanner;
