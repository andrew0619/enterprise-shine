import Layout from "@/components/layout/Layout";
import H200Hero from "@/components/h200/H200Hero";
import H200FeatureGrid from "@/components/h200/H200FeatureGrid";
import H200PerformanceChart from "@/components/h200/H200PerformanceChart";
import H200MarketingBlock from "@/components/h200/H200MarketingBlock";
import H200CTABanner from "@/components/h200/H200CTABanner";
import H200FAQSection from "@/components/h200/H200FAQSection";

const GPUH200 = () => {
  return (
    <Layout>
      <H200Hero />
      <H200FeatureGrid />
      <H200PerformanceChart />
      <H200MarketingBlock />
      <H200CTABanner />
      <H200FAQSection />
    </Layout>
  );
};

export default GPUH200;
