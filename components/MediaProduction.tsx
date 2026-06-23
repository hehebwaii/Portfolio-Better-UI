"use client";

import React, { useState } from "react";
import Image from "next/image";
import { content } from "@/config/content";
import { Camera, Clapperboard, MonitorPlay } from "lucide-react";
import { buildSectionStyle } from "@/types/cms";
import type { SectionSettings } from "@/types/cms";
import MediaDeck from "./MediaDeck";

interface MediaOverride { title: string; desc: string; tags: string; imageUrl?: string; lqip?: string; }

interface MediaProductionProps {
  heading?: string;
  subheading?: string;
  mediaOverrides?: MediaOverride[];
  settings?: SectionSettings;
}

export default function MediaProduction({
  heading = "VISUALS &",
  subheading = "MOTION.",
  mediaOverrides = [],
  settings,
}: MediaProductionProps) {
  const [deckOpen, setDeckOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sectionStyle = buildSectionStyle(settings);
  const icons = [Camera, Clapperboard, MonitorPlay];
  const rotations = ["-rotate-2", "rotate-3", "-rotate-1"];
  const badgeColors = ["bg-neopink", "bg-neoyellow", "bg-neoblue"];

  const cards = content.mediaFocus.map((defaultItem, i) => {
    const override = mediaOverrides[i];
    return {
      icon: icons[i],
      rotation: rotations[i],
      badgeColor: badgeColors[i],
      title:       override?.title    || defaultItem.title,
      description: override?.desc     || defaultItem.description,
      imageUrl:    override?.imageUrl || "",
      lqip:        override?.lqip     || "",
      tags: override?.tags
        ? override.tags.split(",").map(t => t.trim()).filter(Boolean)
        : defaultItem.tags,
    };
  });

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setDeckOpen(true);
  };

  return (
    <section
      id="media"
      style={sectionStyle}
      className="relative w-full bg-neogreen py-32 px-6 overflow-hidden border-y-4 border-neoblack scroll-mt-[100px]"
    >
      {deckOpen && (
        <MediaDeck 
          media={cards} 
          initialIndex={activeIndex} 
          onClose={() => setDeckOpen(false)} 
        />
      )}

      <div className="mx-auto max-w-7xl relative z-10">
        <h2
          style={{ fontSize: settings?.fontSizeDesktop || undefined }}
          className="mb-16 font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter leading-none text-neoblack text-center"
        >
          {heading} <br />
          <span className="text-white relative inline-block">
            {subheading}
            <div className="absolute bottom-1 left-0 w-full h-[6px] bg-neoblack rounded-full" />
          </span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 mt-24">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                onClick={() => handleCardClick(idx)}
                className={`w-full max-w-sm rounded-2xl border-neo-black bg-white p-6 shadow-neo-black cursor-pointer active-neo-press z-20 md:hover:scale-105 transition-transform duration-200 ${card.rotation}`}
              >
                <div className="aspect-[4/5] w-full rounded-xl border-4 border-neoblack bg-neocream flex flex-col items-center justify-center relative overflow-hidden mb-6 pointer-events-none">
                  {card.imageUrl ? (
                    <Image src={card.imageUrl} alt={card.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 384px" />
                  ) : (
                    <>
                      <Icon className="h-16 w-16 text-neoblack/20" strokeWidth={2} />
                      <span className="font-mono text-xs font-bold text-neoblack mt-4 uppercase opacity-50">[ADD PHOTO URL]</span>
                    </>
                  )}
                  <div className={`absolute top-4 right-4 ${card.badgeColor} border-2 border-neoblack rounded-full px-3 py-1 font-mono text-xs font-black text-neoblack uppercase shadow-[2px_2px_0px_0px_#000] z-10`}>HQ</div>
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-tighter leading-none text-neoblack mb-2 pointer-events-none">{card.title}</h3>
                <p className="font-body text-base font-medium text-neoblack/80 mb-6 pointer-events-none">{card.description}</p>
                <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-neoblack border-dashed pointer-events-none">
                  {card.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="font-mono text-xs font-bold bg-neocream border-2 border-neoblack px-2 py-1 text-neoblack uppercase">{tag}</span>
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
