import Layout from "@/components/layout/Layout";
import InferenceHero from "@/components/inference/InferenceHero";
import SmarterWayCards from "@/components/inference/SmarterWayCards";
import ModelLibraryShowcase from "@/components/inference/ModelLibraryShowcase";
import FeatureDeepDive from "@/components/inference/FeatureDeepDive";
import InferenceCTA from "@/components/inference/InferenceCTA";
import InferenceFAQSection from "@/components/inference/InferenceFAQSection";

const InferenceEngine = () => {
  return (
    <Layout>
      <InferenceHero />
      <SmarterWayCards />
      <ModelLibraryShowcase />
      <FeatureDeepDive />
      <InferenceCTA />
      <InferenceFAQSection />
    </Layout>
  );
};

export default InferenceEngine;
