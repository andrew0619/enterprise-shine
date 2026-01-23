import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingCTABanner = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
      <div className="relative overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(to right, hsl(var(--heading)), hsl(var(--muted)), hsl(var(--heading)))' }}>
          {/* Decorative elements to simulate depth/photo atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-muted/30 to-transparent" />
          
          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative px-6 py-12 md:py-16 md:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              不確定哪個產品最適合您？
            </h2>
            <p className="text-lg text-white/90 mb-2">
              我們來幫您找答案！
            </p>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 text-sm md:text-base">
              GMI Cloud 專業團隊將協助您設計完整的 AI 佈署方案，包含效能最佳化規劃、成本預算優化等，從零開始建立您的團隊一起成長！
            </p>
            <Button asChild size="lg">
              <Link to="/contact">聯繫銷售</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTABanner;
