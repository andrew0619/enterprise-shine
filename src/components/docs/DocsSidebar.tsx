import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ExternalLink, FileText } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  isExternal?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "",
    items: [
      { label: "Official Website", href: "/", isExternal: true },
      { label: "Blog", href: "/about", isExternal: true },
    ],
  },
  {
    title: "Getting started",
    items: [
      { label: "Welcome to GMI Cloud", href: "/docs", isActive: true },
      { label: "What We Do", href: "/docs/what-we-do" },
      { label: "Our Features", href: "/docs/features" },
    ],
  },
  {
    title: "General Information",
    items: [
      { label: "Privacy", href: "/docs/privacy" },
    ],
  },
];

interface DocsSidebarProps {
  className?: string;
}

const DocsSidebar = ({ className }: DocsSidebarProps) => {
  return (
    <aside className={cn("w-[280px] shrink-0 border-r border-border", className)}>
      <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 px-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {section.title && (
              <h4 className="text-sm font-semibold text-slate-900 mb-2 px-3">
                {section.title}
              </h4>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                      item.isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    {item.isExternal && (
                      <FileText className="h-4 w-4 text-slate-400" />
                    )}
                    {item.label}
                    {item.isExternal && (
                      <ExternalLink className="h-3 w-3 ml-auto text-slate-400" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DocsSidebar;
