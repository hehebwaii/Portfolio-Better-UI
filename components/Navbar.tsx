"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "TESTIMONIALS", href: "#testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-4 transition-colors duration-300 ${
        scrolled ? "bg-neocream/90 backdrop-blur-sm border-b-4 border-neoblack" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* Left Bound */}
        <div className="text-neoblack font-display font-black text-2xl tracking-tighter lowercase z-10 relative">
          niranjan.digital
        </div>

        {/* Center Bound */}
        <div className="hidden md:flex items-center justify-center gap-8 font-mono text-sm font-bold z-10 relative">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-neoblack md:hover:text-neopink md:hover:-translate-y-1 transition-transform duration-75 uppercase tracking-widest z-20 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F0]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Bound */}
        <a
          href="#contact"
          className="hidden md:inline-block z-20 border-neo-black bg-neoyellow px-6 py-3 rounded-full font-mono text-sm font-black text-neoblack uppercase active-neo-press shadow-neo-black cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F0]"
        >
          SAY HELLO
        </a>
        
        {/* Mobile Bound */}
        <button className="md:hidden z-20 border-neo-black bg-neoyellow px-4 py-2 rounded-full font-mono text-sm font-black text-neoblack uppercase active-neo-press shadow-neo-black cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F0]">
          MENU
        </button>
      </div>
    </nav>
  );
}
