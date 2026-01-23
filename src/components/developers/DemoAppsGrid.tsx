import { useTranslation } from "react-i18next";
import DemoAppCard from "./DemoAppCard";

const DemoAppsGrid = () => {
  const { t } = useTranslation();

  const demoApps = [
    {
      titleKey: "developers.demoApps.ragChatbot.title",
      descriptionKey: "developers.demoApps.ragChatbot.description",
      tagKeys: [
        "developers.demoTags.rag",
        "developers.demoTags.chatbot",
        "developers.demoTags.qa",
        "developers.demoTags.pdfUpload",
        "developers.demoTags.multimedia",
        "developers.demoTags.knowledgeGrounding",
        "developers.demoTags.aiAssistant",
      ],
      mockupType: "chat" as const,
    },
    {
      titleKey: "developers.demoApps.deepResearch.title",
      descriptionKey: "developers.demoApps.deepResearch.description",
      tagKeys: [
        "developers.demoTags.research",
        "developers.demoTags.longContext",
        "developers.demoTags.summarization",
        "developers.demoTags.analysis",
        "developers.demoTags.citations",
        "developers.demoTags.multiDocument",
        "developers.demoTags.knowledgeSynthesis",
      ],
      mockupType: "form" as const,
    },
    {
      titleKey: "developers.demoApps.companyResearch.title",
      descriptionKey: "developers.demoApps.companyResearch.description",
      tagKeys: [
        "developers.demoTags.companyResearch",
        "developers.demoTags.businessIntelligence",
        "developers.demoTags.competitorAnalysis",
        "developers.demoTags.webGeneration",
        "developers.demoTags.salesEnablement",
        "developers.demoTags.marketResearch",
      ],
      mockupType: "agent" as const,
    },
  ];

  return (
    <section className="bg-white pb-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoApps.map((app) => (
            <DemoAppCard
              key={app.titleKey}
              title={t(app.titleKey)}
              description={t(app.descriptionKey)}
              tags={app.tagKeys.map((key) => t(key))}
              mockupType={app.mockupType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoAppsGrid;