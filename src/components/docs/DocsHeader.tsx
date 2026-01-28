import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, Moon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import DocsSidebar from "./DocsSidebar";

const topNavLinks = [
  { href: "/docs", label: "Guides" },
  { href: "/products/inference-engine", label: "Inference Engine" },
  { href: "/products/cluster-engine", label: "Cluster Engine" },
  { href: "/docs/api-reference", label: "API reference" },
  { href: "/docs/migration", label: "Migration" },
  { href: "/studio", label: "NexusAI Studio" },
];

const DocsHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold text-heading hidden sm:inline">NexusAI</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search..."
              className="pl-9 pr-12 h-9 bg-slate-50 border-slate-200 text-sm"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="text-sm text-slate-600 hover:text-slate-900 hidden lg:inline"
          >
            Support
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">NexusAI</Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Moon className="h-4 w-4" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="font-semibold">Documentation</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DocsSidebar className="w-full border-r-0" />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Secondary Navigation */}
      <nav className="hidden lg:flex h-10 items-center gap-6 px-6 border-t border-border bg-slate-50/50">
        {topNavLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "text-sm font-medium transition-colors",
              location.pathname === link.href
                ? "text-slate-900 border-b-2 border-slate-900 -mb-[1px] pb-2"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default DocsHeader;
