import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cpu, Network, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

const GPUComputeSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Cpu,
      title: t("gpu.topTierGPUs"),
      description: t("gpu.topTierGPUsDesc"),
    },
    {
      icon: Network,
      title: t("gpu.infinibandNetworking"),
      description: t("gpu.infinibandNetworkingDesc"),
    },
    {
      icon: Lock,
      title: t("gpu.secureScalable"),
      description: t("gpu.secureScalableDesc"),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("home.gpuTitle")}</h2>
            <Button asChild variant="default" size="sm">
              <Link to="/gpu-compute">{t("common.learnMore")}</Link>
            </Button>
          </div>
          <div>
            <p className="text-muted-foreground">
              {t("home.gpuDescription")}
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
