import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

const PlusAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left font-medium transition-all [&[data-state=open]>svg]:rotate-45",
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

const H200FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("h200Faq.items.q1.question"),
      answer: t("h200Faq.items.q1.answer"),
    },
    {
      question: t("h200Faq.items.q2.question"),
      answer: t("h200Faq.items.q2.answer"),
    },
    {
      question: t("h200Faq.items.q3.question"),
      answer: t("h200Faq.items.q3.answer"),
    },
    {
      question: t("h200Faq.items.q4.question"),
      answer: t("h200Faq.items.q4.answer"),
    },
    {
      question: t("h200Faq.items.q5.question"),
      answer: t("h200Faq.items.q5.answer"),
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            {t("h200Faq.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            {t("h200Faq.subtitle")}
          </p>

          <AccordionPrimitive.Root type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border"
              >
                <PlusAccordionTrigger className="text-foreground hover:text-primary">
                  {faq.question}
                </PlusAccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  );
};

export default H200FAQSection;