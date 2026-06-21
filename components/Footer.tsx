"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { content } from "@/config/content";
import { useEsc } from "./ClientProvider";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function VelocityMarquee({ baseVelocity = -5 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="w-full border-b-4 border-neoblack bg-neoyellow py-3 overflow-hidden flex whitespace-nowrap">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-4 font-display text-2xl font-black uppercase text-neoblack block">
            BUILDING BOLD ARCHITECTURES • 
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [modalOpen, setModalOpen] = useState(false);
  const { escPressed, resetEsc } = useEsc();

  useEffect(() => {
    if (escPressed && modalOpen) {
      setModalOpen(false);
      resetEsc();
    }
  }, [escPressed, modalOpen, resetEsc]);

  return (
    <>
      <footer className="w-full bg-neoblue border-t-4 border-neoblack relative z-10 mt-auto flex flex-col">
        {/* Velocity-Mapped Marquee */}
        <VelocityMarquee baseVelocity={-5} />

        <div className="mx-auto w-full max-w-7xl px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-20">
          <div className="text-center md:text-left">
            <p className="font-display text-4xl font-black uppercase text-neoblack tracking-tighter bg-white inline-block px-4 py-2 border-neo-black shadow-[4px_4px_0px_0px_#000] rounded-xl -rotate-2">
              NIRANJAN S S
            </p>
            <p className="font-mono text-sm font-bold text-neoblack mt-6 uppercase">
              SYS.VER: 13.2 // NEO-BRUTALIST POP
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-end">
            <button 
              onClick={() => setModalOpen(true)}
              className="border-neo-black bg-white px-6 py-3 rounded-full font-mono text-sm font-bold text-neoblack uppercase active-neo-press shadow-[4px_4px_0px_0px_#000] z-20 cursor-pointer"
            >
              PRIVACY POLICY
            </button>
            
            <p className="font-mono text-xs font-bold text-neoblack uppercase">
              &copy; {currentYear} NIRANJAN S S. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neoblack/60 backdrop-blur-sm p-6">
          <div className="relative w-full max-w-2xl bg-white border-neo-black rounded-3xl shadow-[16px_16px_0px_0px_#FF6B9E] p-8 md:p-12">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 border-2 border-neoblack bg-neoyellow h-10 w-10 flex items-center justify-center rounded-full font-mono font-black text-neoblack hover:bg-neopink transition-colors"
            >
              X
            </button>
            
            <h3 className="font-display text-4xl font-black uppercase text-neoblack mb-8 border-b-4 border-neoblack pb-4">
              PRIVACY PROTOCOL
            </h3>
            
            <div className="flex flex-col gap-4 font-mono text-sm font-bold text-neoblack">
              {content.privacyPolicy.map((line, idx) => (
                <p key={idx} className="bg-neocream border-l-4 border-neoblack pl-4 py-2">
                  {line}
                </p>
              ))}
            </div>
            
            <p className="mt-8 font-body text-xs font-bold text-neoblack/50 uppercase">
              [PRESS ESC TO TERMINATE]
            </p>
          </div>
        </div>
      )}
    </>
  );
}
