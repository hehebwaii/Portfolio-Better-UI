"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";

interface MetricItem { label: string; value: string; }

interface RecruiterTerminalProps {
  metricOne: string;
  metricTwo: string;
  keyMetricsOverride?: MetricItem[];
  projectRoiOverride?: MetricItem[];
}

export default function RecruiterTerminal({
  metricOne,
  metricTwo,
  keyMetricsOverride = [],
  projectRoiOverride = [],
}: RecruiterTerminalProps) {
  const [activeDrawer, setActiveDrawer] = useState<'metrics' | 'roi' | null>(null);

  // Merge: Notion overrides replace defaults; fall back to content.ts
  const keyMetrics = keyMetricsOverride.length > 0
    ? keyMetricsOverride
    : content.recruiterPayloadData.keyMetrics;

  const projectRoi = projectRoiOverride.length > 0
    ? projectRoiOverride
    : content.recruiterPayloadData.projectRoi;

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="terminal" className="relative w-full px-6 flex justify-center z-20 scroll-mt-[100px]">
      <div className="w-full max-w-4xl bg-[#000000] border-neo-black shadow-[8px_8px_0px_0px_#FACC15] flex flex-col p-6 md:p-8 rounded-2xl">

        {/* Header */}
        <div className="flex items-center gap-4 border-b-2 border-[#10B981] pb-4 mb-6">
          <div className="h-3 w-3 bg-[#FF6B9E] rounded-full animate-pulse"></div>
          <h2 className="font-mono text-sm md:text-base font-black text-[#10B981] uppercase flex items-center gap-2">
            &gt; RECRUITER_PAYLOAD_OPENED...
            <span className="inline-block w-3 h-5 bg-[#10B981] animate-pulse"></span>
          </h2>
        </div>

        {/* Command Menu */}
        <div className="flex flex-col gap-2 w-full font-mono text-sm md:text-base font-bold text-white uppercase">

          {/* CV */}
          <a
            href="/cv.pdf"
            download
            className="w-full flex items-center p-3 md:hover:bg-[#10B981]/20 md:hover:text-[#10B981] transition-colors cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E]"
          >
            &rarr; DOWNLOAD CV
          </a>

          {/* Key Metrics */}
          <div className="w-full flex flex-col">
            <button
              onClick={() => setActiveDrawer(activeDrawer === 'metrics' ? null : 'metrics')}
              className={`w-full flex items-center text-left p-3 md:hover:bg-[#10B981]/20 md:hover:text-[#10B981] transition-colors cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] ${activeDrawer === 'metrics' ? 'bg-[#10B981]/20 text-[#10B981]' : ''}`}
            >
              &rarr; KEY METRICS
            </button>
            <AnimatePresence>
              {activeDrawer === 'metrics' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white/5 border-l-2 border-[#10B981] ml-4 mt-2"
                >
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-[#10B981]/30 pb-2">
                      <span className="text-white/60">HARDWARE</span>
                      <span className="text-[#FACC15]">{metricOne}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#10B981]/30 pb-2">
                      <span className="text-white/60">SOFTWARE</span>
                      <span className="text-[#FACC15]">{metricTwo}</span>
                    </div>
                    {keyMetrics.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-[#10B981]/30 pb-2">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-[#FACC15]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Project ROI */}
          <div className="w-full flex flex-col">
            <button
              onClick={() => setActiveDrawer(activeDrawer === 'roi' ? null : 'roi')}
              className={`w-full flex items-center text-left p-3 md:hover:bg-[#10B981]/20 md:hover:text-[#10B981] transition-colors cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E] ${activeDrawer === 'roi' ? 'bg-[#10B981]/20 text-[#10B981]' : ''}`}
            >
              &rarr; PROJECT ROI
            </button>
            <AnimatePresence>
              {activeDrawer === 'roi' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white/5 border-l-2 border-[#10B981] ml-4 mt-2"
                >
                  <div className="p-4 flex flex-col gap-3">
                    {projectRoi.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-[#10B981]/30 pb-2">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-[#10B981]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact */}
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="w-full flex items-center p-3 md:hover:bg-[#10B981]/20 md:hover:text-[#10B981] transition-colors cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#FF6B9E]"
          >
            &rarr; CONTACT DIRECT
          </a>
        </div>
      </div>
    </section>
  );
}
