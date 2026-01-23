import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NetworkGlobeVisual from "./NetworkGlobeVisual";

const stats = [
  { value: "2023", label: "年" },
  { value: "100+", label: "核心成員" },
  { value: "5", label: "全球據點" },
];

const AboutHero = () => {
  return (
    <section className="relative bg-heading text-background overflow-hidden">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 md:py-24 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-primary font-medium">關於 GMI Cloud</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-background">
              築基 AI 基礎建設，
              <br />
              成就每個可能
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Building AI Infrastructure, Empowering Possibilities. 
              我們致力於打造最先進的 GPU 雲端運算平台，加速全球 AI 創新。
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/contact">聯繫我們</Link>
            </Button>
          </div>
          
          {/* Right Visual */}
          <div className="hidden lg:block">
            <NetworkGlobeVisual />
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 py-12 border-t border-muted-foreground/20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-background">{stat.value}</p>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
