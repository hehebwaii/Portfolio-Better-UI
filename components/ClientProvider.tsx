"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

type EscContextType = {
  escPressed: boolean;
  resetEsc: () => void;
};

const EscContext = createContext<EscContextType>({ escPressed: false, resetEsc: () => {} });

export const useEsc = () => useContext(EscContext);

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [escPressed, setEscPressed] = useState(false);

  // Recruiter Console Payload
  useEffect(() => {
    const asciiLogo = `
  _   _ _____ ___      ____  ____  _   _ _____  _    _     ___ ____ _____ 
 | \\ | | ____/ _ \\    | __ )|  _ \\| | | |_   _|/ \\  | |   |_ _/ ___|_   _|
 |  \\| |  _|| | | |___|  _ \\| |_) | | | | | | / _ \\ | |    | |\\___ \\ | |  
 | |\\  | |__| |_| |___| |_) |  _ <| |_| | | |/ ___ \\| |___ | | ___) || |  
 |_| \\_|_____\\___/    |____/|_| \\_\\\\___/  |_/_/   \\_\\_____|___|____/ |_|  
    `;
    
    console.log(
      `%c${asciiLogo}\n%c> SYSTEM ARCHITECTURE: NEO-BRUTALIST POP (v13.2)\n> ENGINE: NEXT.JS 16 (APP ROUTER) / REACT 19\n> PHYSICS: FRAMER MOTION / LENIS SMOOTH SCROLL\n> STYLING: TAILWIND CSS / STRICT BORDERS / ZERO CLUTTER\n\n> Hello Recruiter/Engineer. If you are reading this, the system is fully operational.\n> Feel free to audit the layout structure.`,
      "color: #FF6B9E; font-weight: bold; font-family: monospace;",
      "color: #10B981; font-weight: bold; font-family: monospace; font-size: 12px;"
    );
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEscPressed(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      lenis.destroy();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname]);

  const resetEsc = () => setEscPressed(false);

  return (
    <EscContext.Provider value={{ escPressed, resetEsc }}>
      {children}
    </EscContext.Provider>
  );
}
