import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Cluster Engine and how does it work?",
    answer:
      "Cluster Engine is our enterprise-grade GPU cluster orchestration platform. It automates the deployment, scaling, and management of GPU clusters, integrating seamlessly with Kubernetes and other container orchestration tools to manage AI workloads at scale.",
  },
  {
    question: "Does Cluster Engine support Kubernetes?",
    answer:
      "Yes, Cluster Engine is built with native Kubernetes support. It extends Kubernetes with GPU-aware scheduling, automatic scaling, and specialized operators for AI/ML workloads including training jobs and inference endpoints.",
  },
  {
    question: "How does auto-scaling work with GPU clusters?",
    answer:
      "Our intelligent auto-scaling monitors workload metrics and automatically provisions or deprovisions GPU nodes based on demand. You can configure scaling policies, set minimum/maximum node counts, and define custom metrics for scaling decisions.",
  },
  {
    question: "What monitoring and observability features are included?",
    answer:
      "Cluster Engine includes built-in monitoring dashboards with real-time metrics for GPU utilization, memory usage, job progress, and cluster health. It integrates with Prometheus and Grafana for advanced observability and alerting.",
  },
  {
    question: "Is Cluster Engine suitable for multi-tenant environments?",
    answer:
      "Absolutely. Cluster Engine supports multi-tenancy with namespace isolation, resource quotas, and role-based access control (RBAC). Each team or project can have dedicated resources while sharing the underlying infrastructure efficiently.",
  },
];

const ClusterFAQSection = () => {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container max-w-3xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about Cluster Engine
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
