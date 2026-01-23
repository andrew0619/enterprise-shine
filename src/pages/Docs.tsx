import DocsHeader from "@/components/docs/DocsHeader";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsContent from "@/components/docs/DocsContent";
import DocsTOC from "@/components/docs/DocsTOC";
import DocsFooter from "@/components/docs/DocsFooter";

const Docs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DocsHeader />
      
      <div className="flex flex-1">
        {/* Left Sidebar - hidden on mobile/tablet */}
        <DocsSidebar className="hidden lg:block" />

        {/* Main Content */}
        <DocsContent />

        {/* Right TOC - hidden on mobile/tablet */}
        <DocsTOC className="hidden xl:block" />
      </div>

      <DocsFooter />
    </div>
  );
};

export default Docs;
