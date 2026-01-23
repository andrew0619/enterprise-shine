import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  Accordion,
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

const AboutFAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("about.faq.q1.question", { defaultValue: "GMI Cloud 是什麼？" }),
      answer: t("about.faq.q1.answer", { defaultValue: "GMI Cloud 是一個專為 AI 工作負載設計的 GPU 雲端運算平台。我們提供 NVIDIA H100、H200 等高效能 GPU，支援大規模模型訓練、推論部署等各種 AI 應用場景。" }),
    },
    {
      question: t("about.faq.q2.question", { defaultValue: "如何開始使用 GMI Cloud？" }),
      answer: t("about.faq.q2.answer", { defaultValue: "您可以透過我們的網站註冊帳號，選擇適合的 GPU 方案，即可在幾分鐘內開始使用。我們的團隊也提供專業的導入諮詢服務，協助您規劃最佳的 AI 基礎設施方案。" }),
    },
    {
      question: t("about.faq.q3.question", { defaultValue: "GMI Cloud 的數據安全如何保障？" }),
      answer: t("about.faq.q3.answer", { defaultValue: "我們通過 SOC 2 Type II 認證，採用端到端加密、多層身份驗證、持續安全監控等措施。所有數據中心都符合國際安全標準，確保您的數據得到最高級別的保護。" }),
    },
    {
      question: t("about.faq.q4.question", { defaultValue: "支援哪些 AI 框架和工具？" }),
      answer: t("about.faq.q4.answer", { defaultValue: "GMI Cloud 支援所有主流 AI 框架，包括 PyTorch、TensorFlow、JAX 等。我們也提供預配置的開發環境和容器映像，讓您可以快速開始 AI 開發工作。" }),
    },
    {
      question: t("about.faq.q5.question", { defaultValue: "如何聯繫技術支援？" }),
      answer: t("about.faq.q5.answer", { defaultValue: "我們提供 24/7 全天候技術支援。您可以透過控制台提交工單、發送電子郵件，或直接與客戶經理聯繫。企業客戶還可享有專屬的技術顧問服務。" }),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            {t("about.faq.title", { defaultValue: "常見問題" })}
          </h2>
          <p className="text-muted-foreground">
            {t("about.faq.subtitle", { defaultValue: "對我們提供的服務有疑問嗎？請參閱以下常見問題" })}
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-b border-border"
            >
              <PlusAccordionTrigger className="text-heading hover:text-primary">
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

export default AboutFAQSection;
