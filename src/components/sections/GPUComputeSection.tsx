import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Network, Lock } from "lucide-react";
import datacenter from "@/assets/home/datacenter.jpg";

const features = [
  {
    icon: Cpu,
    title: "GPU Scheduling",
    description:
      "Intelligent workload distribution across your GPU fleet with automatic load balancing and priority queuing.",
  },
  {
    icon: Network,
    title: "InfiniBand Networking",
    description:
      "Ultra-low latency interconnects with 400Gb/s bandwidth for distributed training and real-time inference.",
  },
  {
    icon: Lock,
    title: "Secure & Compliant",
    description:
      "Enterprise-grade security with SOC 2 Type II, HIPAA, and GDPR compliance. Your data stays protected.",
  },
];

const GPUComputeSection = () => {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              GPU Cloud
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GPU Compute Infrastructure
            </h2>
            <p className="text-lg text-muted-foreground">
              Purpose-built infrastructure for AI workloads with industry-leading
              performance and reliability. Scale from a single GPU to thousands.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={datacenter}
              alt="GPU Datacenter"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border border-border hover:border-primary/30 transition-all duration-300"
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
