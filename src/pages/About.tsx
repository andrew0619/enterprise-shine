import Layout from "@/components/layout/Layout";
import AboutHero from "@/components/about/AboutHero";
import TeamSection from "@/components/about/TeamSection";
import ComplianceSection from "@/components/about/ComplianceSection";
import AboutNewsSection from "@/components/about/AboutNewsSection";
import AboutFAQSection from "@/components/about/AboutFAQSection";

const About = () => {
  return (
    <Layout>
      <AboutHero />
      <TeamSection />
      <ComplianceSection />
      <AboutNewsSection />
      <AboutFAQSection />
    </Layout>
  );
};

export default About;
