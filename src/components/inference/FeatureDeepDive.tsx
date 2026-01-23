import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import scalingCubes from "@/assets/inference/scaling-cubes.jpg";

// Donut Chart / Gauge Component
const MonitoringDashboard = ({ t }: { t: (key: string) => string }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-md mx-auto">
    <div className="text-sm font-medium text-foreground mb-6">{t("inferenceEngine.monitoring.totalInferences")}</div>
    
    {/* Donut Chart */}
    <div className="relative w-40 h-40 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset="62.8"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-primary">5</span>
        <span className="text-xs text-muted-foreground">{t("common.active")}</span>
      </div>
    </div>
    
    {/* Metrics */}
    <div className="space-y-3">
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-muted-foreground">{t("inferenceEngine.monitoring.avgLatency")}</span>
        <span className="text-sm font-medium">42ms</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-muted-foreground">{t("inferenceEngine.monitoring.throughput")}</span>
        <span className="text-sm font-medium">1.2K req/s</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-muted-foreground">{t("inferenceEngine.monitoring.uptime")}</span>
        <span className="text-sm font-medium text-green-600">99.99%</span>
      </div>
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-muted-foreground">{t("inferenceEngine.monitoring.costPerInference")}</span>
        <span className="text-sm font-medium">$0.002</span>
      </div>
    </div>
  </div>
);

const FeatureDeepDive = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Scaling Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {t("inferenceEngine.scaling.kicker")}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t("inferenceEngine.scaling.title")}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("inferenceEngine.scaling.description")}
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {t("inferenceEngine.scaling.dynamicScaling.title")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("inferenceEngine.scaling.dynamicScaling.description")}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {t("inferenceEngine.scaling.flexibility.title")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("inferenceEngine.scaling.flexibility.description")}
                  </p>
                </div>
              </div>
              
              <Button asChild>
                <Link to="/contact">{t("inferenceEngine.scaling.cta")}</Link>
              </Button>
            </div>
            
            {/* Right Visual - Scaling Cubes Image */}
            <div className="flex items-center justify-center">
              <img
                src={scalingCubes}
                alt="Effortless Scaling"
                className="w-full max-w-sm rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {t("inferenceEngine.monitoring.kicker")}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t("inferenceEngine.monitoring.title")}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("inferenceEngine.monitoring.description")}
              </p>
              
              <Button asChild>
                <Link to="/contact">{t("inferenceEngine.scaling.cta")}</Link>
              </Button>
            </div>
            
            {/* Right Visual - Dashboard */}
            <MonitoringDashboard t={t} />
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureDeepDive;
