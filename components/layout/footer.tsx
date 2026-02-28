import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ocean-deep text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Logo variant="white" />
            </Link>
            <p className="text-white/70 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-turquoise transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">
              Service Hours
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4 text-turquoise" />
                <span>Reception: 7AM - 12AM</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4 text-turquoise" />
                <span>Restaurant: 7AM - 12AM</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4 text-turquoise" />
                <span>Tours: 8AM - 6PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-turquoise shrink-0" />
                <span className="text-white/70">
                  {siteConfig.address.island}
                  <br />
                  {siteConfig.address.atoll}
                  <br />
                  {siteConfig.address.country}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-white/70 hover:text-turquoise transition-colors"
                >
                  <Phone className="w-5 h-5 text-turquoise" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone2}`}
                  className="flex items-center gap-3 text-white/70 hover:text-turquoise transition-colors"
                >
                  <Phone className="w-5 h-5 text-turquoise" />
                  {siteConfig.phone2}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-turquoise transition-colors"
                >
                  <Mail className="w-5 h-5 text-turquoise" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p>Hiyaavahi, Rasdhoo, Alifu Alifu Atoll, Republic of Maldives 🇲🇻</p>
        </div>
      </div>
    </footer>
  );
}
