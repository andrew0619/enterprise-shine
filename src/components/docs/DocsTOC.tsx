import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  label: string;
}

const tocItems: TOCItem[] = [
  { id: "inference-engine", label: "Inference Engine" },
  { id: "cluster-engine", label: "Cluster Engine" },
  { id: "api-reference", label: "API Reference" },
  { id: "migration-guides", label: "Migration Guides" },
];

interface DocsTOCProps {
  className?: string;
}

const DocsTOC = ({ className }: DocsTOCProps) => {
  return (
    <aside className={cn("w-[200px] shrink-0", className)}>
      <nav className="sticky top-16 py-6 px-4">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          On this page
        </h4>
        <ul className="space-y-2">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors block py-1"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DocsTOC;
