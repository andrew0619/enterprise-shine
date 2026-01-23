import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Metallic Cubes Visual
const MetallicCubes = () => (
  <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
    {/* Main cube cluster */}
    <div className="relative">
      {[
        { x: 0, y: 0, z: 0, size: "w-20 h-24" },
        { x: 60, y: -20, z: 10, size: "w-16 h-20" },
        { x: -50, y: 10, z: -5, size: "w-14 h-18" },
        { x: 30, y: 30, z: 5, size: "w-12 h-16" },
      ].map((cube, i) => (
        <div
          key={i}
          className={`absolute ${cube.size} bg-gradient-to-b from-slate-600 to-slate-900 rounded-lg shadow-xl`}
          style={{
            left: `${cube.x}px`,
            top: `${cube.y}px`,
            transform: `translateZ(${cube.z}px) rotateY(15deg) rotateX(10deg)`,
          }}
        >
          {/* Top face */}
          <div
            className="absolute -top-2 left-1 right-1 h-3 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t"
            style={{ clipPath: "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)" }}
          />
          {/* Right face */}
          <div
            className="absolute top-0 -right-2 w-3 h-full bg-gradient-to-r from-slate-700 to-slate-900 rounded-r"
            style={{ clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)" }}
          />
          {/* LED */}
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </div>
      ))}
    </div>
    
    {/* Glow effect */}
    <div className="absolute bottom-0 w-48 h-16 bg-primary/10 blur-3xl rounded-full" />
  </div>
);

// Donut Chart / Gauge Component
const MonitoringDashboard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-md mx-auto">
    <div className="text-sm font-medium text-foreground mb-6">Total Inferences</div>
    
    {/* Donut Chart */}
    <div className="relative w-40 h-40 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset="62.8"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-primary">5</span>
        <span className="text-xs text-muted-foreground">Active</span>
      </div>
    </div>
    
    {/* Metrics */}
    <div className="space-y-3">
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-muted-foreground">Avg Latency</span>
        <span className="text-sm font-medium">42ms</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-muted-foreground">Throughput</span>
        <span className="text-sm font-medium">1.2K req/s</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-muted-foreground">Uptime</span>
        <span className="text-sm font-medium text-green-600">99.99%</span>
      </div>
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-muted-foreground">Cost/1K inferences</span>
        <span className="text-sm font-medium">$0.002</span>
      </div>
    </div>
  </div>
);

const FeatureDeepDive = () => {
  return (
    <>
      {/* Scaling Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Auto-Scale</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Effortless Scaling for Your AI Workloads
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Scale from zero to thousands of concurrent requests automatically. Our intelligent auto-scaling adjusts resources in real-time based on traffic patterns.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Dynamic Scaling</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically provisions GPUs as demand increases, scales down during quiet periods.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Blazing Flexibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose your minimum and maximum replicas, set custom scaling metrics.
                  </p>
                </div>
              </div>
              
              <Button asChild>
                <Link to="/contact">Get Started Now</Link>
              </Button>
            </div>
            
            {/* Right Visual */}
            <MetallicCubes />
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Monitor</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Real-Time AI Performance Monitoring
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Keep your finger on the pulse with comprehensive dashboards. Track latency, throughput, and error rates in real-time to ensure optimal performance.
              </p>
              
              <Button asChild>
                <Link to="/contact">Get Started Now</Link>
              </Button>
            </div>
            
            {/* Right Visual - Dashboard */}
            <MonitoringDashboard />
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureDeepDive;
