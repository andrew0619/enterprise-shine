import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GB200FutureProof = () => {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Future-Proof Your AI with GMI Cloud and the GB200 NVL72
          </h2>
          
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            As AI models continue to grow in complexity, the GB200 NVL72 ensures your infrastructure stays ahead of the curve. With its groundbreaking architecture and seamless scalability, you can confidently invest in tomorrow's AI capabilities today. GMI Cloud provides the platform to harness this power with enterprise-grade reliability and support.
          </p>
          
          <Button 
            asChild 
            size="lg" 
            className="bg-slate-900 text-white hover:bg-slate-800 px-8"
          >
            <Link to="/contact">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GB200FutureProof;
