import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const H200MarketingBlock = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Future-Proof Your AI with GMI Cloud and the H200
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            As AI models continue to grow in size and complexity, the NVIDIA H200 provides the headroom you need to stay ahead. With its massive 141GB memory capacity and industry-leading bandwidth, the H200 on GMI Cloud ensures your infrastructure can handle tomorrow's AI workloads today. Scale from development to production seamlessly with our enterprise-grade cloud platform.
          </p>
          
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            <Link to="/contact">Reserve Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default H200MarketingBlock;
