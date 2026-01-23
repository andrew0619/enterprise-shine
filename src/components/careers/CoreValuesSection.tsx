import { useTranslation } from "react-i18next";

const CoreValuesSection = () => {
  const { t } = useTranslation();

  const coreValues = [
    {
      title: t("careers.values.engineering.title"),
      description: t("careers.values.engineering.description"),
    },
    {
      title: t("careers.values.business.title"),
      description: t("careers.values.business.description"),
    },
    {
      title: t("careers.values.startup.title"),
      description: t("careers.values.startup.description"),
    },
  ];

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container">
        {/* Kicker Text */}
        <p className="text-muted-foreground text-sm mb-10 max-w-2xl">
          {t("careers.valuesKicker")}
        </p>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-blue-50/50 rounded-xl p-8"
            >
              <h3 className="text-lg font-semibold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
