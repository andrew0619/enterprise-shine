import Layout from "@/components/layout/Layout";
import GPUHero from "@/components/gpu/GPUHero";
import GPUFeatureGrid from "@/components/gpu/GPUFeatureGrid";
import GPUFAQSection from "@/components/gpu/GPUFAQSection";

const GPUCompute = () => {
  return (
    <Layout>
      <GPUHero />
      <GPUFeatureGrid />
      <GPUFAQSection />
    </Layout>
  );
};

export default GPUCompute;
