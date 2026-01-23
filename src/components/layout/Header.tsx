import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "zh-TW", label: "繁體中文", shortLabel: "中文" },
  { code: "ja", label: "日本語", shortLabel: "日本語" },
  { code: "ko", label: "한국어", shortLabel: "한국어" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [gpusOpen, setGpusOpen] = useState(false);
  const [developersOpen, setDevelopersOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const location = useLocation();

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  const productsDropdown = [
    { href: "/products/gpu-compute", labelKey: "products.gpuCompute" },
    { href: "/products/cluster-engine", labelKey: "products.clusterEngine" },
    { href: "/products/inference-engine", labelKey: "products.inferenceEngine" },
    { href: "/products/model-library", labelKey: "products.modelLibrary" },
  ];

  const gpusDropdown = [
    { href: "/gpus/h200", labelKey: "gpus.h200" },
    { href: "/gpus/gb200", labelKey: "gpus.gb200" },
    { href: "/gpus/hgx-b200", labelKey: "gpus.hgxb200" },
  ];

  const developersDropdown = [
    { href: "/developers/demo-apps", labelKey: "developers.demoApps" },
    { href: "/docs", labelKey: "developers.docsHub" },
  ];

  const companyDropdown = [
    { href: "/about", labelKey: "company.aboutUs" },
    { href: "/blog", labelKey: "company.blog" },
    { href: "https://discord.com", labelKey: "company.discord", external: true },
    { href: "/partners", labelKey: "company.partners" },
    { href: "/careers", labelKey: "company.careers" },
  ];

  const simpleNavLinks = [
    { href: "/studio", labelKey: "nav.studio", isNew: true },
    { href: "/pricing", labelKey: "nav.pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const isProductsActive = productsDropdown.some(
    (item) => location.pathname === item.href
  );
  const isGpusActive = gpusDropdown.some(
    (item) => location.pathname === item.href
  );
  const isDevelopersActive = developersDropdown.some(
    (item) => location.pathname === item.href
  );
  const isCompanyActive = companyDropdown.some(
    (item) => !("external" in item) && location.pathname === item.href
  );

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
          {/* Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none",
                isProductsActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("nav.products")}
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover w-48">
              {productsDropdown.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "w-full cursor-pointer",
                      location.pathname === item.href && "text-primary"
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* GPUs Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none",
                isGpusActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("nav.gpus")}
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover w-52">
              {gpusDropdown.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "w-full cursor-pointer",
                      location.pathname === item.href && "text-primary"
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Simple Nav Links */}
          {simpleNavLinks.map((link) => (
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
              {t(link.labelKey)}
              {link.isNew && (
                <span className="bg-destructive text-destructive-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  {t("common.new")}
                </span>
              )}
            </Link>
          ))}

          {/* Developers Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none",
                isDevelopersActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("nav.developers")}
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover w-44">
              {developersDropdown.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "w-full cursor-pointer",
                      location.pathname === item.href && "text-primary"
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Company Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none",
                isCompanyActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("nav.company")}
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover w-44">
              {companyDropdown.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  {"external" in item && item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full cursor-pointer flex items-center gap-2"
                    >
                      {t(item.labelKey)}
                      <span className="text-xs text-muted-foreground">↗</span>
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === item.href && "text-primary"
                      )}
                    >
                      {t(item.labelKey)}
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Globe className="h-4 w-4" />
                {currentLanguage.shortLabel}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn(
                    "cursor-pointer",
                    i18n.language === lang.code && "text-primary font-medium"
                  )}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {t("nav.login")}
          </Link>

          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/contact">{t("nav.contactSales")}</Link>
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
            <div className="flex flex-col gap-4 mt-8">
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 pb-4 border-b">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <select
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent text-sm font-medium focus:outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              <nav className="flex flex-col gap-2">
                {/* Products Collapsible */}
                <Collapsible open={productsOpen} onOpenChange={setProductsOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium">
                    {t("nav.products")}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        productsOpen && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    {productsDropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block py-2 text-base transition-colors hover:text-primary",
                          location.pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* GPUs Collapsible */}
                <Collapsible open={gpusOpen} onOpenChange={setGpusOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium">
                    {t("nav.gpus")}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        gpusOpen && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    {gpusDropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block py-2 text-base transition-colors hover:text-primary",
                          location.pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Simple Links */}
                {simpleNavLinks.map((link) => (
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
                    {t(link.labelKey)}
                    {link.isNew && (
                      <span className="bg-destructive text-destructive-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        {t("common.new")}
                      </span>
                    )}
                  </Link>
                ))}

                {/* Developers Collapsible */}
                <Collapsible open={developersOpen} onOpenChange={setDevelopersOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium">
                    {t("nav.developers")}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        developersOpen && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    {developersDropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block py-2 text-base transition-colors hover:text-primary",
                          location.pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Company Collapsible */}
                <Collapsible open={companyOpen} onOpenChange={setCompanyOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium">
                    {t("nav.company")}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        companyOpen && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    {companyDropdown.map((item) =>
                      "external" in item && item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-base transition-colors hover:text-primary text-muted-foreground flex items-center gap-2"
                        >
                          {t(item.labelKey)}
                          <span className="text-xs">↗</span>
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "block py-2 text-base transition-colors hover:text-primary",
                            location.pathname === item.href
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          {t(item.labelKey)}
                        </Link>
                      )
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </nav>

              <div className="border-t pt-6 flex flex-col gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-primary"
                >
                  {t("nav.login")}
                </Link>
                <Button asChild className="w-full">
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {t("nav.contactSales")}
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
