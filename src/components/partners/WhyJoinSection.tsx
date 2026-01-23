import { Zap, Megaphone, HeadphonesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyJoinSection = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Zap,
      title: t("partners.benefits.access.title"),
      description: t("partners.benefits.access.description"),
    },
    {
      icon: Megaphone,
      title: t("partners.benefits.marketing.title"),
      description: t("partners.benefits.marketing.description"),
    },
    {
      icon: HeadphonesIcon,
      title: t("partners.benefits.support.title"),
      description: t("partners.benefits.support.description"),
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
          {t("partners.whyJoinTitle")}
        </h2>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
