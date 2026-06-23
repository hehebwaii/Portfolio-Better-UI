const { createClient } = require("next-sanity");
require("dotenv").config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-06-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function patchTheme() {
  console.log("🚀 Purging legacy theme fields and initializing dual-state theme...");
  try {
    await client
      .patch("portfolio")
      // Remove the old fields
      .unset(["globalBgColor", "globalTextColor", "accentColorOne", "accentColorTwo"])
      // Initialize the new fields if they don't exist
      .setIfMissing({
        lightBg: "#FFF9F0",
        lightText: "#000000",
        darkBg: "#111111",
        darkText: "#FFFFFF",
        accentPrimary: "#FACC15",
        accentSecondary: "#FF6B9E"
      })
      .commit();
    console.log("✅ Successfully purged legacy fields and initialized Dual-State colors!");
  } catch (error) {
    console.error("❌ Patch failed:", error);
  }
}

patchTheme();
