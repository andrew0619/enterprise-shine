import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cpu, ArrowRight } from "lucide-react";

const GPUGB200 = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
              <Cpu className="h-8 w-8 text-primary" />
            </div>
            
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Coming Soon
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              NVIDIA GB200 NVL72
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              The next generation of AI supercomputing. The GB200 NVL72 combines Grace CPUs with Blackwell GPUs for unprecedented AI performance at scale.
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

export default GPUGB200;
