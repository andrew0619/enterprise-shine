import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServiceEngineSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      type: t("pricing.serviceEngine.serviceType"),
      title: t("pricing.serviceEngine.inference.title"),
      description: t("pricing.serviceEngine.inference.description"),
      cta: t("pricing.serviceEngine.inference.cta"),
      ctaLink: "/products#inference",
    },
    {
      type: t("pricing.serviceEngine.serviceType"),
      title: t("pricing.serviceEngine.cluster.title"),
      description: t("pricing.serviceEngine.cluster.description"),
      cta: t("pricing.serviceEngine.cluster.cta"),
      ctaLink: "/products#cluster",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">
            {t("pricing.serviceEngine.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.serviceEngine.subtitle")}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-card-border rounded-xl p-4 sm:p-6 border-l-4 border-l-primary hover:shadow-md transition-shadow"
            >
              {/* Service Type Label */}
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {service.type}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-heading mt-2 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                {service.description}
              </p>

              {/* CTA Button */}
              <Button asChild>
                <Link to={service.ctaLink}>{service.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceEngineSection;