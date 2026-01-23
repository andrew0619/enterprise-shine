import { ExternalLink } from "lucide-react";

const features = [
  {
    title: "Optimized GPU Performance for AI Training & Inference",
    description: "The HGX B200 delivers unprecedented compute density with 8 Blackwell GPUs connected via 5th-generation NVLink, providing 1.8TB/s of GPU-to-GPU bandwidth for seamless parallel processing."
  },
  {
    title: "Highly-Scaled Architecture for Demanding AI Workloads",
    description: "Purpose-built for multi-trillion parameter models and enterprise AI deployments. The unified memory architecture enables efficient handling of the largest foundation models."
  },
  {
    title: "Seamless AI Scalability",
    description: "Connect multiple HGX B200 systems for rack-scale AI supercomputing. NVLink Switch enables linear scaling across thousands of GPUs for the most demanding training workloads."
  }
];

const HGXB200FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-20">
      <div className="container">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Next-Generation AI Compute
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            The NVIDIA HGX B200 platform represents the pinnacle of AI infrastructure, combining 8 Blackwell architecture GPUs with advanced NVLink interconnect technology. Designed for organizations pushing the boundaries of artificial intelligence, from training frontier models to deploying real-time inference at scale.
          </p>
          
          <ul className="space-y-6 mb-10">
            {features.map((feature, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-primary mt-1.5">•</span>
                <div>
                  <span className="font-semibold text-slate-900">
                    {feature.title}:
                  </span>{" "}
                  <span className="text-slate-600">
                    {feature.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          
          <a
            href="https://www.nvidia.com/en-us/data-center/hgx/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View NVIDIA HGX B200 Platform Datasheet
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HGXB200FeaturesSection;
