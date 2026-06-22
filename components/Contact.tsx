"use client";

import React, { useState } from "react";
import { buildSectionStyle } from "@/types/cms";
import type { SectionSettings } from "@/types/cms";

interface ContactProps {
  heading: string;
  cta: string;
  settings?: SectionSettings;
}

export default function Contact({ heading, cta, settings }: ContactProps) {
  const [focusState, setFocusState] = useState<string | null>(null);
  const sectionStyle = buildSectionStyle(settings);

  const getInputClass = (id: string) => {
    const isFocused = focusState === id;
    return `w-full border-neo-black p-4 font-body text-lg text-neoblack outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F0] transition-colors rounded-none placeholder:text-neoblack/40 z-20 relative ${isFocused ? "bg-neopink shadow-neo-black" : "bg-white"}`;
  };

  return (
    <section
      id="contact"
      style={sectionStyle}
      className="relative w-full bg-neocream py-32 px-6 scroll-mt-[100px]"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2
            style={{ fontSize: settings?.fontSizeDesktop || undefined }}
            className="font-display text-[clamp(4rem,10vw,8rem)] font-black uppercase tracking-tighter leading-none text-neoblack"
          >
            {heading}
          </h2>
        </div>

        <div className="rounded-3xl border-neo-black bg-neoblue p-8 shadow-neo-black md:p-12 relative z-10 overflow-hidden">
          <form className="flex flex-col gap-6 relative z-20">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-mono text-sm font-bold uppercase text-neoblack">IDENTIFIER // NAME</label>
              <input type="text" id="name" required suppressHydrationWarning className={getInputClass("name")} placeholder="YOUR NAME" onFocus={() => setFocusState("name")} onBlur={() => setFocusState(null)} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-mono text-sm font-bold uppercase text-neoblack">COORDINATES // EMAIL</label>
              <input type="email" id="email" required suppressHydrationWarning className={getInputClass("email")} placeholder="YOUR@EMAIL.COM" onFocus={() => setFocusState("email")} onBlur={() => setFocusState(null)} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 font-mono text-sm font-bold uppercase text-neoblack">PAYLOAD // MESSAGE</label>
              <textarea id="message" required suppressHydrationWarning rows={5} className={getInputClass("message") + " resize-none"} placeholder="ENTER SPECIFICATIONS..." onFocus={() => setFocusState("message")} onBlur={() => setFocusState(null)} />
            </div>
            <button type="submit" className="mt-6 border-neo-black bg-neoyellow p-6 rounded-2xl font-display text-2xl font-black uppercase text-neoblack shadow-neo-black active-neo-press z-20 w-full relative cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2">
              {cta}
            </button>
          </form>
          <div className="absolute -bottom-10 -right-10 h-40 w-40 border-neo-black bg-neogreen z-0 rotate-12" />
        </div>
      </div>
    </section>
  );
}
