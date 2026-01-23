import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq.items.q1.question"),
      answer: t("faq.items.q1.answer"),
    },
    {
      question: t("faq.items.q2.question"),
      answer: t("faq.items.q2.answer"),
    },
    {
      question: t("faq.items.q3.question"),
      answer: t("faq.items.q3.answer"),
    },
    {
      question: t("faq.items.q4.question"),
      answer: t("faq.items.q4.answer"),
    },
    {
      question: t("faq.items.q5.question"),
      answer: t("faq.items.q5.answer"),
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-secondary/30">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("faq.subtitle")}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
