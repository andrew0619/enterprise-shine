import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";

// Custom trigger with Plus icon (reused pattern from GPU FAQ)
const PlusAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-5 text-left font-medium transition-all [&[data-state=open]>svg]:rotate-45",
        className
      )}
      {...props}
    >
      {children}
      <Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
PlusAccordionTrigger.displayName = "PlusAccordionTrigger";

const PricingFAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("pricing.faq.items.q1.question"),
      answer: t("pricing.faq.items.q1.answer"),
    },
    {
      question: t("pricing.faq.items.q2.question"),
      answer: t("pricing.faq.items.q2.answer"),
    },
    {
      question: t("pricing.faq.items.q3.question"),
      answer: t("pricing.faq.items.q3.answer"),
    },
    {
      question: t("pricing.faq.items.q4.question"),
      answer: t("pricing.faq.items.q4.answer"),
    },
    {
      question: t("pricing.faq.items.q5.question"),
      answer: t("pricing.faq.items.q5.answer"),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC]">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-heading">
            {t("pricing.faq.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("pricing.faq.subtitle")}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-card-border rounded-xl mb-3 px-6 data-[state=open]:shadow-sm"
            >
              <PlusAccordionTrigger className="text-base font-medium hover:no-underline">
                {faq.question}
              </PlusAccordionTrigger>
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

export default PricingFAQSection;