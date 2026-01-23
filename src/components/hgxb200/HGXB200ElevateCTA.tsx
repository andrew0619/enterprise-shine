import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HGXB200ElevateCTA = () => {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Elevate Your AI Capabilities with GMI Cloud and NVIDIA HGX B200
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Leverage the world's most powerful AI platform with GMI Cloud's enterprise infrastructure. Get immediate access to HGX B200 systems without capital investment, backed by 24/7 support and optimized MLOps tooling for accelerated time-to-value.
          </p>
          
          <Button
            asChild
            size="lg"
            className="bg-slate-900 text-white hover:bg-slate-800 px-8"
          >
            <Link to="/contact">Request Access</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HGXB200ElevateCTA;
