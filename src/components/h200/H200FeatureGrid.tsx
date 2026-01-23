import { MemoryStick, Gauge, Cpu } from "lucide-react";

const features = [
  {
    icon: MemoryStick,
    title: "Higher Memory Capacity",
    description:
      "The H200 features 141GB of HBM3e memory, nearly double the capacity of the H100, enabling the processing of larger models and datasets without memory constraints.",
  },
  {
    icon: Gauge,
    title: "Increased Memory Bandwidth",
    description:
      "With 4.8 TB/s of memory bandwidth, the H200 offers 1.4x more bandwidth than the H100, significantly speeding up data transfer and processing tasks.",
  },
  {
    icon: Cpu,
    title: "Enhanced AI Performance",
    description:
      "The H200 is optimized for generative AI and large language models, delivering up to 1.9x faster inference performance for models like Llama 2 70B.",
  },
];

const H200FeatureGrid = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-secondary/50 rounded-xl p-6 hover:bg-secondary/70 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default H200FeatureGrid;
