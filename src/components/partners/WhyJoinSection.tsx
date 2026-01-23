import { Zap, Megaphone, HeadphonesIcon } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Exclusive Access",
    description:
      "Get priority access to new GPU infrastructure, beta features, and dedicated support channels.",
  },
  {
    icon: Megaphone,
    title: "Co-Marketing",
    description:
      "Amplify your brand through joint marketing campaigns, case studies, and partner spotlights.",
  },
  {
    icon: HeadphonesIcon,
    title: "Technical Support",
    description:
      "Receive dedicated technical resources, training materials, and priority engineering support.",
  },
];

const WhyJoinSection = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
          Why Join the NexusAI Partner Program?
        </h2>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
