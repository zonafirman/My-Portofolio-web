import { ArrowUpRight } from "lucide-react";

export default function SocialLinks() {
  const links = [
    { name: "LINKEDIN", href: "https://linkedin.com" },
    { name: "GITHUB", href: "https://github.com" },
    { name: "INSTAGRAM", href: "https://instagram.com" },
    { name: "GMAIL", href: "mailto:yourname@gmail.com" },
  ];

  return (
    <div className="group flex items-center justify-start space-x-8">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/item flex items-center space-x-1 text-sm font-medium text-black transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
        >
          <span>{link.name}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/item:rotate-90" />
        </a>
      ))}
    </div>
  );
}
