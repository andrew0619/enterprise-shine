import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const ClusterFAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("clusterEngine.faq.q1.question", { defaultValue: "What is Cluster Engine and how does it work?" }),
      answer: t("clusterEngine.faq.q1.answer", { defaultValue: "Cluster Engine is our enterprise-grade GPU cluster orchestration platform. It automates the deployment, scaling, and management of GPU clusters, integrating seamlessly with Kubernetes and other container orchestration tools to manage AI workloads at scale." }),
    },
    {
      question: t("clusterEngine.faq.q2.question", { defaultValue: "Does Cluster Engine support Kubernetes?" }),
      answer: t("clusterEngine.faq.q2.answer", { defaultValue: "Yes, Cluster Engine is built with native Kubernetes support. It extends Kubernetes with GPU-aware scheduling, automatic scaling, and specialized operators for AI/ML workloads including training jobs and inference endpoints." }),
    },
    {
      question: t("clusterEngine.faq.q3.question", { defaultValue: "How does auto-scaling work with GPU clusters?" }),
      answer: t("clusterEngine.faq.q3.answer", { defaultValue: "Our intelligent auto-scaling monitors workload metrics and automatically provisions or deprovisions GPU nodes based on demand. You can configure scaling policies, set minimum/maximum node counts, and define custom metrics for scaling decisions." }),
    },
    {
      question: t("clusterEngine.faq.q4.question", { defaultValue: "What monitoring and observability features are included?" }),
      answer: t("clusterEngine.faq.q4.answer", { defaultValue: "Cluster Engine includes built-in monitoring dashboards with real-time metrics for GPU utilization, memory usage, job progress, and cluster health. It integrates with Prometheus and Grafana for advanced observability and alerting." }),
    },
    {
      question: t("clusterEngine.faq.q5.question", { defaultValue: "Is Cluster Engine suitable for multi-tenant environments?" }),
      answer: t("clusterEngine.faq.q5.answer", { defaultValue: "Absolutely. Cluster Engine supports multi-tenancy with namespace isolation, resource quotas, and role-based access control (RBAC). Each team or project can have dedicated resources while sharing the underlying infrastructure efficiently." }),
    },
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container max-w-3xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("clusterEngine.faqTitle")}
          </h2>
          <p className="text-muted-foreground">
            {t("clusterEngine.faqSubtitle")}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border px-6"
            >
              <AccordionTrigger className="text-foreground font-medium text-left hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
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

export default ClusterFAQSection;
