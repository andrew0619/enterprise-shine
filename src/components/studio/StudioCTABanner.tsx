import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudioCTABanner = () => {
  return (
    <section className="bg-[#000000] py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background with organic texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-stone-800 to-zinc-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,80,60,0.3)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(80,60,50,0.3)_0%,transparent_50%)]" />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Create at the rhythm of your imagination.
              </h2>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 bg-transparent rounded-full px-8"
              >
                <Link to="/contact">Request Demo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 rounded-full px-8"
              >
                <Link to="/contact">Start Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioCTABanner;
