// Adds all Global Theme, Layout, and Per-Section Style rows to Notion.
// Existing rows are NOT touched. Safe to run multiple times.
// Usage: node scripts/seed-notion-theme.js

const https = require("https");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID   = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !DATABASE_ID) {
  console.error("ERROR: Set NOTION_API_KEY and NOTION_DATABASE_ID env vars first.");
  process.exit(1);
}

const SECTIONS = ["Hero", "Skills", "Projects", "Terminal", "Media", "Timeline", "Archives", "Testimonials", "Contact"];

const rows = [
  // ─── GLOBAL THEME ──────────────────────────────────────────────────────────
  { key: "Global Font",             value: "Space Grotesk",  note: "Any Google Font name. e.g. Anton, Syne, Outfit" },
  { key: "Global Background Color", value: "",               note: "Hex code e.g. #FFF9F0. Leave blank to keep Tailwind default." },
  { key: "Global Text Color",       value: "",               note: "Hex code e.g. #0A0A0A. Leave blank to keep Tailwind default." },
  { key: "Accent Color One",        value: "#FACC15",        note: "Primary accent (used in CSS variable --accent-1)" },
  { key: "Accent Color Two",        value: "#FF6B9E",        note: "Secondary accent (used in CSS variable --accent-2)" },

  // ─── GLOBAL LAYOUT ─────────────────────────────────────────────────────────
  { key: "Terminal Placement",      value: "below-hero",     note: "Options: below-hero | above-footer" },
  { key: "Media Grid Direction",    value: "row",            note: "Options: row | row-reverse (reserved for future use)" },

  // ─── PER-SECTION STYLE OVERRIDES (6 keys × 9 sections = 54 keys) ──────────
  ...SECTIONS.flatMap(section => [
    { key: `${section} Custom Font`,        value: "", note: `Google Font name for ${section}. Blank = use Global Font.` },
    { key: `${section} Font Size Desktop`,  value: "", note: `e.g. 7rem. Overrides the heading font size for ${section}.` },
    { key: `${section} Font Size Mobile`,   value: "", note: `e.g. 3rem. Reserved for future responsive font sizing.` },
    { key: `${section} Text Color`,         value: "", note: `Hex code e.g. #FF0000. Sets text color for the entire ${section} section.` },
    { key: `${section} Background Color`,   value: "", note: `Hex code e.g. #000000. Overrides the background of ${section}.` },
    { key: `${section} Alignment`,          value: "", note: `Options: left | center | right. Aligns content in ${section}.` },
  ]),
];

function apiRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: "api.notion.com",
      path,
      method,
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
      },
    }, res => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
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
  console.log(`[ SYSTEM ] -> Seeding ${rows.length} theme/style rows into Notion...`);
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
