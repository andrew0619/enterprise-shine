import Layout from "@/components/layout/Layout";
import ClusterHero from "@/components/cluster/ClusterHero";
import IntegrationEcosystem from "@/components/cluster/IntegrationEcosystem";
import FeatureZigZag from "@/components/cluster/FeatureZigZag";
import DualCTABanners from "@/components/cluster/DualCTABanners";
import ClusterFAQSection from "@/components/cluster/ClusterFAQSection";

const ClusterEngine = () => {
  return (
    <Layout>
      <ClusterHero />
      <IntegrationEcosystem />
      <FeatureZigZag />
      <DualCTABanners />
      <ClusterFAQSection />
    </Layout>
  );
};

export default ClusterEngine;
