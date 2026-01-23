import Layout from "@/components/layout/Layout";
import GB200Hero from "@/components/gb200/GB200Hero";
import GB200FeaturesSection from "@/components/gb200/GB200FeaturesSection";
import GB200SolutionsGrid from "@/components/gb200/GB200SolutionsGrid";
import GB200FutureProof from "@/components/gb200/GB200FutureProof";
import GB200FAQSection from "@/components/gb200/GB200FAQSection";
import GB200ContactForm from "@/components/gb200/GB200ContactForm";

const GPUGB200 = () => {
  return (
    <Layout>
      <GB200Hero />
      <GB200FeaturesSection />
      <GB200SolutionsGrid />
      <GB200FutureProof />
      <GB200FAQSection />
      <GB200ContactForm />
    </Layout>
  );
};

export default GPUGB200;
