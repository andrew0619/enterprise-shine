import { useTranslation } from "react-i18next";

const SmarterWayCards = () => {
  const { t } = useTranslation();

  const featureCards = [
    {
      title: t("inferenceEngine.features.deployment.title"),
      description: t("inferenceEngine.features.deployment.description"),
    },
    {
      title: t("inferenceEngine.features.efficiency.title"),
      description: t("inferenceEngine.features.efficiency.description"),
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          {t("inferenceEngine.smarterWayTitle")}
        </h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {featureCards.map((card, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-2xl p-8 md:p-10"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmarterWayCards;
