import { useTranslation } from "react-i18next";

const DemoHero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <span className="bg-slate-100 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            {t("developers.demoHero.badge")}
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t("developers.demoHero.title")}
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 text-lg max-w-2xl">
            {t("developers.demoHero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoHero;