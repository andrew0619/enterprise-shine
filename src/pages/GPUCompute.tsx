import Layout from "@/components/layout/Layout";
import GPUHero from "@/components/gpu/GPUHero";
import GPUFeatureGrid from "@/components/gpu/GPUFeatureGrid";
import GPUFAQSection from "@/components/gpu/GPUFAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GPUCompute = () => {
  return (
    <Layout>
      <GPUHero />
      <GPUFeatureGrid />
      <GPUFAQSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#020617] via-slate-900 to-purple-950">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Deploy AI at Scale?
            </h2>
            <p className="text-slate-300 mb-8">
              Contact our team to find the perfect GPU configuration for your workloads.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GPUCompute;
