import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Network, Lock } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "GPU Scheduling",
    description:
      "Intelligent workload distribution across your GPU fleet with automatic load balancing and priority queuing for maximum efficiency.",
  },
  {
    icon: Network,
    title: "InfiniBand Networking",
    description:
      "Ultra-low latency interconnects with 400Gb/s bandwidth for distributed training and real-time inference at scale.",
  },
  {
    icon: Lock,
    title: "Secure & Compliant",
    description:
      "Enterprise-grade security with SOC 2 Type II, HIPAA, and GDPR compliance. Your data stays private and protected.",
  },
];

const GPUComputeSection = () => {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GPU Compute Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built infrastructure for AI workloads with industry-leading
            performance and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border border-card-border hover:border-primary/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GPUComputeSection;
