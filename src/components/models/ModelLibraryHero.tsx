import { useTranslation } from "react-i18next";
import heroBlocks from "@/assets/models/hero-blocks.jpg";

const ModelLibraryHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-[#020617] py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBlocks}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
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
