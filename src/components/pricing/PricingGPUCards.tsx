import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const gpuPlans = [
  {
    name: "NVIDIA H200",
    label: "最高性能",
    price: "$2.50",
    unit: "/ GPU-hour",
    description: "適用於大規模訓練需求、最強大算力的選項。搭載 HBM3e 記憶體，提供無與倫比的 AI 訓練效能。",
    cta: "聯繫我們",
    ctaLink: "/contact",
  },
  {
    name: "NVIDIA H100",
    label: "效能與成本兼備",
    price: "$2.10",
    unit: "/ GPU-hour",
    description: "適合大量推理任務需求，具備成本效益的最佳化選項。80GB HBM3 記憶體，滿足企業級 AI 部署。",
    cta: "立即部署",
    ctaLink: "/contact",
    featured: true,
  },
  {
    name: "NVIDIA Blackwell Platforms",
    label: "Coming Soon",
    headline: "搶先預訂",
    description: "Blackwell 將於 2025 年上市，具備更高能效和 AI 優化特性，適合下一代 AI 工作負載。",
    cta: "立即預訂",
    ctaLink: "/contact",
  },
];

const PricingGPUCards = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
