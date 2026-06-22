"use client";

import React, { useState } from "react";
import { content } from "@/config/content";
import { motion, AnimatePresence } from "framer-motion";
import { buildSectionStyle } from "@/types/cms";
import type { SectionSettings } from "@/types/cms";

interface ArchiveOverride { id: string; version: string; error: string; description: string; }

interface DeprecatedArchiveProps {
  heading?: string;
  subheading?: string;
  archiveOverrides?: ArchiveOverride[];
  settings?: SectionSettings;
}

export default function DeprecatedArchive({
  heading = "DEPRECATED",
  subheading = "ARCHITECTURES.",
  archiveOverrides = [],
  settings,
}: DeprecatedArchiveProps) {
  const sectionStyle = buildSectionStyle(settings);
  const archives = archiveOverrides.length > 0 ? archiveOverrides : content.deprecatedArchives;
  const [activeId, setActiveId] = useState<string>(archives[0]?.id || "arch1");
  const activeArchive = archives.find(a => a.id === activeId) || archives[0];

  return (
    <section
      id="archives"
      style={sectionStyle}
      className="relative w-full bg-neocream py-32 px-6 scroll-mt-[100px]"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          style={{ fontSize: settings?.fontSizeDesktop || undefined }}
          className="mb-16 font-display text-[clamp(2.5rem,5vw,4rem)] font-black uppercase tracking-tighter leading-none text-neoblack text-center md:text-left"
        >
          {heading} <br />
          <span className="text-neoblack bg-neoyellow px-4 inline-block border-neo-black shadow-neo-black -rotate-2 mt-2">
            {subheading}
          </span>
        </h2>

        <div className="w-full flex flex-col md:flex-row border-neo-black bg-white shadow-neo-black rounded-3xl overflow-hidden min-h-[500px]">
          <div className="w-full md:w-1/3 bg-neocream border-b-4 md:border-b-0 md:border-r-4 border-neoblack p-6 flex flex-col gap-4">
            <h3 className="font-mono text-sm font-black text-neoblack uppercase mb-4 border-b-2 border-neoblack pb-2">SELECT ARCHIVE</h3>
            {archives.map(archive => (
              <button
                key={archive.id}
                onClick={() => setActiveId(archive.id)}
                className={`w-full text-left p-4 border-neo-black font-mono text-sm font-bold uppercase transition-colors z-20 cursor-pointer active-neo-press outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 ${activeId === archive.id ? "bg-neoblack text-white shadow-[4px_4px_0px_0px_#FF6B9E]" : "bg-white text-neoblack shadow-[4px_4px_0px_0px_#000] md:hover:bg-neoyellow"}`}
              >
                [COMPILE_{archive.version}]
              </button>
            ))}
          </div>

          <div className="w-full md:w-2/3 bg-neoblue relative p-8 flex flex-col items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={activeArchive?.id} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.3 }} className="relative w-full max-w-md aspect-video border-neo-black bg-neoblack flex items-center justify-center p-4 rounded-xl shadow-[8px_8px_0px_0px_#000]">
                <div className="w-full h-full border-2 border-white/20 flex flex-col p-4 opacity-50 grayscale">
                  <div className="w-1/2 h-4 bg-white/40 mb-4" />
                  <div className="w-full h-24 bg-white/20 mb-4" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/40" />
                    <div className="w-8 h-8 rounded-full bg-white/40" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="border-4 border-neopink text-neopink font-display text-2xl md:text-3xl font-black uppercase p-4 -rotate-12 bg-neoblack/80 backdrop-blur-sm text-center shadow-[4px_4px_0px_0px_#FF6B9E]">
                    {activeArchive?.error}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div key={`${activeArchive?.id}-text`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-8 bg-white border-neo-black p-4 w-full max-w-md shadow-[4px_4px_0px_0px_#000]">
                <p className="font-body text-sm font-bold text-neoblack leading-relaxed">{activeArchive?.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
