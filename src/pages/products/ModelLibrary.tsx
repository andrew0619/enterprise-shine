import Layout from "@/components/layout/Layout";
import ModelLibraryHero from "@/components/models/ModelLibraryHero";
import ModelGrid from "@/components/models/ModelGrid";
import ModelCTABanner from "@/components/models/ModelCTABanner";

const ModelLibrary = () => {
  return (
    <Layout>
      <ModelLibraryHero />
      <ModelGrid />
      <ModelCTABanner />
    </Layout>
  );
};

export default ModelLibrary;
