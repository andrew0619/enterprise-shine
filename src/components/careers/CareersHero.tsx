import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroWorker from "@/assets/careers/hero-worker.jpg";

const CareersHero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("careers.heroTitle")}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("careers.heroSubtitle")}
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">{t("careers.joinButton")}</Link>
              </Button>
              <Link
                to="#positions"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                {t("careers.seePositions")}
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
