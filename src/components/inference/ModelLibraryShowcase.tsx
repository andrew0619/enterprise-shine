import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const models = [
  {
    name: "Llama 2",
    provider: "Meta",
    logoColor: "from-blue-500 to-blue-600",
    logoIcon: "∞",
    description: "Open-source large language model for text generation and chat",
  },
  {
    name: "Stable Diffusion",
    provider: "Stability AI",
    logoColor: "from-purple-500 to-pink-500",
    logoIcon: "◆",
    description: "State-of-the-art image generation model",
  },
  {
    name: "MPT-7B",
    provider: "MosaicML",
    logoColor: "from-orange-500 to-red-500",
    logoIcon: "M",
    description: "Efficient transformer model for commercial use",
  },
];

const ModelLibraryShowcase = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Pre-Built AI Models for Fast Inference
            </h2>
            <p className="text-muted-foreground mt-2">
              Choose from our curated library of pre-optimized models or bring your own
            </p>
          </div>
          <Button asChild className="w-fit">
            <Link to="/products/model-library">
              See Model List
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Model Cards Container */}
        <div className="bg-slate-100 rounded-2xl p-6 md:p-8">
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Inference</p>
          
          {/* Model Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Logo */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.logoColor} flex items-center justify-center mb-4`}>
                  <span className="text-white font-bold text-lg">{model.logoIcon}</span>
                </div>
                
                {/* Provider */}
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {model.provider}
                </p>
                
                {/* Model Name */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {model.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Additional info */}
          <div className="mt-6 text-right">
            <p className="text-sm text-muted-foreground">
              View all models in our library →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelLibraryShowcase;
