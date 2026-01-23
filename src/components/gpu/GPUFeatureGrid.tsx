import { Cpu, Eye, Cloud, Shield } from "lucide-react";
import { Check } from "lucide-react";

// Import generated images
import gpuBoardImage from "@/assets/gpu/gpu-board-product.jpg";
import privateCloudImage from "@/assets/gpu/private-cloud.jpg";
import secureNetworkImage from "@/assets/gpu/secure-network.jpg";

// Hardware Spec Selector Mockup
const HardwareSpecMockup = () => (
  <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
    <p className="text-sm font-medium text-heading mb-3">Select hardware resources</p>
    <div className="bg-muted/50 rounded-lg px-3 py-2 mb-4">
      <p className="text-sm font-medium text-heading">8x NVIDIA-H100-80GB-HBM3</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Number of GPUs</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">8</span>
          <Check className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Number of CPUs</p>
        <span className="text-sm font-medium">200</span>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">RAM</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">2000</span>
          <Check className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">GB</span>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Ephemeral Storage</p>
        <span className="text-sm font-medium">30</span>
      </div>
    </div>
  </div>
);

const features = [
  {
    icon: Cpu,
    title: "彈性 On-Demand GPU 服務",
    description: "即時使用 NVIDIA GPU 算力，快速部署您的運算需求。我們的可擴展平台讓您依需求自由調整資源配置，完美支援 AI 與機器學習任務。價格實惠且無長期合約限制，讓您享有最大的使用彈性，無需預付成本。",
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
    title: "頂尖硬體規格",
    description: "配備 3.2 Tbps InfiniBand 網路，為分散式訓練提供極速連線；搭載 NVIDIA H100 GPU的先進訓練叢集，釋放極致運算力。簡單的 SSH 連線、資料集下載，立即開始您的AI之旅。",
    visual: <HardwareSpecMockup />,
  },
  {
    icon: Cloud,
    title: "企業專屬私有雲",
    description: "GMI Cloud 提供專屬於企業的雲端環境，確保端到端的安全與資料隔離。可客製化的環境配置滿足企業獨特的IT 策略。您可以依自己的方式建置、同時擁有完整的控制與彈性，在雲端與本地環境之間無縫切換。",
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
    title: "安全網路架構",
    description: "我們以高 InfiniBand 網路效能為基礎打造穩定、高效的跨區域無縫連接網路，使應用程式或應用可乘載最佳承載，透過嚴格限制了網絡閒間的存取維護安全性。",
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

const GPUFeatureGrid = () => {
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
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
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
