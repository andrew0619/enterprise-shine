import { Server, Settings, Users } from "lucide-react";

const partnerTypes = [
  {
    icon: Server,
    title: "GPU Service Providers",
    description:
      "Resell, manage, or integrate NexusAI's GPU infrastructure solutions for your clients.",
  },
  {
    icon: Settings,
    title: "GPU Systems Integrators (SIs)",
    description:
      "Help your clients build GPU-optimized AI/ML solutions with our infrastructure services.",
  },
  {
    icon: Users,
    title: "GPU Influencers",
    description:
      "As AI Founders or experts, you've seen GPU scarcity firsthand. Join us to provide the cloud infrastructure your community needs.",
  },
];

const DiversePartnersSection = () => {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Diverse Partners, Tailored Success
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Visual - Network Diagram */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            {/* Dark container */}
            <div className="absolute inset-0 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              {/* Network nodes */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central hub */}
                <div className="relative">
                  {/* Center logo circle */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <div className="text-white font-bold text-2xl">N</div>
                  </div>

                  {/* Orbiting nodes */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-zinc-600"
                      style={{
                        top: `${50 + Math.sin((angle * Math.PI) / 180) * 80}%`,
                        left: `${50 + Math.cos((angle * Math.PI) / 180) * 80}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}

                  {/* Connection lines (simulated with borders) */}
                  <div className="absolute inset-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border border-zinc-700/50 rounded-full" />
                  <div className="absolute inset-0 w-56 h-56 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border border-zinc-800/30 rounded-full" />
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent rounded-2xl" />
            </div>
          </div>

          {/* Right Content - Partner Types */}
          <div className="space-y-8">
            {partnerTypes.map((type, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <type.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {type.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiversePartnersSection;
