import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroSystem from "@/assets/hgxb200/hero-system.jpg";

const HGXB200Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#000000] py-20 md:py-28 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t("hgxb200Page.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
              {t("hgxb200Page.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 px-8">
                <Link to="/contact">{t("hgxb200Page.hero.cta")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8">
                <Link to="#features">{t("hgxb200Page.hero.learnMore")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <img src={heroSystem} alt="NVIDIA HGX B200" className="w-full max-w-lg h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HGXB200Hero;
