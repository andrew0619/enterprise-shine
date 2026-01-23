import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Server, ArrowRight } from "lucide-react";

const GPUHGXB200 = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
              <Server className="h-8 w-8 text-primary" />
            </div>
            
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Coming Soon
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              NVIDIA HGX™ B200
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              The ultimate AI infrastructure platform. HGX B200 delivers breakthrough performance for the world's most demanding AI and HPC workloads with Blackwell architecture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/gpus/h200">Explore H200</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GPUHGXB200;
