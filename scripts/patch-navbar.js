const { createClient } = require("next-sanity");
require("dotenv").config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-06-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const generateKey = () => Math.random().toString(36).substring(2, 9);

async function patchNavbar() {
  console.log("🚀 Patching Sanity document with previous Navbar data...");
  try {
    await client
      .patch("portfolio")
      .setIfMissing({ navItems: [] })
      .set({
        navItems: [
          { _key: generateKey(), label: "SKILLS", targetId: "skills" },
          { _key: generateKey(), label: "PROJECTS", targetId: "projects" },
          { _key: generateKey(), label: "EXPERIENCE", targetId: "timeline" },
          { _key: generateKey(), label: "TESTIMONIALS", targetId: "testimonials" },
        ],
      })
      .commit();
    console.log("✅ Successfully synced previous Navbar details without overwriting your other changes!");
  } catch (error) {
    console.error("❌ Patch failed:", error);
  }
}

patchNavbar();
