import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import RecruiterTerminal from "@/components/RecruiterTerminal";
import MediaProduction from "@/components/MediaProduction";
import Experience from "@/components/Experience";
import DeprecatedArchive from "@/components/DeprecatedArchive";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { fetchPortfolioContent } from "@/lib/notion";

// Incremental Static Regeneration: re-fetches Notion data every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const cms = await fetchPortfolioContent();

  // ─── HERO ───────────────────────────────────────────────────────────────────
  const heroHeadline    = cms["heroHeadline"]  || "BUILDING BOLD HARDWARE & WEB ARCHITECTURES";
  const heroSubtext     = cms["heroSubtext"]   || "Bridging embedded systems logic with scalable full-stack platforms.";
  const heroCTA         = cms["heroCTA"]       || "EXPLORE WORK";

  // ─── RECRUITER TERMINAL ──────────────────────────────────────────────────────
  const metricsHardware = cms["metricsHardware"] || "Logic Gates Built: XX";
  const metricsSoftware = cms["metricsSoftware"] || "Components Rendered: XX";

  // ─── CONTACT SECTION ────────────────────────────────────────────────────────
  const contactHeading  = cms["contactHeading"]  || "SAY HELLO.";
  const contactCTA      = cms["contactCTA"]      || "TRANSMIT PAYLOAD";

  // ─── FOOTER ─────────────────────────────────────────────────────────────────
  const footerName      = cms["footerName"]      || "NIRANJAN S S";
  const footerMarquee   = cms["footerMarquee"]   || "BUILDING BOLD ARCHITECTURES •";
  const footerSysVer    = cms["footerSysVer"]    || "SYS.VER: 13.2 // NEO-BRUTALIST POP";

  // ─── SKILLS SECTION ─────────────────────────────────────────────────────────
  // Individual skills can be overridden. Falls back to content.ts defaults.
  const skill1 = cms["skill1"] || "";
  const skill2 = cms["skill2"] || "";
  const skill3 = cms["skill3"] || "";
  const skill4 = cms["skill4"] || "";
  const skillOverrides = [skill1, skill2, skill3, skill4].filter(Boolean);

  return (
    <main className="relative w-full max-w-[100vw] min-h-screen bg-neocream overflow-x-clip">
      <Navbar />

      <div className="w-full flex flex-col gap-16 md:gap-32 pb-32">
        <Hero
          headline={heroHeadline}
          subtext={heroSubtext}
          cta={heroCTA}
        />
        <Skills skillOverrides={skillOverrides} />
        <Projects />
        <RecruiterTerminal
          metricOne={metricsHardware}
          metricTwo={metricsSoftware}
        />
        <MediaProduction />
        <Experience />
        <DeprecatedArchive />
        <Testimonials />
        <Contact
          heading={contactHeading}
          cta={contactCTA}
        />
      </div>

      <Footer
        name={footerName}
        marqueeText={footerMarquee}
        sysVer={footerSysVer}
      />
    </main>
  );
}
