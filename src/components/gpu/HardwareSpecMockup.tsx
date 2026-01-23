import { ChevronDown } from "lucide-react";

const gpuOptions = [
  { label: "8x NVIDIA-H100-80GB-HBM3", status: "available" },
  { label: "8x NVIDIA-A100-80GB", status: "available" },
  { label: "4x NVIDIA-L40S-48GB", status: "available" },
];

const specs = [
  { label: "GPU Memory", value: "640 GB HBM3" },
  { label: "System RAM", value: "2,000 GB" },
  { label: "NVLink Bandwidth", value: "900 GB/s" },
];

const HardwareSpecMockup = () => {
  return (
    <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-200">
      {/* GPU Selection Mockup */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Select Configuration
        </p>
        {gpuOptions.map((option, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
              index === 0
                ? "bg-white border-primary/30 shadow-sm"
                : "bg-slate-100/50 border-slate-200"
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${
              option.status === "available" ? "bg-green-500" : "bg-yellow-500"
            }`} />
            <span className="text-sm font-medium text-foreground flex-1">
              {option.label}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
      
      {/* Specs Display */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-2 border-t border-slate-200">
        {specs.map((spec, index) => (
          <div key={index} className="text-center p-1 sm:p-2">
            <p className="text-[10px] sm:text-xs text-muted-foreground">{spec.label}</p>
            <p className="text-xs sm:text-sm font-semibold text-foreground break-words">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardwareSpecMockup;
