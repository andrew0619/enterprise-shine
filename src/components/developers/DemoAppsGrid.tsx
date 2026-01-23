import DemoAppCard from "./DemoAppCard";

const demoApps = [
  {
    title: "Multimodal RAG Chatbot",
    description: "Intelligent multimodal RAG chatbot granting natural Q&A capabilities, generated answers, and interactive visuals for Q&A, summarization, and multimedia workflows.",
    tags: ["RAG", "Chatbot", "Q&A", "PDF Upload", "Multimedia", "Knowledge Grounding", "AI Assistant"],
    mockupType: "chat" as const,
  },
  {
    title: "Deep Research Agent",
    description: "Long-context agent analyzing sources and producing a structured, citation-based report — a shortcut reasoning for complex research.",
    tags: ["Research", "Long Context", "Summarization", "Analysis", "Citations", "Multi-Document", "Knowledge Synthesis"],
    mockupType: "form" as const,
  },
  {
    title: "Company Research Agent",
    description: "Specialized agent for company analysis, synthesizing funding, products, competitors, and market position into a narrative basis for business growth.",
    tags: ["Company Research", "Business Intelligence", "Competitor Analysis", "Web Generation", "Sales Enablement", "Market Research"],
    mockupType: "agent" as const,
  },
];

const DemoAppsGrid = () => {
  return (
    <section className="bg-white pb-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoApps.map((app) => (
            <DemoAppCard
              key={app.title}
              title={app.title}
              description={app.description}
              tags={app.tags}
              mockupType={app.mockupType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoAppsGrid;
