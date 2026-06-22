"use client";

import React from "react";
import { content } from "@/config/content";
import { Cpu, Code, Camera, Video } from "lucide-react";
import { buildSectionStyle } from "@/types/cms";
import type { SectionSettings } from "@/types/cms";

interface SkillsProps {
  heading?: string;
  subheading?: string;
  skillOverrides?: string[];
  settings?: SectionSettings;
}

export default function Skills({
  heading = "WHAT I CAN DO",
  subheading = "FOR YOU.",
  skillOverrides = [],
  settings,
}: SkillsProps) {
  const sectionStyle = buildSectionStyle(settings);
  const badgeColors = ["bg-neoblue", "bg-neopink", "bg-neoyellow", "bg-neogreen"];
  const Icons = [Cpu, Code, Camera, Video];
  const specialties = content.specialties.map((s, i) => skillOverrides[i] || s);

  return (
    <section
      id="skills"
      style={sectionStyle}
      className="relative w-full bg-neocream py-32 px-6 scroll-mt-[100px]"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          style={{ fontSize: settings?.fontSizeDesktop || undefined }}
          className="mb-16 font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter text-neoblack"
        >
          {heading} <br />
          <span className="text-neoblue relative inline-block">
            {subheading}
            <div className="absolute bottom-1 left-0 w-full h-[6px] bg-neoblack rounded-full" />
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((specialty, index) => {
            const Icon = Icons[index % Icons.length];
            const badgeColor = badgeColors[index % badgeColors.length];
            return (
              <div
                key={index}
                className="group relative z-20 flex cursor-pointer flex-col justify-between rounded-3xl border-neo-black bg-white p-8 shadow-neo-black active-neo-press"
              >
                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full border-neo-black ${badgeColor} shadow-[4px_4px_0px_0px_#000000] transition-transform duration-200 group-hover:-translate-y-2 group-hover:rotate-12`}>
                  <Icon className="h-8 w-8 text-neoblack" strokeWidth={3} />
                </div>
                <h3 className="font-display text-xl font-black uppercase leading-tight text-neoblack">
                  {specialty}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
