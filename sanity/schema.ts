import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE: sectionSettings object
// ─────────────────────────────────────────────────────────────────────────────
const sectionSettings = defineType({
  name: "sectionSettings",
  title: "Style Overrides",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "sectionId", title: "Section ID (for Navbar anchors)", type: "string", description: "e.g. 'about', 'work', 'contact'. Leave blank if unneeded." }),
    defineField({ name: "customFont", title: "Custom Font", type: "string" }),
    defineField({ name: "fontSizeDesktop", title: "Heading Font Size (Desktop)", type: "string" }),
    defineField({ name: "fontSizeMobile", title: "Heading Font Size (Mobile)", type: "string" }),
    defineField({ name: "backgroundColor", title: "Background Color", type: "string" }),
    defineField({ name: "textColor", title: "Text Color", type: "string" }),
    defineField({
      name: "alignment",
      title: "Content Alignment",
      type: "string",
      options: { list: ["left", "center", "right"], layout: "radio", direction: "horizontal" },
    }),
  ],
});

// ─────────────────────────────────────────────────────────────────────────────
// SANDBOX MICRO-SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────
const sandboxTextBlock = defineType({
  name: "sandboxTextBlock",
  title: "Text Block",
  type: "object",
  fields: [
    defineField({ name: "content", title: "Content", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "content" }, prepare({ title }) { return { title: `Text: ${title ? title.substring(0, 20) : "Empty"}` } } }
});

const sandboxSingleMetric = defineType({
  name: "sandboxSingleMetric",
  title: "Single Metric",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "value", title: "Value", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "value" } }
});

const sandboxMediaCard = defineType({
  name: "sandboxMediaCard",
  title: "Media Card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "title" } }
});

const sandboxProjectCard = defineType({
  name: "sandboxProjectCard",
  title: "Project Card",
  type: "object",
  fields: [
    defineField({ name: "projectName", title: "Project Name", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "projectName" } }
});

// ─────────────────────────────────────────────────────────────────────────────
// STANDALONE SECTION OBJECTS (All Fields Optional)
// ─────────────────────────────────────────────────────────────────────────────

const sectionHero = defineType({
  name: "sectionHero",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "heroSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string" }),
    defineField({ name: "heroSubtext", title: "Subtext", type: "text", rows: 2 }),
    defineField({ name: "heroButtonText", title: "CTA Button Text", type: "string" }),
    defineField({ name: "heroProfilePhoto", title: "Profile Photo", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "heroHeadline" }, prepare(selection) { return { title: `Hero: ${selection.title || "Untitled"}` }; } },
});

