"use client";

import React from "react";
import { content } from "@/config/content";
import { Cpu, Code, Camera, Video } from "lucide-react";

interface SkillsProps {
  skillOverrides?: string[];
}

export default function Skills({ skillOverrides = [] }: SkillsProps) {
  const baseSpecialties = content.specialties;
  // Merge: Notion overrides take priority, fill remaining slots from content.ts
  const specialties = baseSpecialties.map((s, i) => skillOverrides[i] || s);
  const badgeColors = ["bg-neoblue", "bg-neopink", "bg-neoyellow", "bg-neogreen"];
  const Icons = [Cpu, Code, Camera, Video];

  return (
    <section id="skills" className="relative w-full bg-neocream py-32 px-6 scroll-mt-[100px]">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter text-neoblack">
          WHAT I CAN DO <br/>
          <span className="text-neoblue relative inline-block">
            FOR YOU.
            <div className="absolute bottom-1 left-0 w-full h-[6px] bg-neoblack rounded-full"></div>
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
                
                <div>
                  <h3 className="font-display text-xl font-black uppercase leading-tight text-neoblack">
                    {specialty}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
