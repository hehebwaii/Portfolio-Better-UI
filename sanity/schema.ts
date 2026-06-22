import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE: sectionSettings object
// Applied to every section so every block on the page is independently stylable.
// ─────────────────────────────────────────────────────────────────────────────
const sectionSettings = defineType({
  name: "sectionSettings",
  title: "Style Overrides",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "customFont",
      title: "Custom Font",
      type: "string",
      description: "Any Google Font name (e.g. Anton, Syne, Outfit). Leave blank to use Global Font.",
      placeholder: "e.g. Anton",
    }),
    defineField({
      name: "fontSizeDesktop",
      title: "Heading Font Size (Desktop)",
      type: "string",
      description: "Overrides the section heading size. e.g. 7rem, 120px",
      placeholder: "e.g. 7rem",
    }),
    defineField({
      name: "fontSizeMobile",
      title: "Heading Font Size (Mobile)",
      type: "string",
      description: "Mobile heading size override. e.g. 3rem",
      placeholder: "e.g. 3rem",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      description: "Hex color code. Overrides the section background. e.g. #000000",
      placeholder: "e.g. #000000",
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "string",
      description: "Hex color code. Sets all text color within this section. e.g. #FFFFFF",
      placeholder: "e.g. #FFFFFF",
    }),
    defineField({
      name: "alignment",
      title: "Content Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
  ],
});

