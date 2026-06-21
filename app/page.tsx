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

export const revalidate = 60;

export default async function Home() {
  const cms = await fetchPortfolioContent();

  // ─── NAVBAR ─────────────────────────────────────────────────────────────────
  const navBrand    = cms["navBrand"]    || "niranjan.digital";
  const navContact  = cms["navContact"]  || "SAY HELLO";

  // ─── HERO ───────────────────────────────────────────────────────────────────
  const heroHeadline = cms["heroHeadline"] || "BUILDING BOLD HARDWARE & WEB ARCHITECTURES";
  const heroSubtext  = cms["heroSubtext"]  || "Bridging embedded systems logic with scalable full-stack platforms.";
  const heroCTA      = cms["heroCTA"]      || "EXPLORE WORK";

  // ─── SKILLS ─────────────────────────────────────────────────────────────────
  const skillsHeading = cms["skillsHeading"] || "WHAT I CAN DO";
  const skillsSubheading = cms["skillsSubheading"] || "FOR YOU.";
  const skill1 = cms["skill1"] || "";
  const skill2 = cms["skill2"] || "";
  const skill3 = cms["skill3"] || "";
  const skill4 = cms["skill4"] || "";

  // ─── PROJECTS ───────────────────────────────────────────────────────────────
  const projectsHeading    = cms["projectsHeading"]    || "SELECTED";
  const projectsSubheading = cms["projectsSubheading"] || "WORKS.";
  const p1Event       = cms["p1Event"]       || "";
  const p1Name        = cms["p1Name"]        || "";
  const p1Description = cms["p1Description"] || "";
  const p1Tech        = cms["p1Tech"]        || ""; // comma-separated
  const p2Tag         = cms["p2Tag"]         || "R&D STAGE";
  const p2Name        = cms["p2Name"]        || "[UNANNOUNCED]";
  const p2Description = cms["p2Description"] || "Next-generation integrated hardware & frontend systems prototype currently in internal development.";

  // ─── RECRUITER TERMINAL ──────────────────────────────────────────────────────
  const metricsHardware = cms["metricsHardware"] || "Logic Gates Built: XX";
  const metricsSoftware = cms["metricsSoftware"] || "Components Rendered: XX";
  const roi1Label = cms["roi1Label"] || "";
  const roi1Value = cms["roi1Value"] || "";
  const roi2Label = cms["roi2Label"] || "";
  const roi2Value = cms["roi2Value"] || "";
  const roi3Label = cms["roi3Label"] || "";
  const roi3Value = cms["roi3Value"] || "";
  const km1Label  = cms["km1Label"]  || "";
  const km1Value  = cms["km1Value"]  || "";
  const km2Label  = cms["km2Label"]  || "";
  const km2Value  = cms["km2Value"]  || "";
  const km3Label  = cms["km3Label"]  || "";
  const km3Value  = cms["km3Value"]  || "";
  const km4Label  = cms["km4Label"]  || "";
  const km4Value  = cms["km4Value"]  || "";

  // ─── MEDIA PRODUCTION ────────────────────────────────────────────────────────
  const mediaHeading    = cms["mediaHeading"]    || "VISUALS &";
  const mediaSubheading = cms["mediaSubheading"] || "MOTION.";
  const media1Title = cms["media1Title"] || "";
  const media1Desc  = cms["media1Desc"]  || "";
  const media1Tags  = cms["media1Tags"]  || ""; // comma-separated
  const media2Title = cms["media2Title"] || "";
  const media2Desc  = cms["media2Desc"]  || "";
  const media2Tags  = cms["media2Tags"]  || "";
  const media3Title = cms["media3Title"] || "";
  const media3Desc  = cms["media3Desc"]  || "";
  const media3Tags  = cms["media3Tags"]  || "";

  // ─── EXPERIENCE / TIMELINE ───────────────────────────────────────────────────
  const expHeading    = cms["expHeading"]    || "MY";
  const expSubheading = cms["expSubheading"] || "TIMELINE.";
  const ms1Title  = cms["ms1Title"]  || "";
  const ms1Org    = cms["ms1Org"]    || "";
  const ms1Period = cms["ms1Period"] || "";
  const ms1Desc   = cms["ms1Desc"]   || "";
  const ms2Title  = cms["ms2Title"]  || "";
  const ms2Org    = cms["ms2Org"]    || "";
  const ms2Period = cms["ms2Period"] || "";
  const ms2Desc   = cms["ms2Desc"]   || "";
  const ms3Title  = cms["ms3Title"]  || "";
  const ms3Org    = cms["ms3Org"]    || "";
  const ms3Period = cms["ms3Period"] || "";
  const ms3Desc   = cms["ms3Desc"]   || "";

  // ─── DEPRECATED ARCHIVES ─────────────────────────────────────────────────────
  const archHeading    = cms["archHeading"]    || "DEPRECATED";
  const archSubheading = cms["archSubheading"] || "ARCHITECTURES.";
  const arch1Version = cms["arch1Version"] || "";
  const arch1Error   = cms["arch1Error"]   || "";
  const arch1Desc    = cms["arch1Desc"]    || "";

  // ─── TESTIMONIALS ────────────────────────────────────────────────────────────
  const testHeading    = cms["testHeading"]    || "THE";
  const testSubheading = cms["testSubheading"] || "VAULT.";
  const testSubtext    = cms["testSubtext"]    || "ACCESS ENCRYPTED TESTIMONIALS";
  const t1Name = cms["t1Name"] || "";
  const t1Role = cms["t1Role"] || "";
  const t1Text = cms["t1Text"] || "";
  const t2Name = cms["t2Name"] || "";
  const t2Role = cms["t2Role"] || "";
  const t2Text = cms["t2Text"] || "";
  const t3Name = cms["t3Name"] || "";
  const t3Role = cms["t3Role"] || "";
  const t3Text = cms["t3Text"] || "";

  // ─── CONTACT ─────────────────────────────────────────────────────────────────
  const contactHeading = cms["contactHeading"] || "SAY HELLO.";
  const contactCTA     = cms["contactCTA"]     || "TRANSMIT PAYLOAD";

  // ─── FOOTER ──────────────────────────────────────────────────────────────────
  const footerName    = cms["footerName"]    || "NIRANJAN S S";
  const footerMarquee = cms["footerMarquee"] || "BUILDING BOLD ARCHITECTURES •";
  const footerSysVer  = cms["footerSysVer"]  || "SYS.VER: 14.0 // NEO-BRUTALIST POP";

  return (
    <main className="relative w-full max-w-[100vw] min-h-screen bg-neocream overflow-x-clip">
      <Navbar brand={navBrand} contactLabel={navContact} />

      <div className="w-full flex flex-col gap-16 md:gap-32 pb-32">
        <Hero headline={heroHeadline} subtext={heroSubtext} cta={heroCTA} />

        <Skills
          heading={skillsHeading}
          subheading={skillsSubheading}
          skillOverrides={[skill1, skill2, skill3, skill4].filter(Boolean)}
        />

        <Projects
          heading={projectsHeading}
          subheading={projectsSubheading}
          p1Event={p1Event}
          p1Name={p1Name}
          p1Description={p1Description}
          p1Tech={p1Tech ? p1Tech.split(",").map(s => s.trim()).filter(Boolean) : []}
          p2Tag={p2Tag}
          p2Name={p2Name}
          p2Description={p2Description}
        />

        <RecruiterTerminal
          metricOne={metricsHardware}
          metricTwo={metricsSoftware}
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

        <MediaProduction
          heading={mediaHeading}
          subheading={mediaSubheading}
          mediaOverrides={[
            { title: media1Title, desc: media1Desc, tags: media1Tags },
            { title: media2Title, desc: media2Desc, tags: media2Tags },
            { title: media3Title, desc: media3Desc, tags: media3Tags },
          ]}
        />

        <Experience
          heading={expHeading}
          subheading={expSubheading}
          milestoneOverrides={[
            { title: ms1Title, org: ms1Org, period: ms1Period, desc: ms1Desc },
            { title: ms2Title, org: ms2Org, period: ms2Period, desc: ms2Desc },
            { title: ms3Title, org: ms3Org, period: ms3Period, desc: ms3Desc },
          ].filter(m => m.title)}
        />

        <DeprecatedArchive
          heading={archHeading}
          subheading={archSubheading}
          archiveOverrides={[
            { id: "arch1", version: arch1Version, error: arch1Error, description: arch1Desc },
          ].filter(a => a.version)}
        />

        <Testimonials
          heading={testHeading}
          subheading={testSubheading}
          subtext={testSubtext}
          testimonialOverrides={[
            { id: "t1", name: t1Name, role: t1Role, text: t1Text },
            { id: "t2", name: t2Name, role: t2Role, text: t2Text },
            { id: "t3", name: t3Name, role: t3Role, text: t3Text },
          ].filter(t => t.name && t.text)}
        />

        <Contact heading={contactHeading} cta={contactCTA} />
      </div>

      <Footer name={footerName} marqueeText={footerMarquee} sysVer={footerSysVer} />
    </main>
  );
}
