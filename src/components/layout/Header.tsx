import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/gpu-compute", label: "GPUs" },
  { href: "/studio", label: "Studio", isNew: true },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200",
        isScrolled && "shadow-md"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold text-heading">NexusAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5",
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
              {"isNew" in link && link.isNew && (
                <span className="bg-destructive text-destructive-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Globe className="h-4 w-4" />
                EN
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
              <DropdownMenuItem>日本語</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>

          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <div className="flex flex-col gap-6 mt-8">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary py-2 flex items-center gap-2",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                    {"isNew" in link && link.isNew && (
                      <span className="bg-destructive text-destructive-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="border-t pt-6 flex flex-col gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-primary"
                >
                  Login
                </Link>
                <Button asChild className="w-full">
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
