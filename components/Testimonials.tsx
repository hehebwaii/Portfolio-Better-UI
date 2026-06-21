"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";
import { useEsc } from "./ClientProvider";

interface TestimonialOverride {
  id: string; name: string; role: string; text: string;
}

interface TestimonialsProps {
  heading?: string;
  subheading?: string;
  subtext?: string;
  testimonialOverrides?: TestimonialOverride[];
}

export default function Testimonials({
  heading = "THE",
  subheading = "VAULT.",
  subtext = "ACCESS ENCRYPTED TESTIMONIALS",
  testimonialOverrides = [],
}: TestimonialsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { escPressed, resetEsc } = useEsc();

  useEffect(() => {
    if (escPressed && isOpen) {
      setIsOpen(false);
      resetEsc();
    }
  }, [escPressed, isOpen, resetEsc]);

  // Merge: Notion overrides replace defaults; fall back to content.ts
  const testimonials = testimonialOverrides.length > 0
    ? testimonialOverrides
    : content.testimonials;

  return (
    <section id="testimonials" className="relative w-full bg-neocream py-32 px-6 flex flex-col items-center scroll-mt-[100px]">
      <div className="mx-auto max-w-4xl w-full text-center mb-16">
        <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter text-neoblack">
          {heading} <br/>
          <span className="text-neopink relative inline-block">
            {subheading}
            <div className="absolute bottom-1 left-0 w-full h-[6px] bg-neoblack rounded-full"></div>
          </span>
        </h2>
        <p className="mt-4 font-mono font-bold text-sm text-neoblack opacity-60 uppercase tracking-widest">
          {subtext}
        </p>
      </div>

      <div
        className="relative z-20 cursor-pointer active-neo-press hover:scale-105 transition-transform group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[8px_8px_0px_#000]">
          <path d="M10 20C10 14.4772 14.4772 10 20 10H50L60 25H140C145.523 25 150 29.4772 150 35V100C150 105.523 145.523 110 140 110H20C14.4772 110 10 105.523 10 100V20Z" fill="#FACC15" stroke="black" strokeWidth="4"/>
          <motion.rect x="30" y="30" width="100" height="70" fill="#FFF" stroke="black" strokeWidth="4" animate={{ y: isOpen ? -30 : 0, rotate: isOpen ? 5 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />
          <motion.rect x="40" y="40" width="80" height="70" fill="#FF6B9E" stroke="black" strokeWidth="4" animate={{ y: isOpen ? -15 : 0, rotate: isOpen ? -5 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }} />
          <motion.path d="M10 40C10 34.4772 14.4772 30 20 30H140C145.523 30 150 34.4772 150 40V100C150 105.523 145.523 110 140 110H20C14.4772 110 10 105.523 10 100V40Z" fill="#10B981" stroke="black" strokeWidth="4" style={{ originY: "110px" }} animate={{ rotateX: isOpen ? -20 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />
        </svg>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs font-black text-neoblack bg-white px-3 py-1 border-2 border-neoblack rounded-full shadow-[2px_2px_0px_#000]">
          {isOpen ? "CLOSE_VAULT" : "OPEN_VAULT"}
        </div>
      </div>

      <div className="w-full max-w-5xl mt-24">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border-neo-black bg-white p-8 shadow-neo-black z-10 hover:-translate-y-2 transition-transform duration-200"
                >
                  <p className="font-body text-base font-bold text-neoblack leading-relaxed mb-8">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="border-t-4 border-neoblack pt-4 flex flex-col">
                    <span className="font-display text-xl font-black uppercase text-neoblack opacity-50">
                      {testimonial.name}
                    </span>
                    <span className="font-mono text-xs font-bold bg-neoyellow border-2 border-neoblack px-2 py-1 mt-2 self-start uppercase">
                      {testimonial.role}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
