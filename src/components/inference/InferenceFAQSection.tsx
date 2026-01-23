import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const InferenceFAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("inferenceEngine.faq.items.q1.question"),
      answer: t("inferenceEngine.faq.items.q1.answer"),
    },
    {
      question: t("inferenceEngine.faq.items.q2.question"),
      answer: t("inferenceEngine.faq.items.q2.answer"),
    },
    {
      question: t("inferenceEngine.faq.items.q3.question"),
      answer: t("inferenceEngine.faq.items.q3.answer"),
    },
    {
      question: t("inferenceEngine.faq.items.q4.question"),
      answer: t("inferenceEngine.faq.items.q4.answer"),
    },
    {
      question: t("inferenceEngine.faq.items.q5.question"),
      answer: t("inferenceEngine.faq.items.q5.answer"),
    },
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container max-w-3xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("inferenceEngine.faq.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("inferenceEngine.faq.subtitle")}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border px-6"
            >
              <AccordionTrigger className="text-foreground font-medium text-left hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default InferenceFAQSection;
