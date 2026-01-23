import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What GPU models do you offer?",
    answer:
      "We offer the latest NVIDIA GPUs including H100, A100, and L40S. All clusters are equipped with NVLink and InfiniBand for maximum performance in distributed training and inference workloads.",
  },
  {
    question: "How quickly can I deploy a new cluster?",
    answer:
      "Most clusters can be provisioned within hours, not weeks. Our automated infrastructure allows for rapid scaling based on your needs, with pre-configured environments for popular ML frameworks.",
  },
  {
    question: "What security certifications do you have?",
    answer:
      "We maintain SOC 2 Type II, HIPAA, and GDPR compliance. All data is encrypted at rest and in transit, with optional dedicated tenancy for maximum isolation.",
  },
  {
    question: "Can I bring my own models?",
    answer:
      "Absolutely. Our platform supports any model format including PyTorch, TensorFlow, and ONNX. We also provide optimized serving infrastructure for popular open-source models like Llama, Mistral, and more.",
  },
  {
    question: "How does billing work?",
    answer:
      "We offer flexible pricing including on-demand, reserved capacity, and committed use discounts. You only pay for the compute you use, with transparent pricing and no hidden fees.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-24 bg-secondary/30">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our GPU infrastructure platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
