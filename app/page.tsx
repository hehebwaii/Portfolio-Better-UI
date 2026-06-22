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

export const revalidate = 0;

export default async function Home() {
  const data = await fetchPortfolio();

  // ─── GLOBAL THEME ──────────────────────────────────────────────────────────
  const globalFont      = data?.globalFont      || "Space Grotesk";
  const globalBgColor   = data?.globalBgColor   || "";
  const globalTextColor = data?.globalTextColor || "";
  const accentColorOne  = data?.accentColorOne  || "#FACC15";
  const accentColorTwo  = data?.accentColorTwo  || "#FF6B9E";

  // ─── PAGE BUILDER BLOCKS ───────────────────────────────────────────────────
  const pageBuilder = data?.pageBuilder || [];

  // ─── DYNAMIC GOOGLE FONTS COMPILER ─────────────────────────────────────────
  const blockFonts = pageBuilder.map((block: any) => {
    switch (block._type) {
      case "sectionHero": return block.heroSettings?.customFont;
      case "sectionSkills": return block.skillsSettings?.customFont;
      case "sectionProjects": return block.projectsSettings?.customFont;
      case "sectionMetrics": return block.terminalSettings?.customFont;
      case "sectionMedia": return block.mediaSettings?.customFont;
      case "sectionTimeline": return block.timelineSettings?.customFont;
      case "sectionArchives": return block.archivesSettings?.customFont;
      case "sectionTestimonials": return block.testimonialsSettings?.customFont;
      case "sectionContact": return block.contactSettings?.customFont;
      default: return null;
    }
  });

  const allFonts: string[] = [globalFont, ...blockFonts].filter((f): f is string => Boolean(f && f.trim() !== ""));
  const uniqueFonts = [...new Set(allFonts)];
  const googleFontsUrl = uniqueFonts.length > 0
    ? `https://fonts.googleapis.com/css2?${uniqueFonts.map(f => `family=${f.trim().replace(/ /g, "+")}:wght@400;700;900`).join("&")}&display=swap`
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

  // ─── NAVBAR & FOOTER ────────────────────────────────────────────────────────
  const navBrand   = data?.navbarBrandName     || "niranjan.digital";
  const navContact = data?.navbarContactButton || "SAY HELLO";
  const footerName    = data?.footerName          || "NIRANJAN S S";
  const footerMarquee = data?.footerScrollingText || "BUILDING BOLD ARCHITECTURES •";
  const footerSysVer  = data?.footerVersionTag    || "SYS.VER: 14.0 // NEO-BRUTALIST POP";

  return (
    <>
      {googleFontsUrl && <link rel="preconnect" href="https://fonts.googleapis.com" />}
      {googleFontsUrl && <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />}
      {googleFontsUrl && <link rel="stylesheet" href={googleFontsUrl} />}
      {globalCss.trim() && <style dangerouslySetInnerHTML={{ __html: globalCss }} />}

      <main className="relative w-full max-w-[100vw] min-h-screen bg-neocream overflow-x-clip">
        <Navbar brand={navBrand} contactLabel={navContact} />

        <div className="w-full flex flex-col gap-16 md:gap-32 pb-32">
          {pageBuilder.map((block: any, index: number) => {
            const key = block._key || `block-${index}`;

            switch (block._type) {
              case "sectionHero":
                return (
                  <Hero
                    key={key}
                    headline={block.heroHeadline || "BUILDING BOLD HARDWARE & WEB ARCHITECTURES"}
                    subtext={block.heroSubtext || "Bridging embedded systems logic with scalable full-stack platforms."}
                    cta={block.heroButtonText || "EXPLORE WORK"}
                    photoUrl={block.heroProfilePhotoUrl || ""}
                    settings={block.heroSettings || {}}
                  />
                );

              case "sectionMetrics":
                return (
                  <RecruiterTerminal
                    key={key}
                    metricOne={block.terminalHardwareMetric || "Logic Gates Built: 7+"}
                    metricTwo={block.terminalSoftwareMetric || "Components Rendered: 400+"}
                    settings={block.terminalSettings || {}}
                    keyMetricsOverride={(block.keyMetrics || []).filter((m: any) => m.label && m.value)}
                    projectRoiOverride={(block.roiMetrics || []).filter((m: any) => m.label && m.value)}
                  />
                );

              case "sectionSkills":
                return (
                  <Skills
                    key={key}
                    heading={block.skillsSectionTitle || "WHAT I CAN DO"}
                    subheading={block.skillsSectionSubtitle || "FOR YOU."}
                    skillOverrides={block.skillsList || []}
                    settings={block.skillsSettings || {}}
                  />
                );

              case "sectionProjects":
                const p1 = block.projectsList?.[0] || {};
                const p2 = block.projectsList?.[1] || {};
                return (
                  <Projects
                    key={key}
                    heading={block.projectsSectionTitle || "SELECTED"}
                    subheading={block.projectsSectionSubtitle || "WORKS."}
                    p1Event={p1.eventTag || ""}
                    p1Name={p1.name || ""}
                    p1Description={p1.description || ""}
                    p1Tech={p1.techStack ? String(p1.techStack).split(",").map(s => s.trim()).filter(Boolean) : []}
                    p1ImageUrl={p1.screenshotUrl || ""}
                    p2Tag={p2.eventTag || "R&D STAGE"}
                    p2Name={p2.name || "[UNANNOUNCED]"}
                    p2Description={p2.description || "Next-generation integrated hardware & frontend systems prototype currently in internal development."}
                    settings={block.projectsSettings || {}}
                  />
                );

              case "sectionMedia":
                return (
                  <MediaProduction
                    key={key}
                    heading={block.mediaSectionTitle || "VISUALS &"}
                    subheading={block.mediaSectionSubtitle || "MOTION."}
                    settings={block.mediaSettings || {}}
                    mediaOverrides={(block.mediaCards || []).map((c: any) => ({
                      title: c.title || "",
                      desc: c.description || "",
                      tags: c.tags || "",
                      imageUrl: c.photoUrl || "",
                    }))}
                  />
                );

              case "sectionTimeline":
                return (
                  <Experience
                    key={key}
                    heading={block.timelineSectionTitle || "MY"}
                    subheading={block.timelineSectionSubtitle || "TIMELINE."}
                    settings={block.timelineSettings || {}}
                    milestoneOverrides={(block.timelineEvents || []).map((e: any) => ({
                      title: e.title || "",
                      org: e.organization || "",
                      period: e.period || "",
                      desc: e.description || "",
                    }))}
                  />
                );

              case "sectionArchives":
                return (
                  <DeprecatedArchive
                    key={key}
                    heading={block.archivesSectionTitle || "DEPRECATED"}
                    subheading={block.archivesSectionSubtitle || "ARCHITECTURES."}
                    settings={block.archivesSettings || {}}
                    archiveOverrides={(block.archivesList || []).map((a: any) => ({
                      id: a._key || a.version || "arch",
                      version: a.version || "",
                      error: a.errorMessage || "",
                      description: a.description || "",
                    })).filter((a: any) => a.version)}
                  />
                );

              case "sectionTestimonials":
                return (
                  <Testimonials
                    key={key}
                    heading={block.testimonialsSectionTitle || "THE"}
                    subheading={block.testimonialsSectionSubtitle || "VAULT."}
                    subtext={block.testimonialsSubtext || "ACCESS ENCRYPTED TESTIMONIALS"}
                    settings={block.testimonialsSettings || {}}
                    testimonialOverrides={(block.testimonialsList || []).map((t: any) => ({
                      id: t._key || t.name || "t",
                      name: t.name || "",
                      role: t.role || "",
                      text: t.quote || "",
                    })).filter((t: any) => t.name && t.text)}
                  />
                );

              case "sectionContact":
                return (
                  <Contact 
                    key={key}
                    heading={block.contactSectionTitle || "SAY HELLO."} 
                    cta={block.contactSubmitButton || "TRANSMIT PAYLOAD"} 
                    settings={block.contactSettings || {}} 
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
