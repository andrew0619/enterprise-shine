import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the NexusAI Cloud Inference Engine?",
    answer:
      "The Inference Engine is our managed platform for deploying and scaling AI models in production. It handles all the infrastructure complexity so you can focus on building great AI applications. Deploy pre-trained models or bring your own with minimal configuration.",
  },
  {
    question: "How fast is deployment and how much latency to expect?",
    answer:
      "Deployment typically takes under 2 minutes for pre-built models. For latency, most models achieve sub-100ms inference times, with optimized models like Llama 2 reaching as low as 30-50ms for typical requests. Cold starts are minimized through intelligent caching.",
  },
  {
    question: "How does it optimize performance and cost?",
    answer:
      "Our engine uses GPU batching, model caching, and intelligent request routing to maximize throughput while minimizing costs. Auto-scaling ensures you only pay for what you use, scaling down to zero when there's no traffic.",
  },
  {
    question: "How does auto-scaling handle fluctuating traffic?",
    answer:
      "The auto-scaler monitors request queue depth, latency, and GPU utilization in real-time. When traffic spikes, new replicas spin up in seconds. During quiet periods, resources scale down automatically. You can configure min/max replicas and custom scaling triggers.",
  },
  {
    question: "Do I get built-in monitoring and operational insights?",
    answer:
      "Yes! Every deployment includes a comprehensive dashboard with real-time metrics: latency percentiles, throughput, error rates, GPU utilization, and cost tracking. Set up alerts for anomalies and export data to your observability stack.",
  },
];

const InferenceFAQSection = () => {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container max-w-3xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground">
            Get quick answers to common questions about Inference Engine
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

export default InferenceFAQSection;
