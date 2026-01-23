import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    type: "Service type",
    title: "推論引擎 Inference Engine",
    description:
      "GMI Cloud 的推論服務適用於需要高吞吐量和低延遲的場景。優化的推論堆疊確保模型能夠以最佳效能運行，支援即時 AI 應用。",
    cta: "了解更多",
    ctaLink: "/products#inference",
  },
  {
    type: "Service type",
    title: "叢集引擎 Cluster Engine",
    description:
      "GMI Cluster 服務優化於分佈式訓練和大規模計算。透過 InfiniBand 高速網路，實現多節點協同運算，加速大型模型訓練。",
    cta: "開始部署",
    ctaLink: "/products#cluster",
  },
];

const ServiceEngineSection = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">
            強化您的 GPU 雲端運算
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            打破效能瓶頸，全面加速 AI 訓練與推論。
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-card-border rounded-xl p-4 sm:p-6 border-l-4 border-l-primary hover:shadow-md transition-shadow"
            >
              {/* Service Type Label */}
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {service.type}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-heading mt-2 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                {service.description}
              </p>

              {/* CTA Button */}
              <Button asChild>
                <Link to={service.ctaLink}>{service.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceEngineSection;
