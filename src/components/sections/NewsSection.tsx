import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import postDatacenter from "@/assets/blog/post-datacenter.jpg";
import postAiNetwork from "@/assets/blog/post-ai-network.jpg";
import postTeam from "@/assets/blog/post-team.jpg";

const articles = [
  {
    id: 1,
    title: "Scaling AI Infrastructure: Lessons from 10,000 GPUs",
    excerpt:
      "How enterprise teams are managing GPU clusters at unprecedented scale.",
    date: "Jan 15, 2026",
    category: "Engineering",
    categoryColor: "bg-primary",
    image: postDatacenter,
  },
  {
    id: 2,
    title: "The Future of Inference: H100 vs A100 Benchmarks",
    excerpt:
      "Real-world performance comparisons for production AI workloads.",
    date: "Jan 12, 2026",
    category: "Research",
    categoryColor: "bg-purple-500",
    image: postAiNetwork,
  },
  {
    id: 3,
    title: "Cost Optimization Strategies for AI Teams",
    excerpt:
      "Practical tips to reduce your GPU infrastructure costs by up to 50%.",
    date: "Jan 8, 2026",
    category: "Business",
    categoryColor: "bg-green-500",
    image: postTeam,
  },
];

const NewsSection = () => {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest in AI infrastructure and GPU computing.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center text-primary font-medium hover:underline"
          >
            View all articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 ${article.categoryColor} text-white text-xs font-medium rounded-full`}>
                    {article.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <span className="text-xs text-muted-foreground">
                  {article.date}
                </span>
                <h3 className="text-lg font-semibold mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            View all articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
