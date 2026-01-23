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
    question: "What is the NVIDIA HGX B200 and what is it used for?",
    answer: "The NVIDIA HGX B200 is a high-performance AI computing platform featuring 8 Blackwell architecture GPUs on a single baseboard. It's designed for the most demanding AI training and inference workloads, including training large language models, generative AI, and scientific computing applications."
  },
  {
    question: "What makes the HGX B200's performance unique?",
    answer: "The HGX B200 delivers up to 144 petaflops of AI performance with 8 Blackwell GPUs. Each GPU features next-generation Tensor Cores with FP4 support, enabling 4x faster inference compared to previous generations. The unified HBM3e memory pool provides 1.4TB of high-bandwidth memory."
  },
  {
    question: "What architectural advantages does the HGX B200 provide?",
    answer: "The platform features 5th-generation NVLink with 1.8TB/s of GPU-to-GPU bandwidth, enabling all 8 GPUs to work as a unified compute engine. The decompression engine accelerates database queries, while the transformer engine optimizes LLM workloads automatically."
  },
  {
    question: "How does the HGX B200 ensure scalability?",
    answer: "Multiple HGX B200 systems can be connected via NVLink Switch and high-speed networking to create AI supercomputers with thousands of GPUs. The architecture supports linear scaling for both training and inference workloads, making it ideal for frontier AI development."
  },
  {
    question: "How can customers access the HGX B200 platform?",
    answer: "GMI Cloud offers flexible access to HGX B200 infrastructure including on-demand hourly access, reserved capacity with volume discounts, and fully dedicated clusters. Contact our sales team to discuss your requirements and get started with a customized deployment."
  }
];

const HGXB200FAQSection = () => {
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

export default HGXB200FAQSection;
