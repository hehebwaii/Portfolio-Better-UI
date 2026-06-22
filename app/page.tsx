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
import { fetchPortfolio } from "@/sanity/client";
import type { SectionSettings } from "@/types/cms";

// Disable all caching — CMS edits appear instantly after page refresh.
// (revalidate = 0 is valid in Next.js 16 when cacheComponents is not enabled)
export const revalidate = 0;

export default async function Home() {
  // ── Fetch from Sanity. Returns null if projectId is not configured. ────────
  const data = await fetchPortfolio();

  // ─── GLOBAL THEME ──────────────────────────────────────────────────────────
  const globalFont      = data?.globalFont      || "Space Grotesk";
  const globalBgColor   = data?.globalBgColor   || "";
  const globalTextColor = data?.globalTextColor  || "";
  const accentColorOne  = data?.accentColorOne   || "#FACC15";
  const accentColorTwo  = data?.accentColorTwo   || "#FF6B9E";

  // ─── GLOBAL LAYOUT ─────────────────────────────────────────────────────────
  const sectionOrder = data?.sectionOrder || [
    "Hero",
    "Skills",
    "Projects",
    "Metrics",
    "Media",
    "Timeline",
    "Archives",
    "Testimonials",
    "Contact",
  ];

  // ─── SECTION SETTINGS (nested Sanity objects) ──────────────────────────────
  // Each settings object maps 1-to-1 to the SectionSettings type.
  // Safe optional-chained access ensures zero crashes on empty document.
  const heroSettings:         SectionSettings = data?.heroSettings         || {};
  const skillsSettings:       SectionSettings = data?.skillsSettings       || {};
  const projectsSettings:     SectionSettings = data?.projectsSettings     || {};
  const terminalSettings:     SectionSettings = data?.terminalSettings     || {};
  const mediaSettings:        SectionSettings = data?.mediaSettings        || {};
  const timelineSettings:     SectionSettings = data?.timelineSettings     || {};
  const archivesSettings:     SectionSettings = data?.archivesSettings     || {};
  const testimonialsSettings: SectionSettings = data?.testimonialsSettings || {};
  const contactSettings:      SectionSettings = data?.contactSettings      || {};

  // ─── DYNAMIC GOOGLE FONTS COMPILER ─────────────────────────────────────────
  // Collects every font referenced anywhere, deduplicates, builds one URL.
  const allFonts: string[] = [
    globalFont,
    heroSettings?.customFont,
    skillsSettings?.customFont,
    projectsSettings?.customFont,
    terminalSettings?.customFont,
    mediaSettings?.customFont,
    timelineSettings?.customFont,
    archivesSettings?.customFont,
    testimonialsSettings?.customFont,
    contactSettings?.customFont,
  ].filter((f): f is string => Boolean(f && f.trim() !== ""));

  const uniqueFonts = [...new Set(allFonts)];
  const googleFontsUrl =
    uniqueFonts.length > 0
      ? `https://fonts.googleapis.com/css2?${uniqueFonts
          .map((f) => `family=${f.trim().replace(/ /g, "+")}:wght@400;700;900`)
          .join("&")}&display=swap`
      : null;

  // ─── GLOBAL CSS VARIABLES ───────────────────────────────────────────────────
  const globalCss = [
    ":root {",
    globalFont      ? `  --font-global: '${globalFont}', sans-serif;`    : "",
    globalBgColor   ? `  --color-bg-global: ${globalBgColor};`           : "",
    globalTextColor ? `  --color-text-global: ${globalTextColor};`       : "",
    `  --accent-1: ${accentColorOne};`,
    `  --accent-2: ${accentColorTwo};`,
    "}",
    globalFont      ? `body { font-family: var(--font-global); }`         : "",
    globalBgColor   ? `body { background-color: var(--color-bg-global); }` : "",
    globalTextColor ? `body { color: var(--color-text-global); }`         : "",
  ].filter(Boolean).join("\n");

  // ─── NAVBAR ─────────────────────────────────────────────────────────────────
  const navBrand   = data?.navbarBrandName     || "niranjan.digital";
  const navContact = data?.navbarContactButton || "SAY HELLO";

  // ─── HERO ───────────────────────────────────────────────────────────────────
  const heroHeadline = data?.heroHeadline       || "BUILDING BOLD HARDWARE & WEB ARCHITECTURES";
  const heroSubtext  = data?.heroSubtext        || "Bridging embedded systems logic with scalable full-stack platforms.";
  const heroCTA      = data?.heroButtonText     || "EXPLORE WORK";
  const heroPhotoUrl = data?.heroProfilePhotoUrl || "";

  // ─── SKILLS ─────────────────────────────────────────────────────────────────
  const skillsHeading    = data?.skillsSectionTitle    || "WHAT I CAN DO";
  const skillsSubheading = data?.skillsSectionSubtitle || "FOR YOU.";
  const skillsList: string[] = data?.skillsList || [];

  // ─── PROJECTS ───────────────────────────────────────────────────────────────
  const projectsHeading    = data?.projectsSectionTitle    || "SELECTED";
  const projectsSubheading = data?.projectsSectionSubtitle || "WORKS.";
  const projectsList = data?.projectsList || [];
  const p1 = projectsList[0] || {};
  const p2 = projectsList[1] || {};

  // ─── RECRUITER TERMINAL ──────────────────────────────────────────────────────
  const metricsHardware  = data?.terminalHardwareMetric || "Logic Gates Built: 7+";
  const metricsSoftware  = data?.terminalSoftwareMetric || "Components Rendered: 400+";
  const keyMetrics       = (data?.keyMetrics  || []).filter((m: {label?:string; value?:string}) => m.label && m.value);
  const roiMetrics       = (data?.roiMetrics  || []).filter((m: {label?:string; value?:string}) => m.label && m.value);

  // ─── MEDIA PRODUCTION ────────────────────────────────────────────────────────
  const mediaHeading    = data?.mediaSectionTitle    || "VISUALS &";
  const mediaSubheading = data?.mediaSectionSubtitle || "MOTION.";
  const mediaCards      = data?.mediaCards || [];

  // ─── EXPERIENCE / TIMELINE ───────────────────────────────────────────────────
  const expHeading    = data?.timelineSectionTitle    || "MY";
  const expSubheading = data?.timelineSectionSubtitle || "TIMELINE.";
  const timelineEvents = data?.timelineEvents || [];

  // ─── DEPRECATED ARCHIVES ─────────────────────────────────────────────────────
  const archHeading    = data?.archivesSectionTitle    || "DEPRECATED";
  const archSubheading = data?.archivesSectionSubtitle || "ARCHITECTURES.";
  const archivesList   = data?.archivesList || [];

  // ─── TESTIMONIALS ────────────────────────────────────────────────────────────
  const testHeading    = data?.testimonialsSectionTitle    || "THE";
  const testSubheading = data?.testimonialsSectionSubtitle || "VAULT.";
  const testSubtext    = data?.testimonialsSubtext         || "ACCESS ENCRYPTED TESTIMONIALS";
  const testimonialsList = data?.testimonialsList || [];

  // ─── CONTACT ─────────────────────────────────────────────────────────────────
  const contactHeading = data?.contactSectionTitle  || "SAY HELLO.";
  const contactCTA     = data?.contactSubmitButton  || "TRANSMIT PAYLOAD";

  // ─── FOOTER ──────────────────────────────────────────────────────────────────
  const footerName    = data?.footerName          || "NIRANJAN S S";
  const footerMarquee = data?.footerScrollingText || "BUILDING BOLD ARCHITECTURES •";
  const footerSysVer  = data?.footerVersionTag    || "SYS.VER: 14.0 // NEO-BRUTALIST POP";

  // ─── TERMINAL BLOCK ──────────────────────────────────────────────────────────
  const terminalBlock = (
    <RecruiterTerminal
      metricOne={metricsHardware}
      metricTwo={metricsSoftware}
      settings={terminalSettings}
      keyMetricsOverride={keyMetrics}
      projectRoiOverride={roiMetrics}
    />
  );

  return (
    <>
      {/* ── Dynamic Google Fonts: loads all unique fonts in one request ── */}
      {googleFontsUrl && (
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      )}
      {googleFontsUrl && (
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      )}
      {googleFontsUrl && (
        <link rel="stylesheet" href={googleFontsUrl} />
      )}

      {/* ── Global CSS variables injected from Sanity theme fields ── */}
      {globalCss.trim() && (
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      )}

      <main className="relative w-full max-w-[100vw] min-h-screen bg-neocream overflow-x-clip">
        <Navbar brand={navBrand} contactLabel={navContact} />

        <div className="w-full flex flex-col gap-16 md:gap-32 pb-32">

          {sectionOrder.map((section: string, index: number) => {
            switch (section) {
              case "Hero":
                return (
                  <Hero
                    key={`section-${index}`}
                    headline={heroHeadline}
                    subtext={heroSubtext}
                    cta={heroCTA}
                    photoUrl={heroPhotoUrl}
                    settings={heroSettings}
                  />
                );
              case "Metrics":
                return React.cloneElement(terminalBlock, { key: `section-${index}` });
              case "Skills":
                return (
                  <Skills
                    key={`section-${index}`}
                    heading={skillsHeading}
                    subheading={skillsSubheading}
                    skillOverrides={skillsList}
                    settings={skillsSettings}
                  />
                );
              case "Projects":
                return (
                  <Projects
                    key={`section-${index}`}
                    heading={projectsHeading}
                    subheading={projectsSubheading}
                    p1Event={p1.eventTag         || ""}
                    p1Name={p1.name              || ""}
                    p1Description={p1.description || ""}
                    p1Tech={
                      p1.techStack
                        ? String(p1.techStack).split(",").map((s: string) => s.trim()).filter(Boolean)
                        : []
                    }
                    p1ImageUrl={p1.screenshotUrl   || ""}
                    p2Tag={p2.eventTag             || "R&D STAGE"}
                    p2Name={p2.name                || "[UNANNOUNCED]"}
                    p2Description={p2.description  || "Next-generation integrated hardware & frontend systems prototype currently in internal development."}
                    settings={projectsSettings}
                  />
                );
              case "Media":
                return (
                  <MediaProduction
                    key={`section-${index}`}
                    heading={mediaHeading}
                    subheading={mediaSubheading}
                    settings={mediaSettings}
                    mediaOverrides={mediaCards.map((c: {
                      title?: string;
                      description?: string;
                      tags?: string;
                      photoUrl?: string;
                    }) => ({
                      title:    c.title       || "",
                      desc:     c.description || "",
                      tags:     c.tags        || "",
                      imageUrl: c.photoUrl    || "",
                    }))}
                  />
                );
              case "Timeline":
                return (
                  <Experience
                    key={`section-${index}`}
                    heading={expHeading}
                    subheading={expSubheading}
                    settings={timelineSettings}
                    milestoneOverrides={timelineEvents.map((e: {
                      title?: string;
                      organization?: string;
                      period?: string;
                      description?: string;
                    }) => ({
                      title:  e.title        || "",
                      org:    e.organization || "",
                      period: e.period       || "",
                      desc:   e.description  || "",
                    }))}
                  />
                );
              case "Archives":
                return (
                  <DeprecatedArchive
                    key={`section-${index}`}
                    heading={archHeading}
                    subheading={archSubheading}
                    settings={archivesSettings}
                    archiveOverrides={archivesList.map((a: {
                      _key?: string;
                      version?: string;
                      errorMessage?: string;
                      description?: string;
                    }) => ({
                      id:          a._key        || a.version || "arch",
                      version:     a.version     || "",
                      error:       a.errorMessage || "",
                      description: a.description  || "",
                    })).filter((a: { version: string }) => a.version)}
                  />
                );
              case "Testimonials":
                return (
                  <Testimonials
                    key={`section-${index}`}
                    heading={testHeading}
                    subheading={testSubheading}
                    subtext={testSubtext}
                    settings={testimonialsSettings}
                    testimonialOverrides={testimonialsList.map((t: {
                      _key?: string;
                      name?: string;
                      role?: string;
                      quote?: string;
                    }) => ({
                      id:   t._key  || t.name || "t",
                      name: t.name  || "",
                      role: t.role  || "",
                      text: t.quote || "",
                    })).filter((t: { name: string; text: string }) => t.name && t.text)}
                  />
                );
              case "Contact":
                return (
                  <Contact 
                    key={`section-${index}`}
                    heading={contactHeading} 
                    cta={contactCTA} 
                    settings={contactSettings} 
                  />
                );
              default:
                return null;
            }
          })}
        </div>

        <Footer name={footerName} marqueeText={footerMarquee} sysVer={footerSysVer} />
      </main>
    </>
  );
}
