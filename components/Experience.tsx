"use client";

import React, { useRef } from "react";
import { content } from "@/config/content";
import { motion, useScroll, useTransform } from "framer-motion";

interface MilestoneOverride {
  title: string; org: string; period: string; desc: string;
}

interface ExperienceProps {
  heading?: string;
  subheading?: string;
  milestoneOverrides?: MilestoneOverride[];
}

export default function Experience({
  heading = "MY",
  subheading = "TIMELINE.",
  milestoneOverrides = [],
}: ExperienceProps) {
  const nodeColors = ["bg-neoyellow", "bg-neoblue", "bg-neopink"];
  const targetRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  // Merge: Notion overrides per slot, fall back to content.ts
  const milestones = content.milestones.map((def, i) => {
    const ov = milestoneOverrides[i];
    return {
      title:        (ov?.title)  || def.title,
      organization: (ov?.org)    || def.organization,
      period:       (ov?.period) || def.period,
      description:  (ov?.desc)   || def.description,
    };
  });

  return (
    <section id="experience" ref={targetRef} className="relative w-full bg-neocream h-[300vh] scroll-mt-[100px]">
      {/*
        CRITICAL STICKY FIX: Uses `sticky top-[100px] h-[calc(100vh-100px)]`
        to lock the viewport below the fixed navbar while the parent absorbs 300vh.
      */}
      <div className="sticky top-[100px] h-[calc(100vh-100px)] w-full flex flex-col justify-center overflow-hidden">

        <div className="absolute top-16 md:top-32 left-6 md:left-24 z-10">
          <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter leading-none text-neoblack">
            {heading} <br/>
            <span className="text-neogreen relative inline-block">
              {subheading}
              <div className="absolute bottom-1 left-0 w-full h-[6px] bg-neoblack rounded-full"></div>
            </span>
          </h2>
        </div>

        <motion.div style={{ x, willChange: "transform" }} className="flex h-full items-center w-[300vw] md:w-[200vw] px-6 md:px-24 transform-gpu">

          <div className="absolute top-1/2 left-0 w-full h-2 bg-neoblack -translate-y-1/2 z-0"></div>

          <div className="flex gap-16 md:gap-32 w-full h-full items-center pl-6 md:pl-96">
            {milestones.map((milestone, index) => {
              const nodeColor = nodeColors[index % nodeColors.length];
              return (
                <div key={index} className="relative flex flex-col justify-center min-w-[350px] md:min-w-[450px] z-10">
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-neo-black ${nodeColor} shadow-[2px_2px_0px_0px_#000] z-20`}></div>

                  <div className={`z-20 rounded-2xl border-neo-black bg-white p-8 shadow-neo-black cursor-pointer active-neo-press md:hover:-translate-y-2 transition-transform duration-200 ${index % 2 === 0 ? 'mb-64 md:mb-80' : 'mt-64 md:mt-80'}`}>
                    <div className="mb-4 inline-block rounded-full border-[3px] border-neoblack bg-neocream px-4 py-1 font-mono text-sm font-bold tracking-widest text-neoblack uppercase shadow-[2px_2px_0px_0px_#000]">
                      {milestone.period}
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none text-neoblack mt-2">
                      {milestone.title}
                    </h3>

                    <p className="mt-4 font-mono text-base font-bold text-neoblack uppercase opacity-70">
                      {milestone.organization}
                    </p>

                    <div className="mt-6 border-t-2 border-neoblack border-dashed pt-4">
                      <p className="font-body text-sm font-bold text-neoblack">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
