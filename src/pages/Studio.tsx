import Layout from "@/components/layout/Layout";
import StudioHero from "@/components/studio/StudioHero";
import StudioGallery from "@/components/studio/StudioGallery";
import StudioCTABanner from "@/components/studio/StudioCTABanner";

const Studio = () => {
  return (
    <Layout>
      <div className="bg-[#000000]">
        <StudioHero />
        <StudioGallery />
        <StudioCTABanner />
      </div>
    </Layout>
  );
};

export default Studio;
