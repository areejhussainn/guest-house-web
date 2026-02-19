"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ?
            "bg-white/90 backdrop-blur-lg shadow-sm"
          : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Logo
                  variant={isScrolled ? "dark" : "white"}
                  className="transition-all duration-300"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-medium transition-colors duration-300 hover:text-turquoise",
                    isScrolled ? "text-foreground" : "text-white",
                  )}
                >
                  <span>{link.label}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-turquoise"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className={cn(
                  "flex items-center gap-2 text-sm transition-colors",
                  isScrolled ? "text-foreground" : "text-white",
                )}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">{siteConfig.phone}</span>
              </a>
              <Button
                asChild
                className="bg-coral hover:bg-coral/90 text-white rounded-full px-6"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-10 p-2 transition-colors",
                isScrolled || isMobileMenuOpen ? "text-foreground" : (
                  "text-white"
                ),
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ?
                <X className="w-6 h-6" />
              : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[85vw] max-w-80 bg-white shadow-xl"
            >
              <div className="flex flex-col p-6 sm:p-8 pt-20 sm:pt-24">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-lg font-medium text-foreground hover:text-ocean transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-8 border-t"
                >
                  <Button
                    asChild
                    className="w-full bg-coral hover:bg-coral/90 text-white rounded-full"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </Button>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center justify-center gap-2 mt-4 text-muted-foreground"
                  >
                    <Phone className="w-4 h-4" />
                    {siteConfig.phone}
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
