import { Cpu, Server, Cloud, Shield } from "lucide-react";
import GPUFeatureCard from "./GPUFeatureCard";
import HardwareSpecMockup from "./HardwareSpecMockup";

// GPU Chip Visual Placeholder
const GPUChipVisual = () => (
  <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    {/* GPU chip pattern */}
    <div className="absolute inset-0 opacity-80">
      <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-1">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm bg-gradient-to-br from-amber-500/60 via-orange-500/40 to-red-500/30"
            style={{
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
    </div>
    {/* Center chip */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 shadow-lg shadow-orange-500/30" />
    </div>
    {/* Label */}
    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium">
      NVIDIA H100
    </div>
  </div>
);

// Data Center Visual Placeholder
const DataCenterVisual = () => (
  <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900">
    {/* Server racks */}
    <div className="absolute inset-0 flex items-end justify-center gap-2 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-700/80 to-blue-500/40"
          style={{ height: `${60 + Math.random() * 30}%` }}
        >
          {/* Server lights */}
          <div className="flex flex-col gap-1 p-1">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: `${j * 0.3}s` }} />
                <div className="w-1 h-1 rounded-full bg-green-400" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/5 to-transparent" />
    {/* Label */}
    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium">
      Enterprise Data Center
    </div>
  </div>
);

// Network Topology Visual Placeholder
const NetworkVisual = () => (
  <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-900 via-teal-800 to-blue-900">
    {/* Isometric grid pattern */}
    <div className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `
          linear-gradient(30deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%),
          linear-gradient(150deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%),
          linear-gradient(30deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%),
          linear-gradient(150deg, rgba(255,255,255,0.1) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.1) 87.5%)
        `,
        backgroundSize: '40px 70px',
        backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px'
      }}
    />
    {/* Cube structures */}
    <div className="absolute inset-0 flex items-center justify-center gap-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/60 to-teal-600/40 border border-cyan-300/30 shadow-lg shadow-cyan-500/20"
          style={{ transform: `translateY(${(i % 2) * -10}px)` }}
        />
      ))}
    </div>
    {/* Connection lines */}
    <div className="absolute inset-0">
      <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
        <line x1="60" y1="50" x2="100" y2="40" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
        <line x1="100" y1="40" x2="140" y2="50" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
        <line x1="60" y1="50" x2="100" y2="60" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
        <line x1="100" y1="60" x2="140" y2="50" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
      </svg>
    </div>
    {/* Label */}
    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium">
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
