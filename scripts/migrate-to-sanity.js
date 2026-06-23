const { createClient } = require("next-sanity");
require("dotenv").config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌ Missing required environment variables (projectId or token).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const generateKey = () => Math.random().toString(36).substring(2, 9);

const payload = {
  _id: "portfolio",
  _type: "portfolio",

  // ── THEME ────────────────────────────────────────────────────────────────
  globalFont: "Space Grotesk",
  globalBgColor: "#FFF9F0",
  globalTextColor: "#000000",
  accentColorOne: "#FACC15",
  accentColorTwo: "#FF6B9E",

  // ── GLOBAL ───────────────────────────────────────────────────────────────
  navbarBrandName: "niranjan.digital",
  navItems: [
    { _key: generateKey(), label: "SKILLS", targetId: "skills" },
    { _key: generateKey(), label: "PROJECTS", targetId: "projects" },
    { _key: generateKey(), label: "EXPERIENCE", targetId: "timeline" },
    { _key: generateKey(), label: "TESTIMONIALS", targetId: "testimonials" },
  ],
  navbarContactButton: "SAY HELLO",
  footerName: "NIRANJAN S S",
  footerVersionTag: "SYS.VER: 14.0 // NEO-BRUTALIST POP",
  footerScrollingText: "BUILDING BOLD ARCHITECTURES •",

  // ── PAGE BUILDER ─────────────────────────────────────────────────────────
  pageBuilder: [
    {
      _key: generateKey(),
      _type: "sectionHero",
      heroSettings: { _type: "sectionSettings" },
      heroHeadline: "BUILDING BOLD HARDWARE & WEB ARCHITECTURES",
      heroSubtext: "Bridging embedded systems logic with scalable full-stack platforms.",
      heroButtonText: "EXPLORE WORK",
    },
    {
      _key: generateKey(),
      _type: "sectionSkills",
      skillsSettings: { _type: "sectionSettings" },
      skillsSectionTitle: "WHAT I CAN DO",
      skillsSectionSubtitle: "FOR YOU.",
      skillsList: [
        "Embedded Systems",
        "Full-Stack Web Engineering",
        "UI/UX",
        "Digital Media Production",
      ],
    },
    {
      _key: generateKey(),
      _type: "sectionProjects",
      projectsSettings: { _type: "sectionSettings" },
      projectsSectionTitle: "SELECTED",
      projectsSectionSubtitle: "WORKS.",
      projectsList: [
        {
          _key: generateKey(),
          name: "Sustaination",
          description: "A gamified eco-platform designed for the Smart India Hackathon.",
          techStack: "React, Firebase, Tailwind",
          eventTag: "SIH",
        },
        {
          _key: generateKey(),
          name: "Hardware Prototype X",
          description: "Next-generation integrated hardware & frontend systems prototype.",
          techStack: "C++, React, MQTT",
          eventTag: "R&D STAGE",
        },
      ],
    },
    {
      _key: generateKey(),
      _type: "sectionMetrics",
      terminalSettings: { _type: "sectionSettings", customFont: "Space Mono" },
      terminalHardwareMetric: "Logic Gates Built: 7+",
      terminalSoftwareMetric: "Components Rendered: 400+",
      keyMetrics: [
        { _key: generateKey(), label: "FRONTEND DEPLOYMENTS", value: "14+" },
        { _key: generateKey(), label: "HARDWARE PROTOTYPES", value: "7" },
        { _key: generateKey(), label: "UI COMPONENT LIB", value: "100% CUSTOM" },
        { _key: generateKey(), label: "PERFORMANCE SCORE", value: "99/100" },
      ],
      roiMetrics: [
        { _key: generateKey(), label: "USER ENGAGEMENT", value: "+45% AVG" },
        { _key: generateKey(), label: "CODEBASE EFFICIENCY", value: "MODULAR" },
        { _key: generateKey(), label: "DESIGN TO DEV TIME", value: "< 48 HRS" },
      ],
    },
    {
      _key: generateKey(),
      _type: "sectionMedia",
      mediaSettings: { _type: "sectionSettings" },
      mediaSectionTitle: "VISUALS &",
      mediaSectionSubtitle: "MOTION.",
      mediaCards: [
        {
          _key: generateKey(),
          title: "Professional Photography",
          description: "High-contrast, technically composed imagery.",
          tags: "Sony a6400, RAW Format, Lighting Design",
        },
        {
          _key: generateKey(),
          title: "Cinematic Videography",
          description: "Dynamic motion capture with tactical editing.",
          tags: "Color Graded, Premiere Pro / Resolve, Motion Tracking",
        },
        {
          _key: generateKey(),
          title: "Post-Production Editing",
          description: "Advanced color correction and asset refinement.",
          tags: "Photoshop, Lightroom, Object Removal",
        },
      ],
    },
    {
      _key: generateKey(),
      _type: "sectionTimeline",
      timelineSettings: { _type: "sectionSettings" },
      timelineSectionTitle: "MY",
      timelineSectionSubtitle: "TIMELINE.",
      timelineEvents: [
        {
          _key: generateKey(),
          title: "B.Tech ECE Academic Core",
          organization: "MBCET",
          period: "Aug 2025 - Present",
          description: "Navigating rigorous academic frameworks, blending hardware logic with software execution.",
        },
        {
          _key: generateKey(),
          title: "SIH Participant",
          organization: "Smart India Hackathon",
          period: "Sep 2025",
          description: "Architected and deployed the SUSTAINATION gamified eco-platform.",
        },
        {
          _key: generateKey(),
          title: "Technical Fest Executive Coordinator",
          organization: "ENIX Executive Committee",
          period: "Mar 2026",
          description: "Orchestrating cross-functional teams and event infrastructure.",
        },
        {
          _key: generateKey(),
          title: "IEEE Executive Committee",
          organization: "IEEE",
          period: "2025 - Present",
          description: "Coordinating technical events and managing student chapter operations.",
        }
      ],
    },
    {
      _key: generateKey(),
      _type: "sectionArchives",
      archivesSettings: { _type: "sectionSettings" },
      archivesSectionTitle: "DEPRECATED",
      archivesSectionSubtitle: "ARCHITECTURES.",
      archivesList: [
        {
          _key: generateKey(),
          version: "v3.0",
          errorMessage: "WARN: CMS RATE LIMIT EXCEEDED",
          description: "Notion API integration became a bottleneck for deep component-level styling overrides, prompting migration to Sanity.",
        },
        {
          _key: generateKey(),
          version: "v2.0",
          errorMessage: "ERR: MONOLITHIC SPA OVERHEAD",
          description: "Heavy React SPA with unoptimized client-side rendering. Dropped in favor of Next.js Server Components.",
        },
        {
          _key: generateKey(),
          version: "v1.0",
          errorMessage: "FATAL: VISUAL FATIGUE DETECTED",
          description: "First-generation Dark Brutalism experiment. Scrapped due to excessive terminal-style contrast leading to user fatigue.",
        },
      ],
    },
    {
      _key: generateKey(),
      _type: "sectionTestimonials",
      testimonialsSettings: { _type: "sectionSettings" },
      testimonialsSectionTitle: "THE",
      testimonialsSectionSubtitle: "VAULT.",
      testimonialsSubtext: "ACCESS ENCRYPTED TESTIMONIALS",
      testimonialsList: [
        {
          _key: generateKey(),
          name: "[CONFIDENTIAL IDENTITY]",
          role: "Senior Hardware Engineer",
          quote: "Niranjan brings an exceptionally rare intersection of hardware-level comprehension and modern web frontend fluency.",
        },
        {
          _key: generateKey(),
          name: "[CONFIDENTIAL IDENTITY]",
          role: "Lead UI Designer",
          quote: "The interfaces he ships are flawless — mechanically snappy, visually unapologetic, and technically error-free.",
        },
        {
          _key: generateKey(),
          name: "[CONFIDENTIAL IDENTITY]",
          role: "Hackathon Organizer",
          quote: "Watching the SUSTAINATION platform scale under massive concurrent load during the Hackathon was incredible.",
        },
      ],
    },
    {
      _key: generateKey(),
      _type: "sectionContact",
      contactSettings: { _type: "sectionSettings" },
      contactSectionTitle: "SAY HELLO.",
      contactSubmitButton: "TRANSMIT PAYLOAD",
    },
  ],
};

async function migrateData() {
  console.log("🚀 Starting Sanity migration to Modular Page Builder...");
  try {
    const result = await client.createOrReplace(payload);
    console.log("✅ Successfully rebuilt Sanity CMS document! All orphaned fields have been purged.");
    console.log(`📝 Document ID: ${result._id}`);
  } catch (error) {
    console.error("❌ Migration failed:");
    console.error(error);
  }
}

migrateData();
