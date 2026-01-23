import { useTranslation } from "react-i18next";

const FoundationSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-2">
            {t("home.foundationTitle")}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            {t("home.foundationSubtitle")}
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("home.foundationDescription")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundationSection;
