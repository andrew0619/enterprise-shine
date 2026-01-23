import { useTranslation } from "react-i18next";

const integrations = {
  left: [
    { name: "Jupyter", icon: "📓" },
    { name: "Ray", icon: "☀️" },
    { name: "PyTorch", icon: "🔥" },
    { name: "TensorFlow", icon: "📊" },
    { name: "Hugging Face", icon: "🤗" },
    { name: "vLLM", icon: "⚡" },
  ],
  right: [
    { name: "Kubernetes", icon: "⎈" },
    { name: "Docker", icon: "🐳" },
    { name: "Terraform", icon: "🏗️" },
    { name: "Prometheus", icon: "📈" },
    { name: "Grafana", icon: "📉" },
    { name: "Helm", icon: "⚓" },
  ],
};

const IntegrationEcosystem = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("clusterEngine.integrationTitle")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("clusterEngine.integrationSubtitle")}
          </p>
        </div>

        {/* Integration Diagram */}
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left: ML/AI Tools */}
            <div className="grid grid-cols-3 gap-4">
              {integrations.left.map((tool, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="text-xs text-muted-foreground font-medium text-center">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Center: NexusAI Hub */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Connection lines - left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-16 h-px bg-gradient-to-l from-primary to-transparent hidden md:block" />
                {/* Connection lines - right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-16 h-px bg-gradient-to-r from-primary to-transparent hidden md:block" />
                
                {/* Center logo */}
                <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <span className="text-primary-foreground font-bold text-3xl">N</span>
                </div>
                <p className="text-center mt-4 font-semibold text-foreground">NexusAI Cloud</p>
              </div>
            </div>

            {/* Right: Infrastructure Tools */}
            <div className="grid grid-cols-3 gap-4">
              {integrations.right.map((tool, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="text-xs text-muted-foreground font-medium text-center">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationEcosystem;
