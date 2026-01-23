import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

const DocsHub = () => {
  return (
    <Layout>
      <section className="bg-white py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Badge */}
            <span className="bg-slate-100 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-6">
              Documentation
            </span>

            {/* Icon */}
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Docs Hub
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-lg mb-8">
              Comprehensive documentation, API references, and integration guides 
              to help you build with GMI Cloud. Coming soon.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact" className="gap-2">
                  Get Early Access
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/developers/demo-apps">
                  Explore Demo Apps
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DocsHub;
