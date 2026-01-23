import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const HGXB200FeaturesSection = () => {
  const { t } = useTranslation();
  const featureKeys = ["performance", "architecture", "scalability"] as const;

  return (
    <section id="features" className="bg-white py-20">
      <div className="container">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t("hgxb200Page.features.sectionTitle")}
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {t("hgxb200Page.features.sectionDescription")}
          </p>
          <ul className="space-y-6 mb-10">
            {featureKeys.map((key) => (
              <li key={key} className="flex gap-3">
                <span className="text-primary mt-1.5">•</span>
                <div>
                  <span className="font-semibold text-slate-900">{t(`hgxb200Page.features.items.${key}.title`)}:</span>{" "}
                  <span className="text-slate-600">{t(`hgxb200Page.features.items.${key}.description`)}</span>
                </div>
              </li>
            ))}
          </ul>
          <a href="https://www.nvidia.com/en-us/data-center/hgx/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
            {t("hgxb200Page.features.datasheet")}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HGXB200FeaturesSection;
