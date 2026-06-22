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
import type { SectionSettings } from "@/types/cms";

export const revalidate = 60;

// ─────────────────────────────────────────────────────────────────────────────
// Helper: build a SectionSettings object from a Notion key prefix
// ─────────────────────────────────────────────────────────────────────────────
function buildSettings(cms: Record<string, string>, prefix: string): SectionSettings {
  return {
    customFont:      cms[`${prefix} Custom Font`]         || "",
    fontSizeDesktop: cms[`${prefix} Font Size Desktop`]   || "",
    fontSizeMobile:  cms[`${prefix} Font Size Mobile`]    || "",
    textColor:       cms[`${prefix} Text Color`]          || "",
    backgroundColor: cms[`${prefix} Background Color`]    || "",
    alignment:       (cms[`${prefix} Alignment`] as SectionSettings["alignment"]) || undefined,
  };
}

export default async function Home() {
  const cms = await fetchPortfolioContent();

  // ─── GLOBAL THEME ───────────────────────────────────────────────────────────
  const globalFont      = cms["Global Font"]             || "Space Grotesk";
  const globalBgColor   = cms["Global Background Color"] || "";
  const globalTextColor = cms["Global Text Color"]       || "";
  const accentColorOne  = cms["Accent Color One"]        || "#FACC15";
  const accentColorTwo  = cms["Accent Color Two"]        || "#FF6B9E";

  // ─── GLOBAL LAYOUT ──────────────────────────────────────────────────────────
  const terminalPlacement = cms["Terminal Placement"] || "below-hero";

  // ─── PER-SECTION SETTINGS ───────────────────────────────────────────────────
  const heroSettings         = buildSettings(cms, "Hero");
  const skillsSettings       = buildSettings(cms, "Skills");
  const projectsSettings     = buildSettings(cms, "Projects");
  const terminalSettings     = buildSettings(cms, "Terminal");
  const mediaSettings        = buildSettings(cms, "Media");
  const timelineSettings     = buildSettings(cms, "Timeline");
  const archivesSettings     = buildSettings(cms, "Archives");
  const testimonialsSettings = buildSettings(cms, "Testimonials");
  const contactSettings      = buildSettings(cms, "Contact");

  // ─── DYNAMIC GOOGLE FONTS COMPILER ─────────────────────────────────────────
  // Collect every font referenced anywhere → deduplicate → build one URL
  const allFonts = [
    globalFont,
    heroSettings.customFont,
    skillsSettings.customFont,
    projectsSettings.customFont,
    terminalSettings.customFont,
    mediaSettings.customFont,
    timelineSettings.customFont,
    archivesSettings.customFont,
    testimonialsSettings.customFont,
    contactSettings.customFont,
  ].filter((f): f is string => Boolean(f));

  const uniqueFonts = [...new Set(allFonts)];
  const googleFontsUrl =
    uniqueFonts.length > 0
      ? `https://fonts.googleapis.com/css2?${uniqueFonts
          .map((f) => `family=${f.trim().replace(/ /g, "+")}:wght@400;700;900`)
          .join("&")}&display=swap`
      : null;

  // ─── GLOBAL CSS VARIABLES ───────────────────────────────────────────────────
  const globalCss = `
    :root {
      ${globalFont      ? `--font-global: '${globalFont}', sans-serif;`    : ""}
      ${globalBgColor   ? `--color-bg-global: ${globalBgColor};`           : ""}
      ${globalTextColor ? `--color-text-global: ${globalTextColor};`       : ""}
      --accent-1: ${accentColorOne};
      --accent-2: ${accentColorTwo};
    }
    ${globalFont      ? `body { font-family: var(--font-global); }`         : ""}
    ${globalBgColor   ? `body { background-color: var(--color-bg-global); }` : ""}
    ${globalTextColor ? `body { color: var(--color-text-global); }`         : ""}
  `.trim();

  // ─── NAVBAR ─────────────────────────────────────────────────────────────────
  const navBrand   = cms["Navbar Brand Name"]     || "niranjan.digital";
  const navContact = cms["Navbar Contact Button"] || "SAY HELLO";

  // ─── HERO ───────────────────────────────────────────────────────────────────
  const heroHeadline  = cms["Hero Headline"]          || "BUILDING BOLD HARDWARE & WEB ARCHITECTURES";
  const heroSubtext   = cms["Hero Subtext"]           || "Bridging embedded systems logic with scalable full-stack platforms.";
  const heroCTA       = cms["Hero Button Text"]       || "EXPLORE WORK";
  const heroPhotoUrl  = cms["Hero Profile Photo URL"] || "";

  // ─── SKILLS ─────────────────────────────────────────────────────────────────
  const skillsHeading    = cms["Skills Section Title"]    || "WHAT I CAN DO";
  const skillsSubheading = cms["Skills Section Subtitle"] || "FOR YOU.";
  const skill1 = cms["Skill 1"] || "";
  const skill2 = cms["Skill 2"] || "";
  const skill3 = cms["Skill 3"] || "";
  const skill4 = cms["Skill 4"] || "";

  // ─── PROJECTS ───────────────────────────────────────────────────────────────
  const projectsHeading    = cms["Projects Section Title"]    || "SELECTED";
  const projectsSubheading = cms["Projects Section Subtitle"] || "WORKS.";
  const p1Event        = cms["Project 1 Event Tag"]       || "";
  const p1Name         = cms["Project 1 Name"]            || "";
  const p1Description  = cms["Project 1 Description"]     || "";
  const p1Tech         = cms["Project 1 Tech Stack"]      || "";
  const p1ImageUrl     = cms["Project 1 Screenshot URL"]  || "";
  const p2Tag          = cms["Project 2 Tag"]             || "R&D STAGE";
  const p2Name         = cms["Project 2 Name"]            || "[UNANNOUNCED]";
  const p2Description  = cms["Project 2 Description"]     || "Next-generation integrated hardware & frontend systems prototype currently in internal development.";

  // ─── RECRUITER TERMINAL ──────────────────────────────────────────────────────
  const metricsHardware = cms["Terminal Hardware Metric"] || "Logic Gates Built: XX";
  const metricsSoftware = cms["Terminal Software Metric"] || "Components Rendered: XX";
  const km1Label = cms["Key Metric 1 Label"] || "";
  const km1Value = cms["Key Metric 1 Value"] || "";
  const km2Label = cms["Key Metric 2 Label"] || "";
  const km2Value = cms["Key Metric 2 Value"] || "";
  const km3Label = cms["Key Metric 3 Label"] || "";
  const km3Value = cms["Key Metric 3 Value"] || "";
  const km4Label = cms["Key Metric 4 Label"] || "";
  const km4Value = cms["Key Metric 4 Value"] || "";
  const roi1Label = cms["ROI 1 Label"] || "";
  const roi1Value = cms["ROI 1 Value"] || "";
  const roi2Label = cms["ROI 2 Label"] || "";
  const roi2Value = cms["ROI 2 Value"] || "";
  const roi3Label = cms["ROI 3 Label"] || "";
  const roi3Value = cms["ROI 3 Value"] || "";

  // ─── MEDIA PRODUCTION ────────────────────────────────────────────────────────
  const mediaHeading    = cms["Media Section Title"]    || "VISUALS &";
  const mediaSubheading = cms["Media Section Subtitle"] || "MOTION.";
  const media1Title    = cms["Media Card 1 Title"]       || "";
  const media1Desc     = cms["Media Card 1 Description"] || "";
  const media1Tags     = cms["Media Card 1 Tags"]        || "";
  const media1ImageUrl = cms["Media Card 1 Photo URL"]   || "";
  const media2Title    = cms["Media Card 2 Title"]       || "";
  const media2Desc     = cms["Media Card 2 Description"] || "";
  const media2Tags     = cms["Media Card 2 Tags"]        || "";
  const media2ImageUrl = cms["Media Card 2 Photo URL"]   || "";
  const media3Title    = cms["Media Card 3 Title"]       || "";
  const media3Desc     = cms["Media Card 3 Description"] || "";
  const media3Tags     = cms["Media Card 3 Tags"]        || "";
  const media3ImageUrl = cms["Media Card 3 Photo URL"]   || "";

  // ─── EXPERIENCE / TIMELINE ───────────────────────────────────────────────────
  const expHeading    = cms["Timeline Section Title"]    || "MY";
  const expSubheading = cms["Timeline Section Subtitle"] || "TIMELINE.";
  const ms1Title  = cms["Timeline 1 Title"]        || "";
  const ms1Org    = cms["Timeline 1 Organization"] || "";
  const ms1Period = cms["Timeline 1 Period"]        || "";
  const ms1Desc   = cms["Timeline 1 Description"]  || "";
  const ms2Title  = cms["Timeline 2 Title"]        || "";
  const ms2Org    = cms["Timeline 2 Organization"] || "";
  const ms2Period = cms["Timeline 2 Period"]        || "";
  const ms2Desc   = cms["Timeline 2 Description"]  || "";
  const ms3Title  = cms["Timeline 3 Title"]        || "";
  const ms3Org    = cms["Timeline 3 Organization"] || "";
  const ms3Period = cms["Timeline 3 Period"]        || "";
  const ms3Desc   = cms["Timeline 3 Description"]  || "";

  // ─── DEPRECATED ARCHIVES ─────────────────────────────────────────────────────
  const archHeading    = cms["Archives Section Title"]    || "DEPRECATED";
  const archSubheading = cms["Archives Section Subtitle"] || "ARCHITECTURES.";
  const arch1Version   = cms["Archive 1 Version"]        || "";
  const arch1Error     = cms["Archive 1 Error Message"]  || "";
  const arch1Desc      = cms["Archive 1 Description"]    || "";

  // ─── TESTIMONIALS ────────────────────────────────────────────────────────────
  const testHeading    = cms["Testimonials Section Title"]    || "THE";
  const testSubheading = cms["Testimonials Section Subtitle"] || "VAULT.";
  const testSubtext    = cms["Testimonials Subtext"]          || "ACCESS ENCRYPTED TESTIMONIALS";
  const t1Name = cms["Testimonial 1 Name"]  || "";
  const t1Role = cms["Testimonial 1 Role"]  || "";
  const t1Text = cms["Testimonial 1 Quote"] || "";
  const t2Name = cms["Testimonial 2 Name"]  || "";
  const t2Role = cms["Testimonial 2 Role"]  || "";
  const t2Text = cms["Testimonial 2 Quote"] || "";
  const t3Name = cms["Testimonial 3 Name"]  || "";
  const t3Role = cms["Testimonial 3 Role"]  || "";
  const t3Text = cms["Testimonial 3 Quote"] || "";

  // ─── CONTACT ─────────────────────────────────────────────────────────────────
  const contactHeading = cms["Contact Section Title"]  || "SAY HELLO.";
  const contactCTA     = cms["Contact Submit Button"]  || "TRANSMIT PAYLOAD";

  // ─── FOOTER ──────────────────────────────────────────────────────────────────
  const footerName    = cms["Footer Name"]           || "NIRANJAN S S";
  const footerMarquee = cms["Footer Scrolling Text"] || "BUILDING BOLD ARCHITECTURES •";
  const footerSysVer  = cms["Footer Version Tag"]    || "SYS.VER: 14.0 // NEO-BRUTALIST POP";

  // ─── TERMINAL PLACEMENT ──────────────────────────────────────────────────────
  const terminalBlock = (
    <RecruiterTerminal
      metricOne={metricsHardware}
      metricTwo={metricsSoftware}
      settings={terminalSettings}
      keyMetricsOverride={[
        { label: km1Label, value: km1Value },
        { label: km2Label, value: km2Value },
        { label: km3Label, value: km3Value },
        { label: km4Label, value: km4Value },
      ].filter(m => m.label && m.value)}
      projectRoiOverride={[
        { label: roi1Label, value: roi1Value },
        { label: roi2Label, value: roi2Value },
        { label: roi3Label, value: roi3Value },
      ].filter(m => m.label && m.value)}
    />
  );

  return (
    <>
      {/* ── Dynamic Google Fonts ── */}
      {googleFontsUrl && (
        <link rel="stylesheet" href={googleFontsUrl} />
      )}

      {/* ── Global CSS Variables injected from Notion theme ── */}
      {globalCss.trim() && (
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      )}

      <main className="relative w-full max-w-[100vw] min-h-screen bg-neocream overflow-x-clip">
        <Navbar brand={navBrand} contactLabel={navContact} />

        <div className="w-full flex flex-col gap-16 md:gap-32 pb-32">
          <Hero
            headline={heroHeadline}
            subtext={heroSubtext}
            cta={heroCTA}
            photoUrl={heroPhotoUrl}
            settings={heroSettings}
          />

          {/* Terminal: "below-hero" placement */}
          {terminalPlacement === "below-hero" && terminalBlock}

          <Skills
            heading={skillsHeading}
            subheading={skillsSubheading}
            skillOverrides={[skill1, skill2, skill3, skill4].filter(Boolean)}
            settings={skillsSettings}
          />

          <Projects
            heading={projectsHeading}
            subheading={projectsSubheading}
            p1Event={p1Event}
            p1Name={p1Name}
            p1Description={p1Description}
            p1Tech={p1Tech ? p1Tech.split(",").map(s => s.trim()).filter(Boolean) : []}
            p1ImageUrl={p1ImageUrl}
            p2Tag={p2Tag}
            p2Name={p2Name}
            p2Description={p2Description}
            settings={projectsSettings}
          />

          <MediaProduction
            heading={mediaHeading}
            subheading={mediaSubheading}
            settings={mediaSettings}
            mediaOverrides={[
              { title: media1Title, desc: media1Desc, tags: media1Tags, imageUrl: media1ImageUrl },
              { title: media2Title, desc: media2Desc, tags: media2Tags, imageUrl: media2ImageUrl },
              { title: media3Title, desc: media3Desc, tags: media3Tags, imageUrl: media3ImageUrl },
            ]}
          />

          <Experience
            heading={expHeading}
            subheading={expSubheading}
            settings={timelineSettings}
            milestoneOverrides={[
              { title: ms1Title, org: ms1Org, period: ms1Period, desc: ms1Desc },
              { title: ms2Title, org: ms2Org, period: ms2Period, desc: ms2Desc },
              { title: ms3Title, org: ms3Org, period: ms3Period, desc: ms3Desc },
            ].filter(m => m.title)}
          />

          <DeprecatedArchive
            heading={archHeading}
            subheading={archSubheading}
            settings={archivesSettings}
            archiveOverrides={[
              { id: "arch1", version: arch1Version, error: arch1Error, description: arch1Desc },
            ].filter(a => a.version)}
          />

          <Testimonials
            heading={testHeading}
            subheading={testSubheading}
            subtext={testSubtext}
            settings={testimonialsSettings}
            testimonialOverrides={[
              { id: "t1", name: t1Name, role: t1Role, text: t1Text },
              { id: "t2", name: t2Name, role: t2Role, text: t2Text },
              { id: "t3", name: t3Name, role: t3Role, text: t3Text },
            ].filter(t => t.name && t.text)}
          />

          <Contact heading={contactHeading} cta={contactCTA} settings={contactSettings} />

          {/* Terminal: "above-footer" placement */}
          {terminalPlacement === "above-footer" && terminalBlock}
        </div>

        <Footer name={footerName} marqueeText={footerMarquee} sysVer={footerSysVer} />
      </main>
    </>
  );
}
