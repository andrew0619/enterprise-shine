import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DualCTABanners = () => {
  return (
    <>
      {/* Banner 1 - Light Blue */}
      <section className="bg-blue-100 py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to scale your AI infrastructure?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get started with Cluster Engine today and experience enterprise-grade orchestration.
          </p>
          <Button asChild size="lg" className="font-semibold">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Banner 2 - Dark with Cubes */}
      <section className="bg-slate-950 py-16 md:py-20 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Manage Workloads Effortlessly
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Deploy, monitor, and scale your AI workloads with our intuitive Cluster Engine. Built for teams who demand reliability at scale.
              </p>
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">Deploy Now</Link>
              </Button>
            </div>

            {/* Right Visual - Three Metallic Cubes */}
            <div className="flex items-center justify-center lg:justify-end gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="relative"
                  style={{
                    transform: `translateY(${i === 1 ? -20 : 0}px)`,
                  }}
                >
                  {/* Cube */}
                  <div className="w-24 h-28 md:w-28 md:h-32 bg-gradient-to-b from-slate-700 to-slate-900 rounded-lg shadow-xl">
                    {/* Top face */}
                    <div
                      className="absolute -top-2 left-1 right-1 h-4 bg-gradient-to-b from-slate-500 to-slate-700 rounded-t"
                      style={{
                        clipPath: "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)",
                      }}
                    />
                    {/* Right face */}
                    <div
                      className="absolute top-0 -right-2 w-4 h-full bg-gradient-to-r from-slate-800 to-slate-950 rounded-r"
                      style={{
                        clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
                      }}
                    />
                    {/* Front details */}
                    <div className="absolute inset-3 pt-4">
                      {[...Array(4)].map((_, j) => (
                        <div
                          key={j}
                          className="h-1.5 bg-slate-600/40 rounded-full mb-2"
                        />
                      ))}
                    </div>
                    {/* LED */}
                    <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DualCTABanners;
