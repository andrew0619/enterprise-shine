import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const plans = [
  {
    name: "Starter",
    description: "For individuals and small teams getting started with AI",
    price: "$0.80",
    unit: "per GPU hour",
    popular: false,
    features: [
      { text: "Up to 8 GPUs", tooltip: "A100 40GB" },
      { text: "Pay-as-you-go billing", tooltip: null },
      { text: "Community support", tooltip: null },
      { text: "Basic monitoring", tooltip: null },
      { text: "Standard SLA", tooltip: "99% uptime" },
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "For growing teams with production workloads",
    price: "$0.65",
    unit: "per GPU hour",
    popular: true,
    features: [
      { text: "Up to 64 GPUs", tooltip: "A100 80GB & H100" },
      { text: "Volume discounts", tooltip: "Up to 20% off" },
      { text: "Priority support", tooltip: "4-hour response time" },
      { text: "Advanced monitoring", tooltip: "Real-time metrics & alerts" },
      { text: "Enhanced SLA", tooltip: "99.5% uptime" },
      { text: "Custom environments", tooltip: null },
    ],
    cta: "Start Free Trial",
    ctaVariant: "default" as const,
  },
  {
    name: "Enterprise",
    description: "For organizations requiring dedicated infrastructure",
    price: "Custom",
    unit: "contact for pricing",
    popular: false,
    features: [
      { text: "Unlimited GPUs", tooltip: "Full H100 cluster access" },
      { text: "Committed use discounts", tooltip: "Up to 50% off" },
      { text: "Dedicated support", tooltip: "Named account manager" },
      { text: "Custom integrations", tooltip: null },
      { text: "Premium SLA", tooltip: "99.9% uptime with credits" },
      { text: "Single-tenant option", tooltip: null },
      { text: "Compliance support", tooltip: "HIPAA, SOC 2, GDPR" },
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
  },
];

const PricingPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              Pay only for what you use. No hidden fees, no surprise charges.
              Scale up or down anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105"
                    : "border-card-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {plan.unit}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm flex-1">{feature.text}</span>
                        {feature.tooltip && (
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-popover">
                              <p>{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={plan.ctaVariant}
                    className="w-full"
                  >
                    <Link to="/contact">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pricing FAQ
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-semibold mb-2">
                How does billing work?
              </h3>
              <p className="text-muted-foreground">
                You're billed monthly for the GPU hours used. We track usage in
                real-time and provide detailed breakdowns. No minimum
                commitments required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Can I switch plans?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade at any time. Changes take
                effect on your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                What GPUs are included?
              </h3>
              <p className="text-muted-foreground">
                We offer NVIDIA A100 (40GB and 80GB) and H100 GPUs. Enterprise
                plans can access dedicated H100 clusters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Do you offer reserved capacity?
              </h3>
              <p className="text-muted-foreground">
                Yes, Enterprise customers can reserve capacity for guaranteed
                availability with significant discounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need a Custom Quote?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our team can help design a pricing plan that fits your specific
              needs and budget.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Get Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;
