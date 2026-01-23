import { Check, Server, Activity, Shield, Gauge } from "lucide-react";

const features = [
  {
    icon: Server,
    title: "Unified Management",
    description: "Manage your entire GPU fleet from a single dashboard",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Track utilization, performance, and health metrics instantly",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption",
  },
  {
    icon: Gauge,
    title: "Auto-scaling",
    description: "Automatically scale resources based on demand",
  },
];

const mockData = [
  { id: "gpu-001", name: "NVIDIA H100", status: "active", utilization: "94%" },
  { id: "gpu-002", name: "NVIDIA H100", status: "active", utilization: "87%" },
  { id: "gpu-003", name: "NVIDIA A100", status: "active", utilization: "92%" },
  { id: "gpu-004", name: "NVIDIA A100", status: "idle", utilization: "12%" },
  { id: "gpu-005", name: "NVIDIA H100", status: "active", utilization: "78%" },
];

const ClusterSection = () => {
  return (
    <section className="py-20 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cluster Engine
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Orchestrate thousands of GPUs with our intelligent cluster
              management platform. Built for scale, designed for simplicity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Dashboard Mockup */}
          <div className="relative">
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <div className="bg-card rounded-xl shadow-lg overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-primary/5 px-4 py-3 border-b">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-xs text-muted-foreground">
                      GPU Fleet Dashboard
                    </span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Active GPUs</span>
                    <span className="text-xs text-muted-foreground">
                      Last updated: Just now
                    </span>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-muted-foreground">
                          <th className="text-left py-2 font-medium">ID</th>
                          <th className="text-left py-2 font-medium">Model</th>
                          <th className="text-left py-2 font-medium">Status</th>
                          <th className="text-left py-2 font-medium">Usage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockData.map((row) => (
                          <tr key={row.id} className="border-b last:border-0">
                            <td className="py-2 font-mono text-xs">{row.id}</td>
                            <td className="py-2">{row.name}</td>
                            <td className="py-2">
                              <span
                                className={`inline-flex items-center gap-1 text-xs ${
                                  row.status === "active"
                                    ? "text-green-600"
                                    : "text-muted-foreground"
                                }`}
                              >
                                <Check className="h-3 w-3" />
                                {row.status}
                              </span>
                            </td>
                            <td className="py-2 font-medium">
                              {row.utilization}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClusterSection;
