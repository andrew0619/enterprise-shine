import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import server images
import serverStackImg from "@/assets/cluster/server-stack.jpg";
import serverClusterImg from "@/assets/cluster/server-cluster.jpg";
import serverRackImg from "@/assets/cluster/server-rack.jpg";

// Server Stack Visual with real image
const ServerStackVisual = () => (
  <div className="rounded-2xl overflow-hidden h-full min-h-[280px]">
    <img 
      src={serverStackImg} 
      alt="Server stack visualization"
      className="w-full h-full object-cover"
    />
  </div>
);

// Monitoring Dashboard UI Mockup
const MonitoringDashboard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
    <div className="text-sm font-medium text-foreground mb-4">Instance Status</div>
    <div className="space-y-3">
      {[
        { name: "gpu-node-01", status: "running", progress: 87 },
        { name: "gpu-node-02", status: "running", progress: 92 },
        { name: "gpu-node-03", status: "running", progress: 78 },
        { name: "gpu-node-04", status: "idle", progress: 12 },
        { name: "gpu-node-05", status: "running", progress: 95 },
      ].map((instance, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${
              instance.status === "running" ? "bg-green-500" : "bg-slate-300"
            }`}
          />
          <span className="text-xs font-mono text-muted-foreground flex-1">
            {instance.name}
          </span>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${instance.progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-8">{instance.progress}%</span>
        </div>
      ))}
    </div>
  </div>
);

// Server Cluster Visual with real image
const ServerClusterVisual = () => (
  <div className="rounded-2xl overflow-hidden h-full min-h-[280px]">
    <img 
      src={serverClusterImg} 
      alt="Server cluster visualization"
      className="w-full h-full object-cover"
    />
  </div>
);

// Resource Table UI Mockup
const ResourceTable = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 h-full overflow-hidden">
    <div className="text-sm font-medium text-foreground mb-4">Resource Management</div>
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-muted-foreground font-medium">Node</th>
            <th className="text-left py-2 text-muted-foreground font-medium">GPU</th>
            <th className="text-left py-2 text-muted-foreground font-medium">Memory</th>
            <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { node: "node-a1", gpu: "H100", memory: "80GB", status: "Active" },
            { node: "node-a2", gpu: "H100", memory: "80GB", status: "Active" },
            { node: "node-b1", gpu: "A100", memory: "40GB", status: "Idle" },
            { node: "node-c1", gpu: "H200", memory: "141GB", status: "Active" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-slate-50">
              <td className="py-2 font-mono">{row.node}</td>
              <td className="py-2">{row.gpu}</td>
              <td className="py-2">{row.memory}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    row.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Server Rack Visual with real image
const ServerRackVisual = () => (
  <div className="rounded-2xl overflow-hidden h-full min-h-[280px]">
    <img 
      src={serverRackImg} 
      alt="Server rack infrastructure"
      className="w-full h-full object-cover"
    />
  </div>
);

const FeatureZigZag = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t("clusterEngine.features.scaling.title"),
      description: t("clusterEngine.features.scaling.description"),
      subtitle: t("clusterEngine.features.scaling.subtitle", { defaultValue: "Auto-scaling" }),
      bulletPoints: [
        t("clusterEngine.features.scaling.bullet1", { defaultValue: "Dynamic resource allocation" }),
        t("clusterEngine.features.scaling.bullet2", { defaultValue: "Cost-optimized scaling policies" }),
      ],
      visual: ServerStackVisual,
      imageFirst: false,
      showButton: true,
    },
    {
      title: t("clusterEngine.features.monitoring.title"),
      description: t("clusterEngine.features.monitoring.description"),
      subtitle: t("clusterEngine.features.monitoring.subtitle", { defaultValue: "Observability" }),
      bulletPoints: [
        t("clusterEngine.features.monitoring.bullet1", { defaultValue: "Live metrics dashboard" }),
        t("clusterEngine.features.monitoring.bullet2", { defaultValue: "Alerting and notifications" }),
      ],
      visual: MonitoringDashboard,
      imageFirst: true,
      showButton: true,
    },
    {
      title: t("clusterEngine.features.analytics.title"),
      description: t("clusterEngine.features.analytics.description"),
      subtitle: t("clusterEngine.features.analytics.subtitle", { defaultValue: "Unified Analytics" }),
      bulletPoints: [
        t("clusterEngine.features.analytics.bullet1", { defaultValue: "Cost breakdown reports" }),
        t("clusterEngine.features.analytics.bullet2", { defaultValue: "Usage trend analysis" }),
      ],
      visual: ServerClusterVisual,
      imageFirst: false,
      showButton: true,
    },
    {
      title: t("clusterEngine.features.resources.title"),
      description: t("clusterEngine.features.resources.description"),
      subtitle: t("clusterEngine.features.resources.subtitle", { defaultValue: "Smart Allocation" }),
      bulletPoints: [
        t("clusterEngine.features.resources.bullet1", { defaultValue: "Priority-based scheduling" }),
        t("clusterEngine.features.resources.bullet2", { defaultValue: "Multi-tenant isolation" }),
      ],
      visual: ResourceTable,
      imageFirst: true,
      showButton: true,
    },
    {
      title: t("clusterEngine.features.security.title"),
      description: t("clusterEngine.features.security.description"),
      subtitle: t("clusterEngine.features.security.subtitle", { defaultValue: "Zero Trust Security" }),
      bulletPoints: [
        t("clusterEngine.features.security.bullet1", { defaultValue: "SOC 2 Type II certified" }),
        t("clusterEngine.features.security.bullet2", { defaultValue: "End-to-end encryption" }),
      ],
      visual: ServerRackVisual,
      imageFirst: false,
      showButton: true,
    },
  ];

  return (
    <section className="bg-background">
      {features.map((feature, index) => (
        <div key={index} className="py-16 md:py-24">
          <div className="container">
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                feature.imageFirst ? "" : "lg:grid-flow-dense"
              }`}
            >
              {/* Text */}
              <div className={feature.imageFirst ? "lg:order-2" : ""}>
                <p className="text-sm text-primary font-medium mb-2">{feature.subtitle}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                {feature.bulletPoints && (
                  <ul className="space-y-2 mb-6">
                    {feature.bulletPoints.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {feature.showButton && (
                  <Button asChild variant="outline" size="sm">
                    <Link to="/contact">{t("common.learnMore")}</Link>
                  </Button>
                )}
              </div>

              {/* Visual */}
              <div className={feature.imageFirst ? "lg:order-1" : ""}>
                <feature.visual />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureZigZag;
