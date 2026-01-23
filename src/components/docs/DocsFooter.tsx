import { Link } from "react-router-dom";
import { MessageCircle, Twitter, Github, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const DocsFooter = () => {
  return (
    <footer className="border-t border-border py-6 px-6">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Powered by */}
        <div className="text-sm text-slate-400">
          Powered by{" "}
          <Link to="/" className="text-slate-600 hover:text-slate-900 font-medium">
            NexusAI
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default DocsFooter;
