import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const models = [
  {
    type: "Chat",
    name: "DeepSeek R1",
    description: "Open-source reasoning model, rivaling OpenAI o1, excelling in math, coding, and multi-step reasoning.",
    icon: "🐋",
    iconColor: "text-blue-500",
    free: false,
  },
  {
    type: "Chat",
    name: "DeepSeek R1 Distill Llama 70B Free",
    description: "Free endpoint to experience powerful reasoning model, this distilled version retains excellent reasoning capabilities.",
    icon: "🐋",
    iconColor: "text-blue-500",
    free: true,
  },
  {
    type: "Chat",
    name: "Llama 3.3 70B Instruct Turbo Free",
    description: "Open-source reasoning model, supports multi-language dialogue optimization, specifically tuned for dialogue fluency.",
    icon: "∞",
    iconColor: "text-blue-600",
    free: true,
  },
];

const InferenceSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              推論引擎 Inference Engine
            </h2>
            <Button asChild variant="default" size="sm">
              <Link to="/products/inference-engine">Learn More</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              GMI Cloud 推論引擎為開發者提供運行 AI 模型所需的超高速度與彈性擴展性，專為極低延遲、高併發處理以及頂尖效能優化設計。無論是深度學習、自然語言處理 (NLP) 還是計算機視覺 (CV)，皆能完美支援，實現更高的推論效率。
            </p>
            <p className="text-muted-foreground">
              透過 GMI Cloud 的全球 GPU 節點佈局，開發者能夠即時部署模型，隨時隨地擴展計算力，自動化調整運算負載，大幅降低成本並提升效能。依需求彈性伸縮，即刻應對高流量運算挑戰，交付更快、更穩定且更精準的 AI 預測。
            </p>
          </div>
        </div>

        {/* Models label */}
        <p className="text-sm text-muted-foreground mb-6">
          輕鬆運行 市場領先的 AI 模型
        </p>

        {/* Models grid */}
        <div className="grid md:grid-cols-3 gap-6">
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
                      免費
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
                  Learn More
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
