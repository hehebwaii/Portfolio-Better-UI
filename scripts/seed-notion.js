// Replaces all existing Notion rows with clean, readable key names.
// Usage: node scripts/seed-notion.js

const https = require("https");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID   = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !DATABASE_ID) {
  console.error("ERROR: Set NOTION_API_KEY and NOTION_DATABASE_ID env vars first.");
  process.exit(1);
}

const rows = [
  // ─── NAVBAR ───────────────────────────────────────────────────
  { key: "Navbar Brand Name",       value: "niranjan.digital" },
  { key: "Navbar Contact Button",   value: "SAY HELLO" },
  // ─── HERO ─────────────────────────────────────────────────────
  { key: "Hero Headline",           value: "BUILDING BOLD HARDWARE & WEB ARCHITECTURES" },
  { key: "Hero Subtext",            value: "Bridging embedded systems logic with scalable full-stack platforms." },
  { key: "Hero Button Text",        value: "EXPLORE WORK" },
  // ─── SKILLS ───────────────────────────────────────────────────
  { key: "Skills Section Title",    value: "WHAT I CAN DO" },
  { key: "Skills Section Subtitle", value: "FOR YOU." },
  { key: "Skill 1",                 value: "Embedded Systems" },
  { key: "Skill 2",                 value: "Full-Stack Web Engineering" },
  { key: "Skill 3",                 value: "UI/UX" },
  { key: "Skill 4",                 value: "Digital Media Production" },
  // ─── PROJECTS ─────────────────────────────────────────────────
  { key: "Projects Section Title",    value: "SELECTED" },
  { key: "Projects Section Subtitle", value: "WORKS." },
  { key: "Project 1 Event Tag",       value: "Smart India Hackathon (SIH)" },
  { key: "Project 1 Name",            value: "SUSTAINATION" },
  { key: "Project 1 Description",     value: "A gamified digital agricultural platform." },
  { key: "Project 1 Tech Stack",      value: "React Framework, Firestore Engine, NoSQL Architecture" },
  { key: "Project 2 Tag",             value: "R&D STAGE" },
  { key: "Project 2 Name",            value: "[UNANNOUNCED]" },
  { key: "Project 2 Description",     value: "Next-generation integrated hardware & frontend systems prototype currently in internal development." },
  // ─── RECRUITER TERMINAL ───────────────────────────────────────
  { key: "Terminal Hardware Metric",  value: "Logic Gates Built: 7+" },
  { key: "Terminal Software Metric",  value: "Components Rendered: 400+" },
  { key: "Key Metric 1 Label",        value: "FRONTEND DEPLOYMENTS" },
  { key: "Key Metric 1 Value",        value: "14+" },
  { key: "Key Metric 2 Label",        value: "HARDWARE PROTOTYPES" },
  { key: "Key Metric 2 Value",        value: "7" },
  { key: "Key Metric 3 Label",        value: "UI COMPONENT LIB" },
  { key: "Key Metric 3 Value",        value: "100% CUSTOM" },
  { key: "Key Metric 4 Label",        value: "PERFORMANCE SCORE" },
  { key: "Key Metric 4 Value",        value: "99/100" },
  { key: "ROI 1 Label",               value: "USER ENGAGEMENT" },
  { key: "ROI 1 Value",               value: "+45% AVG" },
  { key: "ROI 2 Label",               value: "CODEBASE EFFICIENCY" },
  { key: "ROI 2 Value",               value: "MODULAR" },
  { key: "ROI 3 Label",               value: "DESIGN TO DEV TIME" },
  { key: "ROI 3 Value",               value: "< 48 HRS" },
  // ─── MEDIA PRODUCTION ─────────────────────────────────────────
  { key: "Media Section Title",       value: "VISUALS &" },
  { key: "Media Section Subtitle",    value: "MOTION." },
  { key: "Media Card 1 Title",        value: "Professional Photography" },
  { key: "Media Card 1 Description",  value: "High-contrast, technically composed imagery focusing on environmental and architectural subjects." },
  { key: "Media Card 1 Tags",         value: "Sony a6400, RAW Format, Lighting Design" },
  { key: "Media Card 2 Title",        value: "Cinematic Videography" },
  { key: "Media Card 2 Description",  value: "Dynamic motion capture with an emphasis on tactical editing and seamless storytelling." },
  { key: "Media Card 2 Tags",         value: "Color Graded, Premiere Pro / Resolve, Motion Tracking" },
  { key: "Media Card 3 Title",        value: "Post-Production Editing" },
  { key: "Media Card 3 Description",  value: "Advanced image manipulation, color correction, and digital asset refinement." },
  { key: "Media Card 3 Tags",         value: "Photoshop, Lightroom, Object Removal" },
  // ─── EXPERIENCE / TIMELINE ────────────────────────────────────
  { key: "Timeline Section Title",    value: "MY" },
  { key: "Timeline Section Subtitle", value: "TIMELINE." },
  { key: "Timeline 1 Title",          value: "B.Tech ECE Academic Core" },
  { key: "Timeline 1 Organization",   value: "MBCET" },
  { key: "Timeline 1 Period",         value: "Aug 2025 - Present" },
  { key: "Timeline 1 Description",    value: "Navigating rigorous academic frameworks, blending hardware logic with software execution." },
  { key: "Timeline 2 Title",          value: "SIH Participant" },
  { key: "Timeline 2 Organization",   value: "Smart India Hackathon" },
  { key: "Timeline 2 Period",         value: "Sep 2025" },
  { key: "Timeline 2 Description",    value: "Architected and deployed the SUSTAINATION gamified eco-platform." },
  { key: "Timeline 3 Title",          value: "Technical Fest Executive Coordinator" },
  { key: "Timeline 3 Organization",   value: "ENIX Executive Committee (EXECOM)" },
  { key: "Timeline 3 Period",         value: "Mar 2026" },
  { key: "Timeline 3 Description",    value: "Orchestrating cross-functional teams and event infrastructure." },
  // ─── DEPRECATED ARCHIVES ──────────────────────────────────────
  { key: "Archives Section Title",    value: "DEPRECATED" },
  { key: "Archives Section Subtitle", value: "ARCHITECTURES." },
  { key: "Archive 1 Version",         value: "v1.0" },
  { key: "Archive 1 Error Message",   value: "FATAL: VISUAL FATIGUE DETECTED" },
  { key: "Archive 1 Description",     value: "First-generation Dark Brutalism experiment. Scrapped due to excessive terminal-style contrast leading to user fatigue." },
  // ─── TESTIMONIALS ─────────────────────────────────────────────
  { key: "Testimonials Section Title",    value: "THE" },
  { key: "Testimonials Section Subtitle", value: "VAULT." },
  { key: "Testimonials Subtext",          value: "ACCESS ENCRYPTED TESTIMONIALS" },
  { key: "Testimonial 1 Name",            value: "[CONFIDENTIAL IDENTITY]" },
  { key: "Testimonial 1 Role",            value: "Senior Hardware Engineer" },
  { key: "Testimonial 1 Quote",           value: "Niranjan brings an exceptionally rare intersection of hardware-level comprehension and modern web frontend fluency. His micro-controller architectures are resilient, and his interfaces are viscerally tactile." },
  { key: "Testimonial 2 Name",            value: "[CONFIDENTIAL IDENTITY]" },
  { key: "Testimonial 2 Role",            value: "Lead UI Designer" },
  { key: "Testimonial 2 Quote",           value: "Executing a Neo-Brutalist system requires an incredible amount of precision and spatial awareness. The interfaces he ships are flawless — mechanically snappy, visually unapologetic, and technically error-free." },
  { key: "Testimonial 3 Name",            value: "[CONFIDENTIAL IDENTITY]" },
  { key: "Testimonial 3 Role",            value: "Hackathon Organizer" },
  { key: "Testimonial 3 Quote",           value: "Watching the SUSTAINATION platform scale under massive concurrent load during the Hackathon was incredible. His capability to seamlessly integrate React with complex NoSQL structures is top tier." },
  // ─── CONTACT ──────────────────────────────────────────────────
  { key: "Contact Section Title",  value: "SAY HELLO." },
  { key: "Contact Submit Button",  value: "TRANSMIT PAYLOAD" },
  // ─── FOOTER ───────────────────────────────────────────────────
  { key: "Footer Name",           value: "NIRANJAN S S" },
  { key: "Footer Scrolling Text", value: "BUILDING BOLD ARCHITECTURES •" },
  { key: "Footer Version Tag",    value: "SYS.VER: 14.0 // NEO-BRUTALIST POP" },
];

function apiRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: "api.notion.com",
        path,
        method,
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
          ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
      }
    );
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function getAllPageIds() {
  const res = await apiRequest("POST", "/v1/search", {
    filter: { value: "page", property: "object" },
    page_size: 100,
  });
  return res.body.results
    .filter(p => p.parent?.database_id?.replace(/-/g, "") === DATABASE_ID.replace(/-/g, ""))
    .map(p => p.id);
}

async function archivePage(id) {
  await apiRequest("PATCH", `/v1/pages/${id}`, { archived: true });
}

async function createPage(key, value) {
  await apiRequest("POST", "/v1/pages", {
    parent: { database_id: DATABASE_ID.replace(/-/g, "") },
    properties: {
      Key:   { title:     [{ text: { content: key } }] },
      Value: { rich_text: [{ text: { content: value } }] },
    },
  });
}

async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  console.log("[ SYSTEM ] -> Fetching existing pages...");
  const ids = await getAllPageIds();
  console.log(`[ SYSTEM ] -> Archiving ${ids.length} old rows...`);
  for (const id of ids) {
    await archivePage(id);
    await delay(340);
  }
  console.log(`[ SYSTEM ] -> Seeding ${rows.length} new readable rows...`);
  let ok = 0, fail = 0;
  for (const row of rows) {
    try {
      await createPage(row.key, row.value);
      console.log(`  ✓ ${row.key}`);
      ok++;
    } catch (e) {
      console.error(`  ✗ ${row.key}: ${e.message}`);
      fail++;
    }
    await delay(340);
  }
  console.log(`\n[ SYSTEM ] -> DONE. ${ok} seeded, ${fail} failed.`);
}

run();
