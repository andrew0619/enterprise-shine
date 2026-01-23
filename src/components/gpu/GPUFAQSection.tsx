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

// Custom trigger with Plus icon
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

const GPUFAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("gpuFaq.items.q1.question"),
      questionEn: t("gpuFaq.items.q1.questionEn", { defaultValue: "" }),
      answer: t("gpuFaq.items.q1.answer"),
    },
    {
      question: t("gpuFaq.items.q2.question"),
      questionEn: t("gpuFaq.items.q2.questionEn", { defaultValue: "" }),
      answer: t("gpuFaq.items.q2.answer"),
    },
    {
      question: t("gpuFaq.items.q3.question"),
      questionEn: t("gpuFaq.items.q3.questionEn", { defaultValue: "" }),
      answer: t("gpuFaq.items.q3.answer"),
    },
    {
      question: t("gpuFaq.items.q4.question"),
      questionEn: t("gpuFaq.items.q4.questionEn", { defaultValue: "" }),
      answer: t("gpuFaq.items.q4.answer"),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-heading">
            {t("gpuFaq.title")}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-card-border rounded-xl px-6 data-[state=open]:shadow-sm"
            >
              <PlusAccordionTrigger className="text-base font-medium hover:no-underline">
                <div className="text-left">
                  <p className="text-heading">{faq.question}</p>
                  {faq.questionEn && (
                    <p className="text-sm text-muted-foreground mt-1">{faq.questionEn}</p>
                  )}
                </div>
              </PlusAccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-center text-sm text-muted-foreground mt-8">
          {t("gpuFaq.subtitle")}
        </p>
      </div>
    </section>
  );
};

export default GPUFAQSection;