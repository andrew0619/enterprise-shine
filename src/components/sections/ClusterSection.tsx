import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const dashboardData = [
  { id: "gpu-001", name: "NVIDIA H100", status: "active", utilization: "94%" },
  { id: "gpu-002", name: "NVIDIA H100", status: "active", utilization: "87%" },
  { id: "gpu-003", name: "NVIDIA A100", status: "active", utilization: "92%" },
  { id: "gpu-004", name: "NVIDIA A100", status: "idle", utilization: "12%" },
  { id: "gpu-005", name: "NVIDIA H100", status: "active", utilization: "78%" },
];

const ClusterSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        {/* First Row - Cluster Engine Overview */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("home.clusterTitle")}</h2>
            <Button asChild variant="default" size="sm">
              <Link to="/products/cluster-engine">{t("common.learnMore")}</Link>
            </Button>
          </div>
          <div>
            <p className="text-muted-foreground">
              {t("home.clusterDescription")}
            </p>
          </div>
        </div>

        {/* Centralized Management */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">{t("cluster.centralizedManagement")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("cluster.centralizedManagementDesc")}
            </p>
          </div>
          <div className="bg-card rounded-xl shadow-lg overflow-hidden border">
            {/* Dashboard Header */}
            <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-4 text-xs text-muted-foreground">GPU Fleet Dashboard</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="min-w-[400px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">{t("cluster.activeGPUs")}</span>
                  <span className="text-xs text-muted-foreground">{t("cluster.lastUpdated")}</span>
                </div>
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
                    {dashboardData.map((row) => (
                      <tr key={row.id} className="border-b last:border-0">
                        <td className="py-2 font-mono text-xs">{row.id}</td>
                        <td className="py-2">{row.name}</td>
                        <td className="py-2">
                          <span className={`inline-flex items-center gap-1 text-xs ${row.status === "active" ? "text-green-600" : "text-muted-foreground"}`}>
                            <Check className="h-3 w-3" />
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2 font-medium">{row.utilization}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Dashboard */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <div className="bg-card rounded-xl shadow-lg overflow-hidden border p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">GPU Utilization Overview</span>
                <span className="text-xs text-muted-foreground">Real-time</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">87%</div>
                  <div className="text-xs text-muted-foreground">{t("cluster.avgGPUUsage")}</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-xs text-muted-foreground">{t("cluster.activeNodes")}</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">1.2TB</div>
                  <div className="text-xs text-muted-foreground">{t("cluster.memoryUsed")}</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-amber-600">99.9%</div>
                  <div className="text-xs text-muted-foreground">{t("cluster.uptime")}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">{t("cluster.realtimeDashboard")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("cluster.realtimeDashboardDesc")}
            </p>
          </div>
        </div>

        {/* Access Management */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("cluster.accessManagement")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("cluster.accessManagementDesc")}
            </p>
          </div>
          <div className="bg-card rounded-xl shadow-lg overflow-hidden border p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">{t("cluster.teamMembers")}</span>
              <Button variant="outline" size="sm">{t("cluster.invite")}</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "John Chen", role: "Admin", avatar: "JC" },
                { name: "Sarah Lin", role: "Developer", avatar: "SL" },
                { name: "Mike Wang", role: "Viewer", avatar: "MW" },
              ].map((member) => (
                <div key={member.name} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {member.avatar}
                    </div>
                    <span className="text-sm font-medium">{member.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClusterSection;
