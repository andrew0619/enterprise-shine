import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PricingGPUCards = () => {
  const { t } = useTranslation();

  const gpuPlans = [
    {
      name: "NVIDIA H200",
      label: t("pricing.gpuPlans.h200.label"),
      price: "$2.50",
      unit: "/ GPU-hour",
      description: t("pricing.gpuPlans.h200.description"),
      cta: t("pricing.gpuPlans.h200.cta"),
      ctaLink: "/contact",
    },
    {
      name: "NVIDIA H100",
      label: t("pricing.gpuPlans.h100.label"),
      price: "$2.10",
      unit: "/ GPU-hour",
      description: t("pricing.gpuPlans.h100.description"),
      cta: t("pricing.gpuPlans.h100.cta"),
      ctaLink: "/contact",
      featured: true,
    },
    {
      name: "NVIDIA Blackwell Platforms",
      label: t("pricing.gpuPlans.blackwell.label"),
      headline: t("pricing.gpuPlans.blackwell.headline"),
      description: t("pricing.gpuPlans.blackwell.description"),
      cta: t("pricing.gpuPlans.blackwell.cta"),
      ctaLink: "/contact",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gpuPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-card border border-card-border rounded-xl p-6 flex flex-col ${
                plan.featured ? "ring-2 ring-primary" : ""
              }`}
            >
              {/* Label */}
              <span className="text-sm font-medium text-primary mb-2">
                {plan.label}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-heading mb-4">
                {plan.name}
              </h3>

              {/* Price or Headline */}
              {plan.price ? (
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {plan.unit}
                  </span>
                </div>
              ) : (
                <div className="mb-4">
                  <span className="text-2xl font-bold text-heading">
                    {plan.headline}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground text-sm flex-1 mb-6">
                {plan.description}
              </p>

              {/* CTA Button */}
              <Button asChild className="w-full">
                <Link to={plan.ctaLink}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingGPUCards;