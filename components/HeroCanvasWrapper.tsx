import React from "react";

export default function HeroCanvasWrapper() {
  return (
    <div className="relative h-full w-full max-w-[500px] aspect-[4/5] border-neo-black bg-neopink shadow-neo-black rounded-3xl overflow-visible flex flex-col items-center justify-end z-10 mx-auto">
      
      {/* 
        3D-Ready Container Frame 
        CRITICAL IDENTITY PRESERVATION: Strict object-contain semantics ensure that
        no matter the viewport or wrapper scaling, the core focal elements (PNG or Canvas)
        are absolutely preserved without any warping, filter modifications, or aspect ratio destruction.
      */}
      <div className="relative h-[90%] w-[90%] bg-white/20 rounded-t-3xl border-neo-black border-b-0 overflow-hidden flex flex-col items-center justify-center">
        
        <div className="flex-1 w-full flex items-center justify-center bg-transparent">
          <span className="font-mono text-sm font-bold text-neoblack uppercase text-center p-4">
            [TRANSPARENT PNG / 3D CANVAS INJECT]
          </span>
        </div>
        
      </div>

      {/* Fixed Telemetry Badge */}
      <div className="absolute -bottom-6 -right-6 z-20 border-neo-black bg-neogreen px-6 py-3 rounded-full shadow-neo-black rotate-6 flex items-center gap-3">
         <div className="h-3 w-3 bg-neoblack rounded-full animate-pulse"></div>
         <span className="font-mono text-sm font-black text-neoblack uppercase">
           TELEMETRY VERIFIED
         </span>
      </div>
      
    </div>
  );
}
