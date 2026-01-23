import Layout from "@/components/layout/Layout";
import PricingGPUCards from "@/components/pricing/PricingGPUCards";
import ServiceEngineSection from "@/components/pricing/ServiceEngineSection";
import PricingCTABanner from "@/components/pricing/PricingCTABanner";
import PricingFAQSection from "@/components/pricing/PricingFAQSection";
import { useTranslation } from "react-i18next";

const PricingPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              {t("pricing.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* GPU Pricing Cards */}
      <PricingGPUCards />

      {/* Service Engine Section */}
      <ServiceEngineSection />

      {/* CTA Banner */}
      <PricingCTABanner />

      {/* FAQ Section */}
      <PricingFAQSection />
    </Layout>
  );
};

export default PricingPage;