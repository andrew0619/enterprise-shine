import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Server,
  Cpu,
  Zap,
  Cloud,
  ArrowRight,
  Check,
  Shield,
  Gauge,
  Network,
} from "lucide-react";

const products = [
  {
    id: "clusters",
    icon: Server,
    title: "GPU Clusters",
    description:
      "Enterprise-grade GPU clusters with NVIDIA H100 and A100 GPUs. Perfect for large-scale training and inference.",
    features: [
      "Up to 10,000 GPUs per cluster",
      "NVLink and InfiniBand connectivity",
      "99.9% uptime SLA",
      "24/7 support",
    ],
  },
  {
    id: "inference",
    icon: Zap,
    title: "Inference Engine",
    description:
      "Optimized inference infrastructure for production AI workloads. Deploy models in minutes, not weeks.",
    features: [
      "Auto-scaling based on demand",
      "Multi-region deployment",
      "Sub-100ms latency",
      "Cost-efficient spot instances",
    ],
  },
  {
    id: "workloads",
    icon: Cpu,
    title: "AI Workloads",
    description:
      "Pre-configured environments for popular ML frameworks. Get started immediately with optimized containers.",
    features: [
      "PyTorch, TensorFlow, JAX",
      "Jupyter notebooks included",
      "Git integration",
      "Custom container support",
    ],
  },
  {
    id: "private-cloud",
    icon: Cloud,
    title: "Private Cloud",
    description:
      "Dedicated infrastructure for maximum security and compliance. Your own isolated GPU environment.",
    features: [
      "Single-tenant isolation",
      "Custom networking",
      "On-premise or cloud",
      "HIPAA & SOC 2 ready",
    ],
  },
];

const highlights = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption",
  },
  {
    icon: Gauge,
    title: "Peak Performance",
    description: "Latest NVIDIA GPUs with optimized software stack",
  },
  {
    icon: Network,
    title: "Global Network",
    description: "12 regions worldwide with low-latency interconnects",
  },
];

const ProductsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Products Built for AI Scale
            </h1>
            <p className="text-lg text-muted-foreground">
              From development to production, our products power the world's most
              demanding AI workloads with enterprise-grade reliability.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {highlights.map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                className="border border-card-border hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <product.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{product.title}</h2>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild>
                    <Link to="/contact">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact our sales team to find the right solution for your needs.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
