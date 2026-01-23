import Layout from "@/components/layout/Layout";
import HGXB200Hero from "@/components/hgxb200/HGXB200Hero";
import HGXB200FeaturesSection from "@/components/hgxb200/HGXB200FeaturesSection";
import HGXB200SolutionsGrid from "@/components/hgxb200/HGXB200SolutionsGrid";
import HGXB200ElevateCTA from "@/components/hgxb200/HGXB200ElevateCTA";
import HGXB200FAQSection from "@/components/hgxb200/HGXB200FAQSection";
import HGXB200ContactForm from "@/components/hgxb200/HGXB200ContactForm";

const GPUHGXB200 = () => {
  return (
    <Layout>
      <HGXB200Hero />
      <HGXB200FeaturesSection />
      <HGXB200SolutionsGrid />
      <HGXB200ElevateCTA />
      <HGXB200FAQSection />
      <HGXB200ContactForm />
    </Layout>
  );
};

export default GPUHGXB200;
