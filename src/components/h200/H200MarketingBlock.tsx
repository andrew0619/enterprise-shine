import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const H200MarketingBlock = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useTranslation();

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t("h200Page.marketing.title")}
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {t("h200Page.marketing.description")}
          </p>
          
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            <Link to="/contact">{t("h200Page.marketing.cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

H200MarketingBlock.displayName = "H200MarketingBlock";

export default H200MarketingBlock;
