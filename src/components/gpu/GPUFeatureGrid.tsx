import { Cpu, Eye, Cloud, Shield } from "lucide-react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

// Import generated images
import gpuBoardImage from "@/assets/gpu/gpu-board-product.jpg";
import privateCloudImage from "@/assets/gpu/private-cloud.jpg";
import secureNetworkImage from "@/assets/gpu/secure-network.jpg";

// Hardware Spec Selector Mockup
const HardwareSpecMockup = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
      <p className="text-sm font-medium text-heading mb-3">{t("gpuPage.features.selectHardware")}</p>
      <div className="bg-muted/50 rounded-lg px-3 py-2 mb-4">
        <p className="text-sm font-medium text-heading">8x NVIDIA-H100-80GB-HBM3</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("gpuPage.features.numGpus")}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">8</span>
            <Check className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("gpuPage.features.numCpus")}</p>
          <span className="text-sm font-medium">200</span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("gpuPage.features.ram")}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">2000</span>
            <Check className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">GB</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("gpuPage.features.ephemeralStorage")}</p>
          <span className="text-sm font-medium">30</span>
        </div>
      </div>
    </div>
  );
};

const GPUFeatureGrid = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Cpu,
      titleKey: "gpuPage.features.onDemand.title",
      descriptionKey: "gpuPage.features.onDemand.description",
      visual: (
        <div className="bg-[#E0F4FF] rounded-xl p-4 mt-4">
          <img 
            src={gpuBoardImage} 
            alt="NVIDIA GPU board"
            className="w-full h-48 object-contain"
          />
        </div>
      ),
    },
    {
      icon: Eye,
      titleKey: "gpuPage.features.hardware.title",
      descriptionKey: "gpuPage.features.hardware.description",
      visual: <HardwareSpecMockup />,
    },
    {
      icon: Cloud,
      titleKey: "gpuPage.features.privateCloud.title",
      descriptionKey: "gpuPage.features.privateCloud.description",
      visual: (
        <div className="mt-4">
          <img 
            src={privateCloudImage} 
            alt="Enterprise private cloud infrastructure"
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      ),
    },
    {
      icon: Shield,
      titleKey: "gpuPage.features.security.title",
      descriptionKey: "gpuPage.features.security.description",
      visual: (
        <div className="mt-4">
          <img 
            src={secureNetworkImage} 
            alt="Secure network architecture"
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card border border-card-border rounded-2xl p-4 sm:p-6 lg:p-8"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-heading mb-3">
                {t(feature.titleKey)}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
              
              {/* Visual */}
              {feature.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GPUFeatureGrid;
