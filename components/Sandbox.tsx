"use client";

import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface SandboxProps {
  elements?: any[];
  settings?: any;
}

export default function Sandbox({ elements = [], settings = {} }: SandboxProps) {
  // Apply sandbox-level settings dynamically
  const fontStyle = settings.customFont ? { fontFamily: `'${settings.customFont}', sans-serif` } : {};
  const bgStyle = settings.backgroundColor ? { backgroundColor: settings.backgroundColor } : {};
  const textStyle = settings.textColor ? { color: settings.textColor } : {};
  
  const alignMap: Record<string, string> = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };
  const alignmentClass = settings.alignment ? alignMap[settings.alignment] : "text-left items-start";

  return (
    <section 
      className={`w-full max-w-[1400px] mx-auto px-6 py-12 md:py-24 flex flex-col gap-12 ${alignmentClass}`}
      style={{ ...bgStyle, ...textStyle, ...fontStyle }}
    >
      <div className="w-full flex flex-wrap gap-8 justify-center">
        {elements.map((el: any) => {
          const key = el._key;

          switch (el._type) {
            case "sandboxTextBlock":
              return (
                <div key={key} className="w-full max-w-3xl border-neo-black bg-white p-8 shadow-neo-black rounded-2xl">
                  <p className="font-body text-lg leading-relaxed whitespace-pre-wrap text-neoblack">
                    {el.content}
                  </p>
                </div>
              );

            case "sandboxSingleMetric":
              return (
                <div key={key} className="border-neo-black bg-neoyellow p-6 shadow-neo-black rounded-xl text-center min-w-[250px]">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-neoblack opacity-70 mb-2">
                    {el.label}
                  </h4>
                  <p className="font-display text-4xl font-black text-neoblack">
                    {el.value}
                  </p>
                </div>
              );

            case "sandboxMediaCard":
              return (
                <div key={key} className="border-neo-black bg-white p-4 shadow-neo-black rounded-xl max-w-sm flex flex-col gap-4">
                  {el.image && (
                    <div className="w-full h-48 relative border-neo-black rounded-lg overflow-hidden bg-neogray/20">
                      <Image 
                        src={urlFor(el.image).url()} 
                        alt={el.title || "Media Card"} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  )}
                  {el.title && <h3 className="font-display font-black text-xl uppercase text-neoblack">{el.title}</h3>}
                </div>
              );

            case "sandboxProjectCard":
              return (
                <div key={key} className="border-neo-black bg-neopink text-white p-6 shadow-neo-black rounded-xl max-w-md flex flex-col gap-4">
                  {el.image && (
                    <div className="w-full h-56 relative border-neo-black rounded-lg overflow-hidden bg-neogray/20">
                      <Image 
                        src={urlFor(el.image).url()} 
                        alt={el.projectName || "Project Card"} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  )}
                  {el.projectName && <h3 className="font-display font-black text-2xl uppercase mt-2 text-white">{el.projectName}</h3>}
                  {el.description && <p className="font-body text-sm font-medium text-white/90">{el.description}</p>}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </section>
  );
}
