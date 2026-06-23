"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HeroCanvasWrapper from "./HeroCanvasWrapper";
import { buildSectionStyle } from "@/types/cms";
import type { SectionSettings } from "@/types/cms";

interface HeroProps {
  headline: string;
  subtext: string;
  cta: string;
  photoUrl?: string;
  settings?: SectionSettings;
}

export default function Hero({ headline, subtext, cta, photoUrl, settings }: HeroProps) {
  const sectionStyle = buildSectionStyle(settings);
  
  const animType = settings?.entryAnimation || "fade-up";
  
  const variants: any = {
    hidden: { 
      opacity: 0, 
      y: animType === "fade-up" ? 50 : 0, 
      scale: animType === "brutalist-slam" ? 1.5 : 1 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: animType === "brutalist-slam" ? "spring" : "tween",
        stiffness: 200, 
        damping: 15,
        ...(animType === "fade-up" ? { duration: 0.8 } : {})
      }
    }
  };

  return (
    <section
      id="hero"
      style={sectionStyle}
      className="relative flex min-h-screen w-full items-center justify-center bg-transparent px-6 pt-32 pb-16 lg:py-0"
    >
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants}
        className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div className="relative z-10 flex w-full flex-col items-start justify-center">
          {headline && (
            <h1
              style={{ fontSize: settings?.fontSizeDesktop || undefined }}
              className="relative z-10 font-display text-[clamp(3.5rem,6vw,7.5rem)] font-black leading-none tracking-tighter uppercase mb-8"
            >
              {headline}
            </h1>
          )}

          {subtext && (
            <p className="relative z-10 font-body text-xl font-medium opacity-80 mb-12 max-w-xl">
              {subtext}
            </p>
          )}

          {cta && (
            <a
              href="#projects"
              className="relative z-20 inline-block border-neo-black bg-neoyellow px-8 py-4 rounded-2xl font-display text-2xl font-black text-neoblack uppercase active-neo-press shadow-neo-black cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {cta}
            </a>
          )}
        </div>

        <div className="relative z-10 flex w-full items-center justify-center h-[500px] lg:h-[600px]">
          {photoUrl ? (
            <div className="relative w-full h-full max-w-[420px]">
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-neoyellow border-4 border-neoblack rounded-3xl z-0" />
              <div className="relative z-10 w-full h-full border-4 border-neoblack rounded-3xl overflow-hidden bg-neocream">
                <Image
                  src={photoUrl}
                  alt="Profile photo"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 z-20 bg-neopink border-4 border-neoblack rounded-full px-4 py-2 font-mono text-xs font-black text-neoblack uppercase shadow-[4px_4px_0px_0px_#000] rotate-3">
                ONLINE ●
              </div>
            </div>
          ) : (
            <HeroCanvasWrapper />
          )}
        </div>

      </motion.div>
    </section>
  );
}
