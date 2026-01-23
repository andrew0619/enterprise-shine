import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

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

const faqs = [
  {
    question: "What types of GPUs do you offer?",
    answer:
      "We offer the latest NVIDIA GPUs including H100 with 80GB HBM3 memory, A100 with 80GB HBM2e, and L40S with 48GB GDDR6. All configurations include NVLink and InfiniBand for optimal distributed training performance.",
  },
  {
    question: "How do I manage GPU clusters for distributed training?",
    answer:
      "Our platform includes a comprehensive cluster management dashboard. You can provision nodes, monitor utilization, configure networking, and manage jobs through our web console or API. We also support popular orchestration tools like Kubernetes and Slurm.",
  },
  {
    question: "Which deep learning frameworks are supported? Can I customize?",
    answer:
      "We support all major frameworks including PyTorch, TensorFlow, JAX, and ONNX. You can use our pre-configured containers or bring your own custom Docker images. We also provide optimized builds for maximum GPU utilization.",
  },
  {
    question: "What are the pricing options? Do you offer cost optimization?",
    answer:
      "We offer flexible pricing including on-demand hourly rates, reserved capacity with significant discounts, and committed use contracts. Our platform includes built-in cost optimization tools to help you minimize spend while maximizing performance.",
  },
  {
    question: "How do I get started with GPU rental?",
    answer:
      "Getting started is simple. Contact our sales team for a consultation, and we'll help you determine the right configuration for your needs. Most clusters can be provisioned within hours, and we provide full onboarding support.",
  },
];

const GPUFAQSection = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC]">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-heading">
            常見問題
          </h2>
          <p className="text-lg text-muted-foreground">
            Frequently Asked Questions
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

export default GPUFAQSection;
