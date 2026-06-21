"use client";

import React from "react";
import { content } from "@/config/content";

interface ProjectsProps {
  heading?: string;
  subheading?: string;
  p1Event?: string;
  p1Name?: string;
  p1Description?: string;
  p1Tech?: string[];
  p2Tag?: string;
  p2Name?: string;
  p2Description?: string;
}

export default function Projects({
  heading = "SELECTED",
  subheading = "WORKS.",
  p1Event = "",
  p1Name = "",
  p1Description = "",
  p1Tech = [],
  p2Tag = "R&D STAGE",
  p2Name = "[UNANNOUNCED]",
  p2Description = "Next-generation integrated hardware & frontend systems prototype currently in internal development.",
}: ProjectsProps) {

  // Merge with content.ts defaults if Notion keys are empty
  const project1Event       = p1Event       || content.coreProject.event;
  const project1Name        = p1Name        || content.coreProject.name;
  const project1Description = p1Description || content.coreProject.description;
  const project1Tech        = p1Tech.length  > 0 ? p1Tech : content.coreProject.tech;

  return (
    <section id="projects" className="relative w-full bg-neocream py-32 px-6 scroll-mt-[100px]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-black uppercase tracking-tighter text-neoblack">
            {heading} <br/>
            <span className="text-neoyellow relative inline-block">
              {subheading}
              <div className="absolute bottom-1 left-0 w-full h-[6px] bg-neoblack rounded-full"></div>
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-16">

          {/* Project 1 — Core Project */}
          <div className="group relative z-20 border-neo-black bg-white shadow-neo-black rounded-3xl overflow-hidden cursor-pointer active-neo-press">
            <div className="flex w-full flex-col lg:flex-row">
              <div className="flex flex-col justify-between p-8 lg:w-1/2 lg:p-12 relative z-10 bg-white">
                <div>
                  <div className="mb-6 inline-block rounded-full border-neo-black bg-neopink px-4 py-1 shadow-[2px_2px_0px_0px_#000]">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase text-neoblack">
                      {project1Event}
                    </span>
                  </div>
                  <h3 className="font-display text-4xl font-black uppercase md:text-6xl text-neoblack">
                    {project1Name}
                  </h3>
                  <p className="mt-6 font-body text-xl font-medium text-neoblack">
                    {project1Description}
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap gap-3">
                  {project1Tech.map((tech, i) => (
                    <div
                      key={i}
                      className="rounded-full border-[3px] border-neoblack bg-white px-4 py-2 font-mono text-sm font-bold uppercase text-neoblack shadow-[2px_2px_0px_0px_#000]"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex min-h-[300px] lg:min-h-full items-center justify-center border-t-4 border-neoblack lg:border-t-0 lg:border-l-4 lg:w-1/2 bg-neogreen p-8 overflow-hidden z-0">
                <div className="absolute top-8 right-8 h-12 w-12 rounded-full border-neo-black bg-neoyellow shadow-[4px_4px_0px_0px_#000]"></div>
                <div className="absolute bottom-8 left-8 h-16 w-16 border-neo-black bg-neoblue shadow-[4px_4px_0px_0px_#000] rotate-12"></div>
                <div className="w-[80%] rounded-2xl border-neo-black bg-white p-6 shadow-neo-black z-10 hover:-translate-y-2 transition-transform duration-200">
                  <div className="mb-4 flex gap-2 border-b-4 border-neoblack pb-4">
                    <div className="h-4 w-4 rounded-full border-2 border-neoblack bg-neopink"></div>
                    <div className="h-4 w-4 rounded-full border-2 border-neoblack bg-neoyellow"></div>
                    <div className="h-4 w-4 rounded-full border-2 border-neoblack bg-neoblue"></div>
                  </div>
                  <div className="font-mono text-sm font-bold leading-relaxed text-neoblack">
                    &gt; REACT COMPILER: ACTIVE<br/>
                    &gt; FIRESTORE CONN: OK<br/>
                    &gt; ECO-ENGINE: RUNNING
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 — Unannounced / R&D */}
          <div className="group relative z-20 border-neo-black bg-white shadow-neo-black rounded-3xl overflow-hidden cursor-pointer active-neo-press">
            <div className="flex w-full flex-col lg:flex-row-reverse">
              <div className="flex flex-col justify-between p-8 lg:w-1/2 lg:p-12 relative z-10 bg-white border-b-4 lg:border-b-0 lg:border-l-4 border-neoblack">
                <div>
                  <div className="mb-6 inline-block rounded-full border-neo-black bg-neoyellow px-4 py-1 shadow-[2px_2px_0px_0px_#000]">
                    <span className="font-mono text-xs font-bold tracking-widest uppercase text-neoblack">
                      {p2Tag}
                    </span>
                  </div>
                  <h3 className="font-display text-4xl font-black uppercase md:text-6xl text-neoblack opacity-50">
                    {p2Name}
                  </h3>
                  <p className="mt-6 font-body text-xl font-medium text-neoblack/70">
                    {p2Description}
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap gap-3">
                  <div className="rounded-full border-[3px] border-neoblack bg-neocream px-4 py-2 font-mono text-sm font-bold uppercase text-neoblack opacity-70">
                    CLASSIFIED TECH
                  </div>
                </div>
              </div>

              <div className="relative flex min-h-[300px] lg:min-h-full items-center justify-center lg:w-1/2 bg-neoblue p-8 overflow-hidden z-0">
                <div className="font-mono text-4xl font-black text-neoblack opacity-20">???</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
