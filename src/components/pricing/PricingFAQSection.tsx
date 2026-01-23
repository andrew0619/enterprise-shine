import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

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

const faqs = [
  {
    question: "提供哪些類型的 GPU？",
    answer:
      "我們提供最新的 NVIDIA GPU，包括 H200（具備 HBM3e 記憶體）、H100 80GB HBM3 和 A100 80GB HBM2e。所有配置都包含 NVLink 和 InfiniBand，以實現最佳的分散式訓練性能。",
  },
  {
    question: "如何計費和付款？",
    answer:
      "我們採用按需計費模式，按 GPU 小時計算。您可以選擇預付費或後付費方案，支援信用卡、銀行轉帳等多種付款方式。企業客戶可享有專屬付款條件。",
  },
  {
    question: "是否提供大量折扣？",
    answer:
      "是的！我們提供彈性的折扣方案。包括長期訂閱折扣（最高可達 40%）、大量使用折扣，以及企業專屬定價。請聯繫我們的銷售團隊了解詳情。",
  },
  {
    question: "可以隨時調整資源嗎？",
    answer:
      "當然可以。您可以隨時透過控制台或 API 增加或減少 GPU 資源。我們的彈性架構支援即時擴展，確保您只為實際使用的資源付費。",
  },
  {
    question: "如何開始使用？",
    answer:
      "開始使用非常簡單。聯繫我們的銷售團隊進行諮詢，我們會協助您確定適合需求的配置。大多數集群可在數小時內完成配置，我們提供完整的入門支援。",
  },
];

const PricingFAQSection = () => {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC]">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-heading">
            常見問題
          </h2>
          <p className="text-muted-foreground">
            對我們提供的服務有疑問嗎？請參閱以下常見問題
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
