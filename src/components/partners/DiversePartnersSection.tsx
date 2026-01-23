import { Server, Settings, Users } from "lucide-react";
import diverseNetwork from "@/assets/partners/diverse-network.jpg";

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
          {/* Left Visual - Network Image */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img
                src={diverseNetwork}
                alt="Partner network visualization"
                className="w-full h-full object-cover"
              />
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