const sectionSkills = defineType({
  name: "sectionSkills",
  title: "Skills Section",
  type: "object",
  fields: [
    defineField({ name: "skillsSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "skillsSectionTitle", title: "Section Title", type: "string" }),
    defineField({ name: "skillsSectionSubtitle", title: "Section Subtitle", type: "string" }),
    defineField({ name: "skillsList", title: "Skills", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { select: { title: "skillsSectionTitle" }, prepare(selection) { return { title: `Skills: ${selection.title || "Untitled"}` }; } },
});

const sectionProjects = defineType({
  name: "sectionProjects",
  title: "Projects Section",
  type: "object",
  fields: [
    defineField({ name: "projectsSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "projectsSectionTitle", title: "Section Title", type: "string" }),
    defineField({ name: "projectsSectionSubtitle", title: "Section Subtitle", type: "string" }),
    defineField({
      name: "projectsList",
      title: "Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Project Name", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "techStack", title: "Tech Stack", type: "string" }),
            defineField({ name: "eventTag", title: "Event Tag", type: "string" }),
            defineField({ name: "screenshot", title: "Screenshot", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "eventTag" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "projectsSectionTitle" }, prepare(selection) { return { title: `Projects: ${selection.title || "Untitled"}` }; } },
});

const sectionMetrics = defineType({
  name: "sectionMetrics",
  title: "Recruiter Terminal",
  type: "object",
  fields: [
    defineField({ name: "terminalSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "terminalHardwareMetric", title: "Hardware Metric Line", type: "string" }),
    defineField({ name: "terminalSoftwareMetric", title: "Software Metric Line", type: "string" }),
    defineField({
      name: "keyMetrics",
      title: "Key Metrics",
      type: "array",
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
    }),
    defineField({
      name: "roiMetrics",
      title: "Project ROI Metrics",
      type: "array",
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
    }),
  ],
  preview: { prepare() { return { title: `Recruiter Terminal` }; } },
});

const sectionMedia = defineType({
  name: "sectionMedia",
  title: "Media Production Section",
  type: "object",
  fields: [
    defineField({ name: "mediaSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "mediaSectionTitle", title: "Section Title", type: "string" }),
    defineField({ name: "mediaSectionSubtitle", title: "Section Subtitle", type: "string" }),
    defineField({
      name: "mediaCards",
      title: "Media Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({ name: "tags", title: "Tags", type: "string" }),
            defineField({ name: "photo", title: "Card Photo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "mediaSectionTitle" }, prepare(selection) { return { title: `Media: ${selection.title || "Untitled"}` }; } },
});

const sectionTimeline = defineType({
  name: "sectionTimeline",
  title: "Timeline Section",
  type: "object",
  fields: [
    defineField({ name: "timelineSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "timelineSectionTitle", title: "Section Title", type: "string" }),
    defineField({ name: "timelineSectionSubtitle", title: "Section Subtitle", type: "string" }),
    defineField({
      name: "timelineEvents",
      title: "Timeline Events",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Role / Title", type: "string" }),
            defineField({ name: "organization", title: "Organization", type: "string" }),
            defineField({ name: "period", title: "Period", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "organization" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "timelineSectionTitle" }, prepare(selection) { return { title: `Timeline: ${selection.title || "Untitled"}` }; } },
});

const sectionArchives = defineType({
  name: "sectionArchives",
  title: "Archives Section",
  type: "object",
  fields: [
    defineField({ name: "archivesSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "archivesSectionTitle", title: "Section Title", type: "string" }),
    defineField({ name: "archivesSectionSubtitle", title: "Section Subtitle", type: "string" }),
    defineField({
      name: "archivesList",
      title: "Archives",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "version", title: "Version Tag", type: "string" }),
            defineField({ name: "errorMessage", title: "Error Message", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "version", subtitle: "errorMessage" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "archivesSectionTitle" }, prepare(selection) { return { title: `Archives: ${selection.title || "Untitled"}` }; } },
});

const sectionTestimonials = defineType({
  name: "sectionTestimonials",
  title: "Testimonials Section",
  type: "object",
  fields: [
    defineField({ name: "testimonialsSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "testimonialsSectionTitle", title: "Section Title", type: "string" }),
    defineField({ name: "testimonialsSectionSubtitle", title: "Section Subtitle", type: "string" }),
    defineField({ name: "testimonialsSubtext", title: "Subtext", type: "string" }),
    defineField({
      name: "testimonialsList",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "name", subtitle: "role" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "testimonialsSectionTitle" }, prepare(selection) { return { title: `Testimonials: ${selection.title || "Untitled"}` }; } },
});

const sectionContact = defineType({
  name: "sectionContact",
  title: "Contact Section",
  type: "object",
  fields: [
    defineField({ name: "contactSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({ name: "contactSectionTitle", title: "Section Title", type: "string" }),
    defineField({ name: "contactSubmitButton", title: "Submit Button Label", type: "string" }),
  ],
  preview: { select: { title: "contactSectionTitle" }, prepare(selection) { return { title: `Contact: ${selection.title || "Untitled"}` }; } },
});

const sectionSandbox = defineType({
  name: "sectionSandbox",
  title: "Sandbox Section",
  type: "object",
  fields: [
    defineField({ name: "sandboxSettings", title: "Style Overrides", type: "sectionSettings" }),
    defineField({
      name: "elements",
      title: "Sandbox Elements",
      type: "array",
      of: [
        { type: "sandboxTextBlock" },
        { type: "sandboxSingleMetric" },
        { type: "sandboxMediaCard" },
        { type: "sandboxProjectCard" },
      ],
    }),
  ],
  preview: { prepare() { return { title: `Sandbox` }; } },
});

// ─────────────────────────────────────────────────────────────────────────────
// SINGLETON: portfolio document
// ─────────────────────────────────────────────────────────────────────────────
const portfolio = defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  groups: [
    { name: "theme", title: "🎨 Global Theme" },
    { name: "global", title: "🌐 Navbar & Footer" },
    { name: "content", title: "📄 Page Builder" },
  ],
  fields: [
    // ── THEME ────────────────────────────────────────────────────────────────
    defineField({ name: "globalFont", title: "Global Font", type: "string", group: "theme", initialValue: "Space Grotesk" }),
    defineField({ name: "globalBgColor", title: "Global Background Color", type: "string", group: "theme", initialValue: "#FFF9F0" }),
    defineField({ name: "globalTextColor", title: "Global Text Color", type: "string", group: "theme", initialValue: "#000000" }),
    defineField({ name: "accentColorOne", title: "Accent Color One", type: "string", group: "theme", initialValue: "#FACC15" }),
    defineField({ name: "accentColorTwo", title: "Accent Color Two", type: "string", group: "theme", initialValue: "#FF6B9E" }),

    // ── GLOBAL: NAVBAR & FOOTER ──────────────────────────────────────────────
    defineField({ name: "navbarBrandName", title: "Navbar Brand Name", type: "string", group: "global", initialValue: "niranjan.digital" }),
    defineField({
      name: "navItems",
      title: "Navbar Links",
      type: "array",
      group: "global",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "targetId", title: "Target Section ID", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "resumeFile", title: "Resume (PDF)", type: "file", group: "global" }),
    defineField({ name: "navbarContactButton", title: "Navbar Contact Button Label", type: "string", group: "global", initialValue: "SAY HELLO" }),
    defineField({ name: "footerName", title: "Footer Name", type: "string", group: "global", initialValue: "NIRANJAN S S" }),
    defineField({ name: "footerVersionTag", title: "Footer Version Tag", type: "string", group: "global", initialValue: "SYS.VER: 14.0 // NEO-BRUTALIST POP" }),
    defineField({ name: "footerScrollingText", title: "Footer Scrolling Marquee Text", type: "string", group: "global", initialValue: "BUILDING BOLD ARCHITECTURES •" }),

    // ── PAGE BUILDER ─────────────────────────────────────────────────────────
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      group: "content",
      of: [
        { type: "sectionHero" },
        { type: "sectionSkills" },
        { type: "sectionProjects" },
        { type: "sectionMetrics" },
        { type: "sectionMedia" },
        { type: "sectionTimeline" },
        { type: "sectionArchives" },
        { type: "sectionTestimonials" },
        { type: "sectionContact" },
        { type: "sectionSandbox" },
      ],
    }),
  ],
});

export const portfolioSchema = [
  sectionSettings,
  sandboxTextBlock,
  sandboxSingleMetric,
  sandboxMediaCard,
  sandboxProjectCard,
  sectionHero,
  sectionSkills,
  sectionProjects,
  sectionMetrics,
  sectionMedia,
  sectionTimeline,
  sectionArchives,
  sectionTestimonials,
  sectionContact,
  sectionSandbox,
  portfolio,
];
