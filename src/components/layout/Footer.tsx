import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Youtube, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

// X (Twitter) icon component
const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialLinks = [
  { icon: XIcon, href: "https://twitter.com", label: "X" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
];

const Footer = () => {
  const { t } = useTranslation();

  const footerColumns = [
    {
      links: [
        { label: t("footer.gpuCloud"), href: "/products/gpu-compute" },
        { label: t("footer.clusterEngine"), href: "/products/cluster-engine" },
        { label: t("footer.inferenceEngine"), href: "/products/inference-engine" },
        { label: t("footer.pricing"), href: "/pricing" },
      ],
    },
    {
      links: [
        { label: t("footer.modelLibrary"), href: "/products/model-library" },
        { label: t("footer.glossary"), href: "/docs" },
        { label: t("footer.blog"), href: "/blog" },
        { label: t("footer.careers"), href: "/careers" },
      ],
    },
    {
      links: [
        { label: t("footer.aboutUs"), href: "/about" },
        { label: t("footer.partners"), href: "/partners" },
        { label: t("footer.contactUs"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column - Logo, Address, Social, Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl">NexusAI</span>
            </div>

            {/* Address */}
            <p className="text-muted-foreground text-sm">
              100 Innovation Way, San Francisco, CA 94105
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h3 className="text-base font-medium mb-4">{t("footer.subscribeNewsletter")}</h3>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("footer.enterEmail")}
                  className="w-full max-w-xs bg-muted-foreground/10 border-muted-foreground/30 text-background placeholder:text-muted-foreground"
                />
                <Button type="submit" className="shrink-0 px-6">
                  {t("common.subscribe")}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Columns - Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {footerColumns.map((column, idx) => (
              <ul key={idx} className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-background transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* Compliance Badges */}
          <div className="lg:col-span-2 flex lg:justify-end items-start">
            <div className="flex gap-3">
              {/* SOC 2 Type II Badge */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center border border-accent">
                <span className="text-[6px] text-accent-foreground font-bold text-center leading-tight">SOC 2<br/>Type II</span>
              </div>
              {/* SGS Badge */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center border border-destructive">
                <svg className="w-6 h-6 text-destructive-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              {/* AICPA SOC Badge */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center border border-primary">
                <span className="text-[6px] text-primary-foreground font-bold text-center leading-tight">AICPA<br/>SOC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 mt-12 border-t border-muted-foreground/20">
          <span className="text-sm text-muted-foreground">
            {t("footer.allRightsReserved")}
          </span>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-background transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
            <Link to="/terms" className="hover:text-background transition-colors">
              {t("footer.termsOfUse")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
