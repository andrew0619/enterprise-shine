import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GB200FeaturesSection = () => {
  const { t } = useTranslation();

  const featureKeys = ["performance", "dataProcessing", "scalability", "efficiency"] as const;

  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t("gb200Page.features.sectionTitle")}
          </h2>
          
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            {t("gb200Page.features.sectionDescription")}
          </p>
          
          <ul className="space-y-6 mb-10">
            {featureKeys.map((key) => (
              <li key={key} className="flex gap-4">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
                <div>
                  <span className="font-semibold text-slate-900">
                    {t(`gb200Page.features.items.${key}.title`)}:
                  </span>{" "}
                  <span className="text-slate-600">
                    {t(`gb200Page.features.items.${key}.description`)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          
          <Button 
            asChild 
            size="lg" 
            className="bg-slate-900 text-white hover:bg-slate-800 px-8"
          >
            <Link to="/contact">{t("gb200Page.features.cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GB200FeaturesSection;
