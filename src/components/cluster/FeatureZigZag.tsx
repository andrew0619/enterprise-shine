import { Shield, Lock } from "lucide-react";

// UI Mockup Components
const ServerStackVisual = () => (
  <div className="bg-slate-100 rounded-2xl p-8 h-full flex items-center justify-center">
    <div className="relative w-48 h-48">
      {/* Stacked server blocks with sketch effect */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-10 bg-gradient-to-r from-slate-800 to-slate-700 rounded"
          style={{
            bottom: `${i * 28}px`,
            transform: `translateX(${i * 4}px)`,
            opacity: 1 - i * 0.15,
          }}
        >
          {/* LED indicators */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </div>
        </div>
      ))}
      {/* Sketch texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
    </div>
  </div>
);

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

const AnalyticsDashboard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
    <div className="text-sm font-medium text-foreground mb-4">Usage Analytics</div>
    <div className="grid grid-cols-2 gap-4">
      {/* Line chart mockup */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="text-xs text-muted-foreground mb-2">GPU Utilization</div>
        <svg className="w-full h-16" viewBox="0 0 100 40">
          <polyline
            points="0,35 15,28 30,32 45,18 60,22 75,12 90,8 100,15"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polyline
            points="0,35 15,28 30,32 45,18 60,22 75,12 90,8 100,15"
            fill="url(#gradient)"
            stroke="none"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Bar chart mockup */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="text-xs text-muted-foreground mb-2">Compute Hours</div>
        <div className="flex items-end gap-1 h-16">
          {[60, 80, 45, 90, 70, 85, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/70 rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

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

const SecurityVisual = () => (
  <div className="bg-slate-100 rounded-2xl p-8 h-full flex items-center justify-center">
    <div className="relative">
      <div className="w-32 h-40 bg-gradient-to-b from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
        <Shield className="w-16 h-16 text-primary" />
        <Lock className="w-6 h-6 text-primary absolute" />
      </div>
    </div>
  </div>
);

const features = [
  {
    title: "Efficient Scaling",
    description:
      "Automatically scale your GPU clusters up or down based on workload demands. Our intelligent orchestration ensures optimal resource utilization.",
    visual: ServerStackVisual,
    imageFirst: false,
  },
  {
    title: "Real-time Monitoring",
    description:
      "Monitor every aspect of your cluster with comprehensive dashboards. Track instance health, resource usage, and job progress in real-time.",
    visual: MonitoringDashboard,
    imageFirst: true,
  },
  {
    title: "Usage Analytics",
    description:
      "Gain deep insights into your compute usage patterns. Visualize trends, optimize costs, and make data-driven infrastructure decisions.",
    visual: AnalyticsDashboard,
    imageFirst: false,
  },
  {
    title: "Resource Management",
    description:
      "Fine-grained control over every GPU, node, and container. Allocate resources precisely where they're needed with our intuitive management interface.",
    visual: ResourceTable,
    imageFirst: true,
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade security for your AI workloads. Role-based access control, encryption at rest and in transit, and comprehensive audit logging.",
    visual: SecurityVisual,
    imageFirst: false,
  },
];

const FeatureZigZag = () => {
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
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
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