// ─────────────────────────────────────────────────────────────────────────────
// SINGLETON: portfolio document
// ─────────────────────────────────────────────────────────────────────────────
const portfolio = defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  groups: [
    { name: "theme",        title: "🎨 Global Theme" },
    { name: "layout",       title: "📐 Global Layout" },
    { name: "global",       title: "🌐 Navbar & Footer" },
    { name: "hero",         title: "🦸 Hero" },
    { name: "skills",       title: "⚡ Skills" },
    { name: "projects",     title: "🚀 Projects" },
    { name: "terminal",     title: "💻 Recruiter Terminal" },
    { name: "media",        title: "📸 Media Production" },
    { name: "timeline",     title: "📅 Timeline / Experience" },
    { name: "archives",     title: "🗃️ Deprecated Archives" },
    { name: "testimonials", title: "💬 Testimonials" },
    { name: "contact",      title: "✉️ Contact" },
  ],
  fields: [

    // ── THEME ────────────────────────────────────────────────────────────────
    defineField({
      name: "globalFont",
      title: "Global Font",
      type: "string",
      group: "theme",
      description: "Any Google Font name applied site-wide. e.g. Space Grotesk, Inter, Syne",
      initialValue: "Space Grotesk",
    }),
    defineField({
      name: "globalBgColor",
      title: "Global Background Color",
      type: "string",
      group: "theme",
      description: "Hex code for the site-wide background. e.g. #FFF9F0",
      initialValue: "#FFF9F0",
    }),
    defineField({
      name: "globalTextColor",
      title: "Global Text Color",
      type: "string",
      group: "theme",
      description: "Hex code for the site-wide text color. e.g. #000000",
      initialValue: "#000000",
    }),
    defineField({
      name: "accentColorOne",
      title: "Accent Color One",
      type: "string",
      group: "theme",
      description: "Primary accent injected as CSS var --accent-1. e.g. #FACC15",
      initialValue: "#FACC15",
    }),
    defineField({
      name: "accentColorTwo",
      title: "Accent Color Two",
      type: "string",
      group: "theme",
      description: "Secondary accent injected as CSS var --accent-2. e.g. #FF6B9E",
      initialValue: "#FF6B9E",
    }),

    // ── LAYOUT ───────────────────────────────────────────────────────────────
    defineField({
      name: "sectionOrder",
      title: "Section Rendering Order",
      type: "array",
      group: "layout",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Hero", value: "Hero" },
          { title: "Skills", value: "Skills" },
          { title: "Projects", value: "Projects" },
          { title: "Recruiter Terminal (Metrics)", value: "Metrics" },
          { title: "Media Production", value: "Media" },
          { title: "Timeline / Experience", value: "Timeline" },
          { title: "Deprecated Archives", value: "Archives" },
          { title: "Testimonials", value: "Testimonials" },
          { title: "Contact", value: "Contact" },
        ],
      },
      description: "Drag and drop to reorder the sections on your website. Remove a section to hide it.",
      initialValue: [
        "Hero",
        "Skills",
        "Projects",
        "Metrics",
        "Media",
        "Timeline",
        "Archives",
        "Testimonials",
        "Contact",
      ],
    }),
    defineField({
      name: "terminalPlacement",
      title: "Terminal Placement (Legacy)",
      type: "string",
      group: "layout",
      description: "Deprecated: Use Section Ordering above. Where the Recruiter Terminal block appears.",
      initialValue: "below-hero",
      options: {
        list: [
          { title: "Below Hero", value: "below-hero" },
          { title: "Above Footer", value: "above-footer" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),

    // ── GLOBAL: NAVBAR & FOOTER ──────────────────────────────────────────────
    defineField({
      name: "navbarBrandName",
      title: "Navbar Brand Name",
      type: "string",
      group: "global",
      initialValue: "niranjan.digital",
    }),
    defineField({
      name: "navbarContactButton",
      title: "Navbar Contact Button Label",
      type: "string",
      group: "global",
      initialValue: "SAY HELLO",
    }),
    defineField({
      name: "footerName",
      title: "Footer Name",
      type: "string",
      group: "global",
      initialValue: "NIRANJAN S S",
    }),
    defineField({
      name: "footerVersionTag",
      title: "Footer Version Tag",
      type: "string",
      group: "global",
      initialValue: "SYS.VER: 14.0 // NEO-BRUTALIST POP",
    }),
    defineField({
      name: "footerScrollingText",
      title: "Footer Scrolling Marquee Text",
      type: "string",
      group: "global",
      initialValue: "BUILDING BOLD ARCHITECTURES •",
    }),

    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "heroSettings",
      title: "Hero Style Overrides",
      type: "sectionSettings",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "string",
      group: "hero",
      initialValue: "BUILDING BOLD HARDWARE & WEB ARCHITECTURES",
    }),
    defineField({
      name: "heroSubtext",
      title: "Subtext",
      type: "text",
      rows: 2,
      group: "hero",
      initialValue: "Bridging embedded systems logic with scalable full-stack platforms.",
    }),
    defineField({
      name: "heroButtonText",
      title: "CTA Button Text",
      type: "string",
      group: "hero",
      initialValue: "EXPLORE WORK",
    }),
    defineField({
      name: "heroProfilePhoto",
      title: "Profile Photo",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Your profile photo. Replaces the 3D canvas when set.",
    }),

    // ── SKILLS ───────────────────────────────────────────────────────────────
    defineField({
      name: "skillsSettings",
      title: "Skills Style Overrides",
      type: "sectionSettings",
      group: "skills",
    }),
    defineField({
      name: "skillsSectionTitle",
      title: "Section Title",
      type: "string",
      group: "skills",
      initialValue: "WHAT I CAN DO",
    }),
    defineField({
      name: "skillsSectionSubtitle",
      title: "Section Subtitle",
      type: "string",
      group: "skills",
      initialValue: "FOR YOU.",
    }),
    defineField({
      name: "skillsList",
      title: "Skills",
      type: "array",
      group: "skills",
      of: [defineArrayMember({ type: "string" })],
      description: "Each item is one skill card. Add up to 4.",
      initialValue: [
        "Embedded Systems",
        "Full-Stack Web Engineering",
        "UI/UX",
        "Digital Media Production",
      ],
    }),

    // ── PROJECTS ─────────────────────────────────────────────────────────────
    defineField({
      name: "projectsSettings",
      title: "Projects Style Overrides",
      type: "sectionSettings",
      group: "projects",
    }),
    defineField({
      name: "projectsSectionTitle",
      title: "Section Title",
      type: "string",
      group: "projects",
      initialValue: "SELECTED",
    }),
    defineField({
      name: "projectsSectionSubtitle",
      title: "Section Subtitle",
      type: "string",
      group: "projects",
      initialValue: "WORKS.",
    }),
    defineField({
      name: "projectsList",
      title: "Projects",
      type: "array",
      group: "projects",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name",        title: "Project Name",    type: "string" }),
            defineField({ name: "description", title: "Description",     type: "text", rows: 3 }),
            defineField({ name: "techStack",   title: "Tech Stack",      type: "string", description: "Comma-separated. e.g. React, Firestore, TailwindCSS" }),
            defineField({ name: "eventTag",    title: "Event Tag",       type: "string", description: "e.g. Smart India Hackathon (SIH)" }),
            defineField({ name: "screenshot",  title: "Screenshot",      type: "image", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "name", subtitle: "eventTag" },
          },
        }),
      ],
    }),

    // ── RECRUITER TERMINAL ────────────────────────────────────────────────────
    defineField({
      name: "terminalSettings",
      title: "Terminal Style Overrides",
      type: "sectionSettings",
      group: "terminal",
    }),
    defineField({
      name: "terminalHardwareMetric",
      title: "Hardware Metric Line",
      type: "string",
      group: "terminal",
      initialValue: "Logic Gates Built: 7+",
    }),
    defineField({
      name: "terminalSoftwareMetric",
      title: "Software Metric Line",
      type: "string",
      group: "terminal",
      initialValue: "Components Rendered: 400+",
    }),
    defineField({
      name: "keyMetrics",
      title: "Key Metrics",
      type: "array",
      group: "terminal",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
      initialValue: [
        { label: "FRONTEND DEPLOYMENTS", value: "14+" },
        { label: "HARDWARE PROTOTYPES",  value: "7"   },
        { label: "UI COMPONENT LIB",     value: "100% CUSTOM" },
        { label: "PERFORMANCE SCORE",    value: "99/100" },
      ],
    }),
    defineField({
      name: "roiMetrics",
      title: "Project ROI Metrics",
      type: "array",
      group: "terminal",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
      initialValue: [
        { label: "USER ENGAGEMENT",    value: "+45% AVG" },
        { label: "CODEBASE EFFICIENCY", value: "MODULAR" },
        { label: "DESIGN TO DEV TIME", value: "< 48 HRS" },
      ],
    }),

    // ── MEDIA PRODUCTION ─────────────────────────────────────────────────────
    defineField({
      name: "mediaSettings",
      title: "Media Style Overrides",
      type: "sectionSettings",
      group: "media",
    }),
    defineField({
      name: "mediaSectionTitle",
      title: "Section Title",
      type: "string",
      group: "media",
      initialValue: "VISUALS &",
    }),
    defineField({
      name: "mediaSectionSubtitle",
      title: "Section Subtitle",
      type: "string",
      group: "media",
      initialValue: "MOTION.",
    }),
    defineField({
      name: "mediaCards",
      title: "Media Cards",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title",       title: "Card Title",   type: "string" }),
            defineField({ name: "description", title: "Description",  type: "text", rows: 2 }),
            defineField({ name: "tags",        title: "Tags",         type: "string", description: "Comma-separated. e.g. Sony a6400, RAW Format" }),
            defineField({ name: "photo",       title: "Card Photo",   type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      initialValue: [
        { title: "Professional Photography",  description: "High-contrast, technically composed imagery.", tags: "Sony a6400, RAW Format, Lighting Design" },
        { title: "Cinematic Videography",     description: "Dynamic motion capture with tactical editing.", tags: "Color Graded, Premiere Pro / Resolve, Motion Tracking" },
        { title: "Post-Production Editing",   description: "Advanced color correction and asset refinement.", tags: "Photoshop, Lightroom, Object Removal" },
      ],
    }),

    // ── TIMELINE ─────────────────────────────────────────────────────────────
    defineField({
      name: "timelineSettings",
      title: "Timeline Style Overrides",
      type: "sectionSettings",
      group: "timeline",
    }),
    defineField({
      name: "timelineSectionTitle",
      title: "Section Title",
      type: "string",
      group: "timeline",
      initialValue: "MY",
    }),
    defineField({
      name: "timelineSectionSubtitle",
      title: "Section Subtitle",
      type: "string",
      group: "timeline",
      initialValue: "TIMELINE.",
    }),
    defineField({
      name: "timelineEvents",
      title: "Timeline Events",
      type: "array",
      group: "timeline",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title",        title: "Role / Title",    type: "string" }),
            defineField({ name: "organization", title: "Organization",    type: "string" }),
            defineField({ name: "period",       title: "Period",          type: "string", description: "e.g. Aug 2025 - Present" }),
            defineField({ name: "description",  title: "Description",     type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "organization" } },
        }),
      ],
      initialValue: [
        { title: "B.Tech ECE Academic Core",              organization: "MBCET",                       period: "Aug 2025 - Present", description: "Navigating rigorous academic frameworks, blending hardware logic with software execution." },
        { title: "SIH Participant",                       organization: "Smart India Hackathon",       period: "Sep 2025",           description: "Architected and deployed the SUSTAINATION gamified eco-platform." },
        { title: "Technical Fest Executive Coordinator", organization: "ENIX Executive Committee",    period: "Mar 2026",           description: "Orchestrating cross-functional teams and event infrastructure." },
      ],
    }),

    // ── DEPRECATED ARCHIVES ───────────────────────────────────────────────────
    defineField({
      name: "archivesSettings",
      title: "Archives Style Overrides",
      type: "sectionSettings",
      group: "archives",
    }),
    defineField({
      name: "archivesSectionTitle",
      title: "Section Title",
      type: "string",
      group: "archives",
      initialValue: "DEPRECATED",
    }),
    defineField({
      name: "archivesSectionSubtitle",
      title: "Section Subtitle",
      type: "string",
      group: "archives",
      initialValue: "ARCHITECTURES.",
    }),
    defineField({
      name: "archivesList",
      title: "Archives",
      type: "array",
      group: "archives",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "version",      title: "Version Tag",    type: "string", description: "e.g. v1.0" }),
            defineField({ name: "errorMessage", title: "Error Message",  type: "string", description: "e.g. FATAL: VISUAL FATIGUE DETECTED" }),
            defineField({ name: "description",  title: "Description",    type: "text", rows: 2 }),
          ],
          preview: { select: { title: "version", subtitle: "errorMessage" } },
        }),
      ],
      initialValue: [
        { version: "v1.0", errorMessage: "FATAL: VISUAL FATIGUE DETECTED", description: "First-generation Dark Brutalism experiment. Scrapped due to excessive terminal-style contrast leading to user fatigue." },
      ],
    }),

    // ── TESTIMONIALS ──────────────────────────────────────────────────────────
    defineField({
      name: "testimonialsSettings",
      title: "Testimonials Style Overrides",
      type: "sectionSettings",
      group: "testimonials",
    }),
    defineField({
      name: "testimonialsSectionTitle",
      title: "Section Title",
      type: "string",
      group: "testimonials",
      initialValue: "THE",
    }),
    defineField({
      name: "testimonialsSectionSubtitle",
      title: "Section Subtitle",
      type: "string",
      group: "testimonials",
      initialValue: "VAULT.",
    }),
    defineField({
      name: "testimonialsSubtext",
      title: "Subtext (below heading)",
      type: "string",
      group: "testimonials",
      initialValue: "ACCESS ENCRYPTED TESTIMONIALS",
    }),
    defineField({
      name: "testimonialsList",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name",  title: "Name (or alias)",  type: "string" }),
            defineField({ name: "role",  title: "Role / Title",     type: "string" }),
            defineField({ name: "quote", title: "Quote",            type: "text", rows: 3 }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
      initialValue: [
        { name: "[CONFIDENTIAL IDENTITY]", role: "Senior Hardware Engineer", quote: "Niranjan brings an exceptionally rare intersection of hardware-level comprehension and modern web frontend fluency." },
        { name: "[CONFIDENTIAL IDENTITY]", role: "Lead UI Designer",         quote: "The interfaces he ships are flawless — mechanically snappy, visually unapologetic, and technically error-free." },
        { name: "[CONFIDENTIAL IDENTITY]", role: "Hackathon Organizer",      quote: "Watching the SUSTAINATION platform scale under massive concurrent load during the Hackathon was incredible." },
      ],
    }),

    // ── CONTACT ───────────────────────────────────────────────────────────────
    defineField({
      name: "contactSettings",
      title: "Contact Style Overrides",
      type: "sectionSettings",
      group: "contact",
    }),
    defineField({
      name: "contactSectionTitle",
      title: "Section Title",
      type: "string",
      group: "contact",
      initialValue: "SAY HELLO.",
    }),
    defineField({
      name: "contactSubmitButton",
      title: "Submit Button Label",
      type: "string",
      group: "contact",
      initialValue: "TRANSMIT PAYLOAD",
    }),
  ],
});

export const portfolioSchema = [sectionSettings, portfolio];
