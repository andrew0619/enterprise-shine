import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InferenceCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-16 md:py-20 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("inferenceEngine.cta.title")}
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              {t("inferenceEngine.cta.subtitle")}
            </p>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              <Link to="/contact">{t("common.getStarted")}</Link>
            </Button>
          </div>

          {/* Right Visual - Metallic Cubes */}
          <div className="flex items-center justify-center lg:justify-end gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative"
                style={{
                  transform: `translateY(${i === 1 ? -20 : 0}px) rotate(${i * 5 - 5}deg)`,
                }}
              >
                {/* Cube */}
                <div className="w-20 h-24 md:w-24 md:h-28 bg-gradient-to-b from-slate-600 to-slate-800 rounded-lg shadow-xl">
                  {/* Top face */}
                  <div
                    className="absolute -top-2 left-1 right-1 h-3 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t"
                    style={{
                      clipPath: "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)",
                    }}
                  />
                  {/* Right face */}
                  <div
                    className="absolute top-0 -right-2 w-3 h-full bg-gradient-to-r from-slate-700 to-slate-900 rounded-r"
                    style={{
                      clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)",
                    }}
                  />
                  {/* Front details */}
                  <div className="absolute inset-3 pt-4">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="h-1.5 bg-slate-500/40 rounded-full mb-2"
                      />
                    ))}
                  </div>
                  {/* LED */}
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InferenceCTA;
