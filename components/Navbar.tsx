"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

interface NavItem {
  _key?: string;
  label: string;
  targetId: string;
}

interface NavbarProps {
  brand: string;
  contactLabel: string;
  navItems?: NavItem[];
  resumeUrl?: string | null;
}

export default function Navbar({ brand, contactLabel, navItems = [], resumeUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-4 transition-colors duration-300 ${
        scrolled ? "bg-neocream/90 backdrop-blur-sm border-b-4 border-neoblack" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <div className="text-neoblack font-display font-black text-2xl tracking-tighter lowercase z-10 relative">
          {brand}
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center justify-center gap-8 font-mono text-sm font-bold z-10 relative">
          {navItems && navItems.map((link) => (
            <a
              key={link._key || link.label}
              href={`#${link.targetId}`}
              className="text-neoblack md:hover:text-neopink md:hover:-translate-y-1 transition-transform duration-75 uppercase tracking-widest z-20 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F0]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 z-20 border-neo-black bg-white px-4 py-3 rounded-full font-mono text-sm font-black text-neoblack uppercase active-neo-press shadow-neo-black cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F0]"
            >
              <Download size={16} strokeWidth={3} /> RESUME
            </a>
          )}
          
          <a
            href="#contact"
            className="hidden md:inline-block z-20 border-neo-black bg-neoyellow px-6 py-3 rounded-full font-mono text-sm font-black text-neoblack uppercase active-neo-press shadow-neo-black cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F0]"
          >
            {contactLabel}
          </a>
        </div>
      </div>
    </nav>
  );
}
