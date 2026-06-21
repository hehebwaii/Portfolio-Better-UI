"use client";

import React from "react";
import HeroCanvasWrapper from "./HeroCanvasWrapper";

interface HeroProps {
  headline: string;
  subtext: string;
}

export default function Hero({ headline, subtext }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative flex min-h-screen w-full items-center justify-center bg-neocream px-6 pt-32 pb-16 lg:py-0"
    >
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Typography & CTA */}
        <div className="relative z-10 flex w-full flex-col items-start justify-center">
          <h1 className="relative z-10 font-display text-[clamp(3.5rem,6vw,7.5rem)] font-black leading-none tracking-tighter text-neoblack uppercase mb-8">
            {headline}
          </h1>
          
          <p className="relative z-10 font-body text-xl font-medium text-neoblack/80 mb-12 max-w-xl">
            {subtext}
          </p>

          <a 
            href="#projects" 
            className="relative z-20 inline-block border-neo-black bg-neoyellow px-8 py-4 rounded-2xl font-display text-2xl font-black text-neoblack uppercase active-neo-press shadow-neo-black cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F0]"
          >
            EXPLORE WORK
          </a>
        </div>

        {/* Right Column: Clean 3D/Profile Wrapper */}
        <div className="relative z-10 flex w-full items-center justify-center h-[500px] lg:h-[600px]">
          <HeroCanvasWrapper />
        </div>

      </div>
    </section>
  );
}
