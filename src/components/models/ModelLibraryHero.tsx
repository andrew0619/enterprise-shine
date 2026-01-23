import { useTranslation } from "react-i18next";

const ModelLibraryHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-[#020617] py-20 md:py-28 overflow-hidden">
      {/* Floating 3D Cubes - Left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4">
        <div className="relative">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="absolute w-24 h-28 bg-gradient-to-b from-slate-600 to-slate-900 rounded-lg shadow-xl"
              style={{
                left: `${i * 40}px`,
                top: `${i * 30 - 30}px`,
                transform: `rotate(${10 - i * 5}deg)`,
              }}
            >
              <div
                className="absolute -top-2 left-1 right-1 h-4 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t"
                style={{ clipPath: "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)" }}
              />
              <div
                className="absolute top-0 -right-2 w-4 h-full bg-gradient-to-r from-slate-700 to-slate-900 rounded-r"
                style={{ clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)" }}
              />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating 3D Cubes - Right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4">
        <div className="relative">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-20 h-24 bg-gradient-to-b from-slate-600 to-slate-900 rounded-lg shadow-xl"
              style={{
                right: `${i * 35}px`,
                top: `${(i === 1 ? -40 : i === 2 ? 20 : 0)}px`,
                transform: `rotate(${-10 + i * 5}deg)`,
              }}
            >
              <div
                className="absolute -top-2 left-1 right-1 h-3 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t"
                style={{ clipPath: "polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)" }}
              />
              <div
                className="absolute top-0 -right-2 w-3 h-full bg-gradient-to-r from-slate-700 to-slate-900 rounded-r"
                style={{ clipPath: "polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)" }}
              />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {t("modelLibrary.heroTitle")}
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          {t("modelLibrary.heroSubtitle")}
        </p>
      </div>
    </section>
  );
};

export default ModelLibraryHero;
