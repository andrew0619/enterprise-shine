import { useTranslation } from "react-i18next";
import DemoAppCard from "./DemoAppCard";

// Import demo app images
import demoChatImage from "@/assets/developers/demo-chat.jpg";
import demoResearchImage from "@/assets/developers/demo-research.jpg";
import demoAgentImage from "@/assets/developers/demo-agent.jpg";

const DemoAppsGrid = () => {
  const { t } = useTranslation();

  const demoApps = [
    {
      titleKey: "developers.demoAppsContent.ragChatbot.title",
      descriptionKey: "developers.demoAppsContent.ragChatbot.description",
      tagKeys: [
        "developers.demoTags.rag",
        "developers.demoTags.chatbot",
        "developers.demoTags.qa",
        "developers.demoTags.pdfUpload",
        "developers.demoTags.multimedia",
        "developers.demoTags.knowledgeGrounding",
        "developers.demoTags.aiAssistant",
      ],
      image: demoChatImage,
    },
    {
      titleKey: "developers.demoAppsContent.deepResearch.title",
      descriptionKey: "developers.demoAppsContent.deepResearch.description",
      tagKeys: [
        "developers.demoTags.research",
        "developers.demoTags.longContext",
        "developers.demoTags.summarization",
        "developers.demoTags.analysis",
        "developers.demoTags.citations",
        "developers.demoTags.multiDocument",
        "developers.demoTags.knowledgeSynthesis",
      ],
      image: demoResearchImage,
    },
    {
      titleKey: "developers.demoAppsContent.companyResearch.title",
      descriptionKey: "developers.demoAppsContent.companyResearch.description",
      tagKeys: [
        "developers.demoTags.companyResearch",
        "developers.demoTags.businessIntelligence",
        "developers.demoTags.competitorAnalysis",
        "developers.demoTags.webGeneration",
        "developers.demoTags.salesEnablement",
        "developers.demoTags.marketResearch",
      ],
      image: demoAgentImage,
    },
  ];

  return (
    <section className="bg-background pb-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoApps.map((app) => (
            <DemoAppCard
              key={app.titleKey}
              title={t(app.titleKey)}
              description={t(app.descriptionKey)}
              tags={app.tagKeys.map((key) => t(key))}
              image={app.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoAppsGrid;
