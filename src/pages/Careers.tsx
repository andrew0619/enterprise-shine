import Layout from "@/components/layout/Layout";
import CareersHero from "@/components/careers/CareersHero";
import CoreValuesSection from "@/components/careers/CoreValuesSection";
import GlobalOfficesSection from "@/components/careers/GlobalOfficesSection";
import JoinTeamCTA from "@/components/careers/JoinTeamCTA";

const Careers = () => {
  return (
    <Layout>
      <CareersHero />
      <CoreValuesSection />
      <GlobalOfficesSection />
      <JoinTeamCTA />
    </Layout>
  );
};

export default Careers;
