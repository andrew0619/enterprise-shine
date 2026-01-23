import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <Plus className="h-5 w-5 shrink-0 transition-transform duration-200 text-slate-500" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
PlusAccordionTrigger.displayName = "PlusAccordionTrigger";

const faqs = [
  {
    question: "What is the NVIDIA GB200 NVL72 and why is it unique?",
    answer: "The NVIDIA GB200 NVL72 is the next generation of AI supercomputing, combining 72 Blackwell GPUs with Grace CPUs in a single rack-scale system. It delivers unprecedented AI training and inference performance with up to 30x better performance per watt compared to previous generations."
  },
  {
    question: "What performance improvements does the GB200 NVL72 provide?",
    answer: "The GB200 NVL72 delivers up to 30x faster AI inference and 4x faster training compared to H100-based systems. With 13.5TB of unified HBM3e memory and 130TB/s of memory bandwidth, it can handle the largest AI models with ease."
  },
  {
    question: "How does the GB200 NVL72 support scalability?",
    answer: "The system uses 5th-generation NVLink with 1.8TB/s GPU-to-GPU bandwidth, enabling seamless scaling across the entire 72-GPU system. Multiple NVL72 racks can be connected via high-speed networking for even larger deployments."
  },
  {
    question: "What benefits does the GB200 NVL72 bring when used within GMI Cloud?",
    answer: "GMI Cloud provides fully managed GB200 NVL72 infrastructure with enterprise SLAs, dedicated support, and flexible deployment options. Users get immediate access without capital investment, along with optimized software stack and MLOps tooling."
  },
  {
    question: "How can users access the GB200 NVL72?",
    answer: "Contact our sales team to discuss your requirements and join our priority access program. We offer flexible deployment options including dedicated clusters, reserved capacity, and on-demand access depending on your needs."
  }
];

const GB200FAQSection = () => {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Frequently asked questions
          </h2>
          
          <AccordionPrimitive.Root type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionPrimitive.Item
                key={index}
                value={`item-${index}`}
                className="border-b border-slate-200"
              >
                <PlusAccordionTrigger className="text-left text-slate-900">
                  {faq.question}
                </PlusAccordionTrigger>
                <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-4 pt-0 text-slate-600 leading-relaxed">
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

export default GB200FAQSection;
