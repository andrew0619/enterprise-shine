import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Unmatched AI Performance",
    description: "Combines Grace CPUs with Blackwell GPUs for unprecedented compute density and efficiency, delivering breakthrough performance for AI training and inference."
  },
  {
    title: "Next-Level Data Processing for Enterprise AI",
    description: "Handles multi-trillion parameter models with ease, enabling organizations to tackle the most complex AI challenges without infrastructure limitations."
  },
  {
    title: "Next-Level Scalability for LLM and AI Workloads",
    description: "Scale from single node to thousands with NVLink interconnect, providing seamless expansion as your AI requirements grow."
  },
  {
    title: "Energy-Efficient Architecture",
    description: "Optimized power consumption per FLOP means lower operational costs while maintaining peak performance for sustainable AI infrastructure."
  }
];

const GB200FeaturesSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Empowering AI Innovation
          </h2>
          
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            The NVIDIA GB200 NVL72 represents a quantum leap in AI computing, bringing together the most advanced GPU architecture with purpose-built infrastructure for enterprise-scale deployments.
          </p>
          
          <ul className="space-y-6 mb-10">
            {features.map((feature, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
                <div>
                  <span className="font-semibold text-slate-900">{feature.title}:</span>{" "}
                  <span className="text-slate-600">{feature.description}</span>
                </div>
              </li>
            ))}
          </ul>
          
          <Button 
            asChild 
            size="lg" 
            className="bg-slate-900 text-white hover:bg-slate-800 px-8"
          >
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GB200FeaturesSection;
