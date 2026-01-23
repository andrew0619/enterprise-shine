import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const PartnersFAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("partners.faq.q1.question", { defaultValue: "What is the purpose of the NexusAI Partner Program?" }),
      answer: t("partners.faq.q1.answer", { defaultValue: "The NexusAI Partner Program is designed to foster strategic relationships with technology leaders, resellers, and integrators who want to offer enterprise-grade GPU infrastructure to their clients." }),
    },
    {
      question: t("partners.faq.q2.question", { defaultValue: "Who can join this program?" }),
      answer: t("partners.faq.q2.answer", { defaultValue: "The program is open to GPU service providers, managed service providers (MSPs), system integrators, independent software vendors (ISVs), and AI influencers who want to expand their GPU infrastructure offerings." }),
    },
    {
      question: t("partners.faq.q3.question", { defaultValue: "What benefits do partners receive?" }),
      answer: t("partners.faq.q3.answer", { defaultValue: "Partners receive exclusive access to new products, co-marketing opportunities, dedicated technical support, priority engineering resources, and competitive pricing on GPU infrastructure." }),
    },
    {
      question: t("partners.faq.q4.question", { defaultValue: "What services can partners offer through the program?" }),
      answer: t("partners.faq.q4.answer", { defaultValue: "Partners can offer GPU cloud services, AI/ML infrastructure solutions, managed GPU clusters, inference endpoints, and custom AI workload optimization services." }),
    },
    {
      question: t("partners.faq.q5.question", { defaultValue: "How can businesses join the NexusAI Partner Program?" }),
      answer: t("partners.faq.q5.answer", { defaultValue: "Interested businesses can apply by clicking the 'Join Now' button and completing the partner application form. Our team will review applications and reach out within 5 business days." }),
    },
  ];

  return (
    <section className="bg-black py-20 md:py-28">
      <div className="container max-w-3xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("partners.faqTitle")}
          </h2>
          <p className="text-zinc-500">
            {t("partners.faqSubtitle", { defaultValue: "Get quick answers to common questions about FAQs." })}
          </p>
        </div>

        {/* FAQ Accordion - White bars on black background */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border-0 px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-slate-900 font-medium text-left hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PartnersFAQSection;
