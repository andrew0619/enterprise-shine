import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const InferenceSection = () => {
  const { t } = useTranslation();

  const models = [
    {
      type: "Chat",
      name: "DeepSeek R1",
      description: t("models.deepseekR1.description"),
      icon: "🐋",
      iconColor: "text-blue-500",
      free: false,
    },
    {
      type: "Chat",
      name: "DeepSeek R1 Distill Llama 70B Free",
      description: t("models.deepseekR1Distill.description"),
      icon: "🐋",
      iconColor: "text-blue-500",
      free: true,
    },
    {
      type: "Chat",
      name: "Llama 3.3 70B Instruct Turbo Free",
      description: t("models.llama33.description"),
      icon: "∞",
      iconColor: "text-blue-600",
      free: true,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("home.inferenceTitle")}
            </h2>
            <Button asChild variant="default" size="sm">
              <Link to="/products/inference-engine">{t("common.learnMore")}</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t("home.inferenceDescription1")}
            </p>
            <p className="text-muted-foreground">
              {t("home.inferenceDescription2")}
            </p>
          </div>
        </div>

        {/* Models label */}
        <p className="text-sm text-muted-foreground mb-6">
          {t("home.inferenceModelsLabel")}
        </p>

        {/* Models grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <Card
              key={model.name}
              className="group border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg relative"
            >
              <CardContent className="p-6">
                {/* Header with type and free badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm text-muted-foreground">{model.type}</span>
                  {model.free && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {t("models.free")}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <span className={`text-6xl ${model.iconColor}`}>{model.icon}</span>
                </div>

                {/* Model name */}
                <h3 className="text-lg font-semibold mb-3">{model.name}</h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {model.description}
                </p>

                {/* Learn more link */}
                <Link
                  to="/products/model-library"
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary group"
                >
                  {t("common.learnMore")}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InferenceSection;
