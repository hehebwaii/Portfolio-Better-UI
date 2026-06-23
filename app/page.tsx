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
import Sandbox from "@/components/Sandbox";
import Footer from "@/components/Footer";
import { fetchPortfolio, urlFor } from "@/sanity/client";

export const revalidate = 0;

export default async function Home() {
  const data = await fetchPortfolio();

  // ─── GLOBAL THEME ──────────────────────────────────────────────────────────
  const globalFont      = data?.globalFont      || "Space Grotesk";
  const lightBg         = data?.lightBg         || "#FFF9F0";
  const lightText       = data?.lightText       || "#000000";
  const darkBg          = data?.darkBg          || "#111111";
  const darkText        = data?.darkText        || "#FFFFFF";
  const accentPrimary   = data?.accentPrimary   || "#FACC15";
  const accentSecondary = data?.accentSecondary || "#FF6B9E";

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
      case "sectionSandbox": return block.sandboxSettings?.customFont;
      default: return null;
    }
  });

  const allFonts: string[] = [globalFont, ...blockFonts].filter((f): f is string => Boolean(f && f.trim() !== ""));
  const uniqueFonts = [...new Set(allFonts)];
  const googleFontsUrl = uniqueFonts.length > 0
    ? `https://fonts.googleapis.com/css2?${uniqueFonts.map(f => `family=${f.trim().replace(/ /g, "+")}:wght@400;700;900`).join("&")}&display=swap`
    : null;

  // ─── GLOBAL CSS VARIABLES (DUAL-STATE) ──────────────────────────────────────
  const globalCss = `
    :root {
      ${globalFont ? `--font-global: '${globalFont}', sans-serif;` : ""}
      --color-bg-global: ${lightBg};
      --color-text-global: ${lightText};
      --accent-1: ${accentPrimary};
      --accent-2: ${accentSecondary};
    }
    [data-theme='dark'] {
      --color-bg-global: ${darkBg};
      --color-text-global: ${darkText};
    }
    body {
      font-family: var(--font-global);
      background-color: var(--color-bg-global);
      color: var(--color-text-global);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  `;

  // ─── NAVBAR & FOOTER ────────────────────────────────────────────────────────
  const navBrand   = data?.navbarBrandName     || "niranjan.digital";
  const navItems   = data?.navItems            || [];
  const resumeUrl  = data?.resumeUrl           || null;
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

      <main className="relative w-full max-w-[100vw] min-h-screen bg-neocream overflow-x-clip scroll-smooth">
        <Navbar brand={navBrand} navItems={navItems} resumeUrl={resumeUrl} contactLabel={navContact} />

        <div className="w-full flex flex-col gap-16 md:gap-32 pb-32">
          {pageBuilder.map((block: any, index: number) => {
            const key = block._key || `block-${index}`;
            const anchorId = block.settings?.sectionId || block._key || `section-${index}`;

            return (
              <div id={anchorId} key={key} className="w-full scroll-mt-[100px]">
                {(() => {
                  switch (block._type) {
                    case "sectionHero":
                      return (
                        <Hero
                          headline={block.heroHeadline}
                          subtext={block.heroSubtext}
                          cta={block.heroButtonText}
                          photoUrl={block.heroProfilePhoto ? urlFor(block.heroProfilePhoto).url() : ""}
                          settings={block.heroSettings}
                        />
                      );

                    case "sectionMetrics":
                      return (
                        <RecruiterTerminal
                          metricOne={block.terminalHardwareMetric}
                          metricTwo={block.terminalSoftwareMetric}
                          settings={block.terminalSettings}
                          keyMetricsOverride={(block.keyMetrics || [])}
                          projectRoiOverride={(block.roiMetrics || [])}
                        />
                      );

                    case "sectionSkills":
                      return (
                        <Skills
                          heading={block.skillsSectionTitle}
                          subheading={block.skillsSectionSubtitle}
                          skillOverrides={block.skillsList}
                          settings={block.skillsSettings}
                        />
                      );

                    case "sectionProjects":
                      const p1 = block.projectsList?.[0] || {};
                      const p2 = block.projectsList?.[1] || {};
                      return (
                        <Projects
                          heading={block.projectsSectionTitle}
                          subheading={block.projectsSectionSubtitle}
                          p1Event={p1.eventTag}
                          p1Name={p1.name}
                          p1Description={p1.description}
                          p1Tech={p1.techStack ? String(p1.techStack).split(",").map(s => s.trim()).filter(Boolean) : []}
                          p1ImageUrl={p1.screenshot ? urlFor(p1.screenshot).url() : ""}
                          p2Tag={p2.eventTag}
                          p2Name={p2.name}
                          p2Description={p2.description}
                          settings={block.projectsSettings}
                        />
                      );

                    case "sectionMedia":
                      return (
                        <MediaProduction
                          heading={block.mediaSectionTitle}
                          subheading={block.mediaSectionSubtitle}
                          settings={block.mediaSettings}
                          mediaOverrides={(block.mediaCards || []).map((c: any) => ({
                            title: c.title,
                            desc: c.description,
                            tags: c.tags,
                            imageUrl: c.photo ? urlFor(c.photo).url() : "",
                            lqip: c.photo?.asset?.metadata?.lqip || "",
                          }))}
                        />
                      );

                    case "sectionTimeline":
                      return (
                        <Experience
                          heading={block.timelineSectionTitle}
                          subheading={block.timelineSectionSubtitle}
                          settings={block.timelineSettings}
                          milestoneOverrides={(block.timelineEvents || []).map((e: any) => ({
                            title: e.title,
                            org: e.organization,
                            period: e.period,
                            desc: e.description,
                          }))}
                        />
                      );

                    case "sectionArchives":
                      return (
                        <DeprecatedArchive
                          heading={block.archivesSectionTitle}
                          subheading={block.archivesSectionSubtitle}
                          settings={block.archivesSettings}
                          archiveOverrides={(block.archivesList || []).map((a: any) => ({
                            id: a._key,
                            version: a.version,
                            error: a.errorMessage,
                            description: a.description,
                          }))}
                        />
                      );

                    case "sectionTestimonials":
                      return (
                        <Testimonials
                          heading={block.testimonialsSectionTitle}
                          subheading={block.testimonialsSectionSubtitle}
                          subtext={block.testimonialsSubtext}
                          settings={block.testimonialsSettings}
                          testimonialOverrides={(block.testimonialsList || []).map((t: any) => ({
                            id: t._key,
                            name: t.name,
                            role: t.role,
                            text: t.quote,
                          }))}
                        />
                      );

                    case "sectionContact":
                      return (
                        <Contact 
                          heading={block.contactSectionTitle} 
                          cta={block.contactSubmitButton} 
                          settings={block.contactSettings} 
                        />
                      );

                    case "sectionSandbox":
                      return <Sandbox elements={block.elements} settings={block.sandboxSettings} />;

                    default:
                      return null;
                  }
                })()}
              </div>
            );
          })}
        </div>

        <Footer name={footerName} marqueeText={footerMarquee} sysVer={footerSysVer} />
      </main>
    </>
  );
}
