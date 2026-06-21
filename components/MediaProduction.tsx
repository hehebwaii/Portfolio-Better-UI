"use client";

import React from "react";
import { content } from "@/config/content";
import { Camera, Clapperboard, MonitorPlay } from "lucide-react";

export default function MediaProduction() {
  const cards = [
    {
      icon: Camera,
      data: content.mediaFocus[0],
      rotation: "-rotate-2",
      badgeColor: "bg-neopink"
    },
    {
      icon: Clapperboard,
      data: content.mediaFocus[1],
      rotation: "rotate-3",
      badgeColor: "bg-neoyellow"
    },
    {
      icon: MonitorPlay,
      data: content.mediaFocus[2],
      rotation: "-rotate-1",
      badgeColor: "bg-neoblue"
    }
  ];

  return (
    <section id="media" className="relative w-full bg-neogreen py-32 px-6 overflow-hidden border-y-4 border-neoblack scroll-mt-[100px]">
      <div className="mx-auto max-w-7xl relative z-10">
        <h2 className="mb-16 font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter leading-none text-neoblack text-center">
          VISUALS & <br/>
          <span className="text-white relative inline-block">
            MOTION.
            <div className="absolute bottom-1 left-0 w-full h-[6px] bg-neoblack rounded-full"></div>
          </span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 mt-24">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                className={`w-full max-w-sm rounded-2xl border-neo-black bg-white p-6 shadow-neo-black cursor-pointer active-neo-press z-20 md:hover:scale-105 transition-transform duration-200 ${card.rotation}`}
              >
                <div className="aspect-[4/5] w-full rounded-xl border-4 border-neoblack bg-neocream flex flex-col items-center justify-center relative overflow-hidden mb-6">
                  <Icon className="h-16 w-16 text-neoblack/20" strokeWidth={2} />
                  <span className="font-mono text-xs font-bold text-neoblack mt-4 uppercase opacity-50">
                    [RENDER PREVIEW]
                  </span>
                  
                  <div className={`absolute top-4 right-4 ${card.badgeColor} border-2 border-neoblack rounded-full px-3 py-1 font-mono text-xs font-black text-neoblack uppercase shadow-[2px_2px_0px_0px_#000]`}>
                    HQ
                  </div>
                </div>

                <h3 className="font-display text-2xl font-black uppercase tracking-tighter leading-none text-neoblack mb-2">
                  {card.data.title}
                </h3>
                <p className="font-body text-base font-medium text-neoblack/80 mb-6">
                  {card.data.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-neoblack border-dashed">
                  {card.data.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="font-mono text-xs font-bold bg-neocream border-2 border-neoblack px-2 py-1 text-neoblack uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
