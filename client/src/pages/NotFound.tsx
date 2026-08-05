import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="notfound-page min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
      <a href="/" className="notfound-brand">
        <img src="/ire-logo-gold-transparent.png" alt="IRE Homes" className="notfound-logo" />
      </a>

      <div className="notfound-hero">
        <p className="notfound-code">404</p>
        <div className="luxury-divider notfound-divider" />
        <h1 className="notfound-title">This Address Isn't On Our Books</h1>
        <p className="notfound-body">
          The page you're looking for may have moved, been renamed, or never existed.
        </p>

        <div className="notfound-links">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} className="notfound-link">
              <span>{link.label}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
