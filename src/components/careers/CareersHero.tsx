import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroWorker from "@/assets/careers/hero-worker.jpg";

const CareersHero = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Build the Future of AI with NexusAI
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At NexusAI, we're not just building cutting-edge cloud infrastructure — we're shaping the future of AI and high-performance computing. Innovation thrives when brilliant minds have the freedom to push boundaries, which is why we foster a dynamic, fast-paced environment where creativity and expertise drive progress.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">Join NexusAI</Link>
              </Button>
              <Link
                to="#positions"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                See Open Positions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual - Professional working on laptop */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={heroWorker}
                alt="Professional working on laptop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
