import { Button } from "@/components/ui/button";
import { Play, TrendingDown, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import caseStudyImage from "@/assets/home/case-study-video.jpg";

const CaseStudySection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: TrendingDown,
      value: "50%",
      label: t("home.costSavings"),
      description: t("home.costSavingsDesc"),
    },
    {
      icon: Zap,
      value: "8x",
      label: t("home.fasterDeployment"),
      description: t("home.fasterDeploymentDesc"),
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video/Testimonial Card */}
          <div className="relative group">
            <div className="aspect-video rounded-2xl overflow-hidden relative">
              {/* Background Image */}
              <img 
                src={caseStudyImage} 
                alt="Enterprise datacenter infrastructure"
                className="w-full h-full object-cover"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground p-8">
                <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors cursor-pointer border border-white/20">
                  <Play className="h-8 w-8 ml-1" />
                </div>
                <blockquote className="text-center max-w-md">
                  <p className="text-lg md:text-xl font-medium mb-4">
                    "{t("home.caseStudyQuote")}"
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
              {t("common.watchStory")}
            </Button>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl mb-4">
                {t("home.caseStudyTitle")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("home.caseStudySubtitle")}
              </p>
            </div>

            <div className="space-y-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-start gap-6 p-6 bg-card rounded-xl border border-border"
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
