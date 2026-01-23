import { MemoryStick, Gauge, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

const H200FeatureGrid = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: MemoryStick,
      titleKey: "h200Page.features.memory.title",
      descriptionKey: "h200Page.features.memory.description",
    },
    {
      icon: Gauge,
      titleKey: "h200Page.features.bandwidth.title",
      descriptionKey: "h200Page.features.bandwidth.description",
    },
    {
      icon: Cpu,
      titleKey: "h200Page.features.performance.title",
      descriptionKey: "h200Page.features.performance.description",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="bg-secondary/50 rounded-xl p-6 hover:bg-secondary/70 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default H200FeatureGrid;
