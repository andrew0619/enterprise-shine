import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import FoundationSection from "@/components/home/FoundationSection";
import InferenceSection from "@/components/sections/InferenceSection";
import ClusterSection from "@/components/sections/ClusterSection";
import GPUComputeSection from "@/components/sections/GPUComputeSection";
import LogoMarquee from "@/components/home/LogoMarquee";
import FAQSection from "@/components/sections/FAQSection";
import CaseStudySection from "@/components/sections/CaseStudySection";
import NewsSection from "@/components/sections/NewsSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FoundationSection />
      <InferenceSection />
      <ClusterSection />
      <GPUComputeSection />
      <LogoMarquee />
      <FAQSection />
      <CaseStudySection />
      <NewsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
