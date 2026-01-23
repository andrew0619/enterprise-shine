import Layout from "@/components/layout/Layout";
import DemoHero from "@/components/developers/DemoHero";
import DemoAppsGrid from "@/components/developers/DemoAppsGrid";
import DemoReadyBanner from "@/components/developers/DemoReadyBanner";

const DemoApps = () => {
  return (
    <Layout>
      <DemoHero />
      <DemoAppsGrid />
      <div className="container pb-20">
        <DemoReadyBanner />
      </div>
    </Layout>
  );
};

export default DemoApps;
