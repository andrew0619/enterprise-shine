import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
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

const faqs = [
  {
    question: "What is the NVIDIA H200 GPU offered by GMI Cloud?",
    answer:
      "The NVIDIA H200 is the latest high-performance GPU from NVIDIA, featuring 141GB of HBM3e memory and 4.8 TB/s bandwidth. GMI Cloud offers on-demand access to H200 GPUs in our enterprise-grade cloud infrastructure, enabling you to run the most demanding AI and HPC workloads without capital investment.",
  },
  {
    question: "How does the H200 differ from previous GPU models like the H100?",
    answer:
      "The H200 offers nearly double the memory capacity (141GB vs 80GB) and 1.4x more memory bandwidth compared to the H100. In practical benchmarks, this translates to 1.4x-1.9x faster inference performance for large language models like Llama 2 70B.",
  },
  {
    question: "How does the H200 enhance generative AI and LLM development?",
    answer:
      "The H200's massive memory capacity and bandwidth are specifically designed for large language models. It can handle larger batch sizes, longer context windows, and bigger models without memory constraints, enabling faster iteration and more efficient training and inference workflows.",
  },
  {
    question: "What are the benefits of using the H200 within GMI Cloud?",
    answer:
      "GMI Cloud provides instant access to H200 GPUs with pay-as-you-go pricing starting at $2.15/GPU-hour. Benefits include enterprise SLAs, NVLink connectivity for multi-GPU workloads, pre-configured ML environments, and 24/7 technical support.",
  },
  {
    question: "How can users access the H200 GPU on GMI Cloud?",
    answer:
      "Getting started is simple: sign up for a GMI Cloud account, select the H200 GPU configuration that matches your workload needs, and deploy within minutes. Our team is also available to help with custom configurations and enterprise deployments.",
  },
];

const H200FAQSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Everything you need to know about the NVIDIA H200 on GMI Cloud
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
