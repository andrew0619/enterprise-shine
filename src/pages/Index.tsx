import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import LogoMarquee from "@/components/home/LogoMarquee";
import InferenceSection from "@/components/sections/InferenceSection";
import ClusterSection from "@/components/sections/ClusterSection";
import GPUComputeSection from "@/components/sections/GPUComputeSection";
import CaseStudySection from "@/components/sections/CaseStudySection";
import FAQSection from "@/components/sections/FAQSection";
import NewsSection from "@/components/sections/NewsSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <LogoMarquee />
      <InferenceSection />
      <ClusterSection />
      <GPUComputeSection />
      <CaseStudySection />
      <FAQSection />
      <NewsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
