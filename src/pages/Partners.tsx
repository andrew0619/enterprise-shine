import Layout from "@/components/layout/Layout";
import PartnersHero from "@/components/partners/PartnersHero";
import PartnerLogosStrip from "@/components/partners/PartnerLogosStrip";
import DiversePartnersSection from "@/components/partners/DiversePartnersSection";
import WhyJoinSection from "@/components/partners/WhyJoinSection";
import NewProductSection from "@/components/partners/NewProductSection";
import PartnersFAQSection from "@/components/partners/PartnersFAQSection";

const Partners = () => {
  return (
    <Layout>
      <PartnersHero />
      <PartnerLogosStrip />
      <DiversePartnersSection />
      <WhyJoinSection />
      <NewProductSection />
      <PartnersFAQSection />
    </Layout>
  );
};

export default Partners;
