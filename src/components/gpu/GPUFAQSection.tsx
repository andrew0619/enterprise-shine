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
    question: "提供哪些類型的 GPU ？",
    questionEn: "What types of GPUs do you offer?",
    answer:
      "我們提供最新的 NVIDIA GPU，包括 H100（80GB HBM3 記憶體）、H200（HBM3e 記憶體）和即將推出的 Blackwell 系列。所有配置都包含 NVLink 和 InfiniBand，以實現最佳的分散式訓練效能。",
  },
  {
    question: "如何管理 GPU 叢集和網路以進行分散式訓練？",
    questionEn: "How do I manage GPU clusters for distributed training?",
    answer:
      "我們的平台包含全面的叢集管理儀表板。您可以透過我們的網頁主控台或 API 來配置節點、監控使用率、設定網路和管理作業。我們也支援 Kubernetes 和 Slurm 等流行的編排工具。",
  },
  {
    question: "支援哪些軟體和深度學習框架？可以客製化嗎？",
    questionEn: "Which deep learning frameworks are supported? Can I customize?",
    answer:
      "我們支援所有主要框架，包括 PyTorch、TensorFlow、JAX 和 ONNX。您可以使用我們預先配置的容器，或自帶 Docker 映像。我們還提供優化版本以實現最大 GPU 使用率。",
  },
  {
    question: "GPU 的價格方案如何？有提供成本最佳化功能嗎？",
    questionEn: "What are the pricing options? Do you offer cost optimization?",
    answer:
      "我們提供靈活的定價方案，包括按需計時費率、具有大幅折扣的預留容量，以及承諾使用合約。我們的平台內建成本優化工具，幫助您在最大化效能的同時將支出降到最低。",
  },
];

const GPUFAQSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-heading">
            常見問題
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
          快速取得常見問題的解答
        </p>
      </div>
    </section>
  );
};

export default GPUFAQSection;
