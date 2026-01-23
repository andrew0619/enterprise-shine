import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import inferenceCube from "@/assets/home/inference-cube.jpg";

const features = [
  {
    icon: Brain,
    brand: "NVIDIA AI",
    title: "Enterprise AI Platform",
    description:
      "Deploy and scale AI models with NVIDIA's enterprise-grade infrastructure and optimized frameworks.",
    link: "/products#nvidia",
  },
  {
    icon: Layers,
    brand: "Meta Llama",
    title: "Open Source Models",
    description:
      "Access the latest open-source LLMs including Llama 3.1, fine-tuned for your specific use cases.",
    link: "/products#llama",
  },
  {
    icon: Sparkles,
    brand: "Custom Models",
    title: "Bring Your Own Model",
    description:
      "Deploy your proprietary models on our optimized infrastructure with full security and compliance.",
    link: "/products#custom",
  },
];

const InferenceSection = () => {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container">
        {/* Header with cube visual */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Inference Engine
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Most Trusted AI Models
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Access industry-leading AI models optimized for inference at scale.
              From foundation models to custom deployments, power your AI applications with unmatched performance.
            </p>
            <Button asChild variant="outline">
              <Link to="/products/inference-engine">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <img
              src={inferenceCube}
              alt="Inference Engine"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>

        {/* Feature label */}
        <p className="text-sm text-muted-foreground mb-8">
          The most trusted AI models
        </p>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {feature.brand}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {feature.description}
                </p>

                <Link
                  to={feature.link}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline group"
                >
                  Learn more
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
