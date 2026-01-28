import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutNewsSection = () => {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 1,
      title: t("about.news.article1.title", { defaultValue: "NexusAI 宣布擴展亞太區數據中心" }),
      date: "2024-01-15",
      image: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
      category: t("about.news.article1.category", { defaultValue: "公司新聞" }),
    },
    {
      id: 2,
      title: t("about.news.article2.title", { defaultValue: "全新雲端架構提升 AI 訓練效能 3 倍" }),
      date: "2024-01-10",
      image: "linear-gradient(135deg, #0066FF 0%, #00BFFF 50%, #87CEEB 100%)",
      category: t("about.news.article2.category", { defaultValue: "技術" }),
    },
    {
      id: 3,
      title: t("about.news.article3.title", { defaultValue: "AI 推論引擎正式上線：低延遲高吞吐量" }),
      date: "2024-01-05",
      image: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #d946ef 100%)",
      category: t("about.news.article3.category", { defaultValue: "產品更新" }),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-2">
              {t("about.news.kicker", { defaultValue: "最新消息" })}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading">
              {t("about.news.title", { defaultValue: "NexusAI 新聞" })}
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            {t("about.news.viewAll", { defaultValue: "查看所有文章" })}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              {/* Image */}
              <div 
                className="aspect-video w-full"
                style={{ background: item.image }}
              >
                {/* Decorative elements for visual interest */}
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <div className="w-16 h-16 border-2 border-white/50 rounded-lg transform rotate-12" />
                </div>
              </div>
              
              <CardContent className="p-5">
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-heading group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            {t("about.news.viewAll", { defaultValue: "查看所有文章" })}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutNewsSection;
