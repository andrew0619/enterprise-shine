import { Cpu, Server, Cloud, Shield } from "lucide-react";
import GPUFeatureCard from "./GPUFeatureCard";
import HardwareSpecMockup from "./HardwareSpecMockup";

// Import generated images
import gpuChipImage from "@/assets/gpu/gpu-chip.jpg";
import dataCenterImage from "@/assets/gpu/data-center.jpg";
import networkTopologyImage from "@/assets/gpu/network-topology.jpg";

// GPU Chip Visual with real image
const GPUChipVisual = () => (
  <div className="relative h-48 rounded-xl overflow-hidden">
    <img 
      src={gpuChipImage} 
      alt="NVIDIA GPU chip on circuit board"
      className="w-full h-full object-cover"
    />
    {/* Subtle overlay for label contrast */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    {/* Label */}
    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
      NVIDIA H100
    </div>
  </div>
);

// Data Center Visual with real image
const DataCenterVisual = () => (
  <div className="relative h-48 rounded-xl overflow-hidden">
    <img 
      src={dataCenterImage} 
      alt="Enterprise data center server room"
      className="w-full h-full object-cover"
    />
    {/* Subtle overlay for label contrast */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    {/* Label */}
    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
      Enterprise Data Center
    </div>
  </div>
);

// Network Topology Visual with real image
const NetworkVisual = () => (
  <div className="relative h-48 rounded-xl overflow-hidden">
    <img 
      src={networkTopologyImage} 
      alt="InfiniBand network topology visualization"
      className="w-full h-full object-cover"
    />
    {/* Subtle overlay for label contrast */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    {/* Label */}
    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
      InfiniBand Network
    </div>
  </div>
);

const features = [
  {
    icon: Cpu,
    title: "彈性 On-Demand GPU",
    description: "Flexible GPU provisioning on demand. Scale from single GPU instances to thousands of nodes in minutes.",
    visual: <GPUChipVisual />,
  },
  {
    icon: Server,
    title: "頂級硬體規格",
    description: "Premium hardware configurations with the latest NVIDIA GPUs, optimized for AI training and inference.",
    visual: <HardwareSpecMockup />,
  },
  {
    icon: Cloud,
    title: "企業專屬私有雲",
    description: "Dedicated infrastructure for your organization with complete isolation and custom networking options.",
    visual: <DataCenterVisual />,
  },
  {
    icon: Shield,
    title: "安全網路架構",
    description: "Enterprise-grade security with InfiniBand connectivity, encryption at rest and in transit.",
    visual: <NetworkVisual />,
  },
];

const GPUFeatureGrid = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <GPUFeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GPUFeatureGrid;
