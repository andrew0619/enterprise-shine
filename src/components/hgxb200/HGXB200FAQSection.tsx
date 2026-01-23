import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const PlusAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
        className
      )}
      {...props}
    >
      {children}
      <Plus className="h-5 w-5 shrink-0 transition-transform duration-200 text-muted-foreground" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
PlusAccordionTrigger.displayName = "PlusAccordionTrigger";

const HGXB200FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("hgxb200Faq.items.q1.question"),
      answer: t("hgxb200Faq.items.q1.answer"),
    },
    {
      question: t("hgxb200Faq.items.q2.question"),
      answer: t("hgxb200Faq.items.q2.answer"),
    },
    {
      question: t("hgxb200Faq.items.q3.question"),
      answer: t("hgxb200Faq.items.q3.answer"),
    },
    {
      question: t("hgxb200Faq.items.q4.question"),
      answer: t("hgxb200Faq.items.q4.answer"),
    },
    {
      question: t("hgxb200Faq.items.q5.question"),
      answer: t("hgxb200Faq.items.q5.answer"),
    },
  ];

  return (
    <section className="bg-secondary/30 py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {t("hgxb200Faq.title")}
          </h2>
          
          <AccordionPrimitive.Root type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionPrimitive.Item
                key={index}
                value={`item-${index}`}
                className="border-b border-border"
              >
                <PlusAccordionTrigger className="text-left text-foreground">
                  {faq.question}
                </PlusAccordionTrigger>
                <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-4 pt-0 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  );
};

export default HGXB200FAQSection;