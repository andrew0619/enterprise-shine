import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Building2,
  FlaskConical,
  Rocket,
  Landmark,
  ArrowRight,
  Check,
} from "lucide-react";

const solutions = [
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise AI",
    subtitle: "For large organizations",
    description:
      "Scale AI across your enterprise with dedicated infrastructure, custom integrations, and 24/7 support.",
    useCases: [
      "Large language model deployment",
      "Computer vision at scale",
      "Real-time recommendation systems",
      "Document processing & analysis",
    ],
    stats: { value: "500+", label: "Enterprise customers" },
  },
  {
    id: "research",
    icon: FlaskConical,
    title: "Research Labs",
    subtitle: "For academic & research teams",
    description:
      "Accelerate scientific discovery with access to cutting-edge GPU infrastructure and flexible compute options.",
    useCases: [
      "Foundation model training",
      "Scientific simulations",
      "Drug discovery & genomics",
      "Climate modeling",
    ],
    stats: { value: "100+", label: "Research papers published" },
  },
  {
    id: "startups",
    icon: Rocket,
    title: "Startups",
    subtitle: "For growing AI companies",
    description:
      "Build and scale your AI product with startup-friendly pricing, rapid provisioning, and expert support.",
    useCases: [
      "MVP to production in weeks",
      "Cost-efficient experimentation",
      "Rapid iteration & testing",
      "Seamless scaling",
    ],
    stats: { value: "1000+", label: "Startups accelerated" },
  },
  {
    id: "government",
    icon: Landmark,
    title: "Government",
    subtitle: "For public sector",
    description:
      "Secure, compliant AI infrastructure for government agencies with FedRAMP and other certifications.",
    useCases: [
      "Secure data processing",
      "Citizen services automation",
      "Defense & intelligence",
      "Public health initiatives",
    ],
    stats: { value: "50+", label: "Government deployments" },
  },
];

const SolutionsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solutions for Every Industry
            </h1>
            <p className="text-lg text-muted-foreground">
              Purpose-built AI infrastructure solutions tailored to your
              industry's unique challenges and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="space-y-12">
            {solutions.map((solution, index) => (
              <Card
                key={solution.id}
                id={solution.id}
                className="border border-card-border overflow-hidden"
              >
                <CardContent className="p-0">
                  <div
                    className={`grid lg:grid-cols-2 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <solution.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{solution.title}</h2>
                          <p className="text-sm text-muted-foreground">
                            {solution.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6">
                        {solution.description}
                      </p>

                      <h3 className="font-semibold mb-4">Common Use Cases</h3>
                      <ul className="space-y-3 mb-8">
                        {solution.useCases.map((useCase) => (
                          <li key={useCase} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-primary shrink-0" />
                            <span className="text-sm">{useCase}</span>
                          </li>
                        ))}
                      </ul>

                      <Button asChild>
                        <Link to="/contact">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    {/* Stats Panel */}
                    <div className="bg-primary/5 p-8 lg:p-12 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                          {solution.stats.value}
                        </div>
                        <div className="text-muted-foreground">
                          {solution.stats.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-muted-foreground mb-8">
              We work with organizations across all sectors. Let's discuss how
              NexusAI can support your unique needs.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Talk to an Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsPage;
