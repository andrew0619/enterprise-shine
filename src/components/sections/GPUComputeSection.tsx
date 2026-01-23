import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cpu, Network, Lock } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Top Tier GPUs",
    description: "Access the latest NVIDIA H100 and A100 GPUs with guaranteed availability and competitive pricing.",
  },
  {
    icon: Network,
    title: "InfiniBand Networking",
    description: "Ultra-low latency interconnects with 400Gb/s bandwidth for distributed training and real-time inference.",
  },
  {
    icon: Lock,
    title: "Secure and Scalable",
    description: "Enterprise-grade security with SOC 2 Type II, HIPAA, and GDPR compliance. Scale from 1 to 1000+ GPUs.",
  },
];

const GPUComputeSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">GPUs</h2>
            <Button asChild variant="default" size="sm">
              <Link to="/gpu-compute">Learn More</Link>
            </Button>
          </div>
          <div>
            <p className="text-muted-foreground">
              GMI Cloud offers a diverse portfolio of NVIDIA GPUs, designed for AI/ML training, inference, and data analytics. Our GPU infrastructure is purpose-built for the most demanding AI workloads with ultra-low latency, high memory bandwidth, and enterprise-grade reliability.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border border-border hover:border-primary/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GPUComputeSection;
