import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ctaConsultation from "@/assets/pricing/cta-consultation.jpg";

const PricingCTABanner = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl min-h-[320px] md:min-h-[400px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={ctaConsultation}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Dark gradient overlay on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full min-h-[320px] md:min-h-[400px] px-8 md:px-12 py-12 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Not sure which product fits your needs? Let's talk.
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Our team is here to help you choose the right GPU cloud solution and answer any questions you have about performance, pricing, or scaling.
            </p>
            <div>
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTABanner;
