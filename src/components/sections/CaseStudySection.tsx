import { Button } from "@/components/ui/button";
import { Play, TrendingDown, Zap } from "lucide-react";

const stats = [
  {
    icon: TrendingDown,
    value: "50%",
    label: "Cost Savings",
    description: "Average reduction in infrastructure costs",
  },
  {
    icon: Zap,
    value: "8x",
    label: "Faster Deployment",
    description: "From weeks to hours for new GPU clusters",
  },
];

const CaseStudySection = () => {
  return (
    <section className="py-20 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video/Testimonial Card */}
          <div className="relative group">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-heading to-foreground overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground p-8">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors cursor-pointer">
                  <Play className="h-8 w-8 ml-1" />
                </div>
                <blockquote className="text-center max-w-md">
                  <p className="text-lg md:text-xl font-medium mb-4">
                    "NexusAI transformed how we deploy AI models. What used to
                    take weeks now takes hours."
                  </p>
                  <footer className="text-sm opacity-80">
                    <cite className="not-italic font-semibold">
                      Sarah Chen
                    </cite>
                    <br />
                    <span className="text-xs">CTO, TechCorp AI</span>
                  </footer>
                </blockquote>
              </div>
            </div>

            <Button
              size="lg"
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Story
            </Button>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Proven Results
              </h2>
              <p className="text-lg text-muted-foreground">
                Our customers achieve measurable improvements in cost,
                performance, and time-to-market.
              </p>
            </div>

            <div className="space-y-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-start gap-6 p-6 bg-card rounded-xl border border-card-border"
                >
                  <div className="shrink-0 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl md:text-5xl font-bold text-primary">
                        {stat.value}
                      </span>
                      <span className="text-xl font-semibold">{stat.label}</span>
                    </div>
                    <p className="text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
