const { createClient } = require("next-sanity");
require("dotenv").config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-06-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function patchThemeRevert() {
  console.log("🚀 Purging dual-state theme fields and restoring static theme...");
  try {
    await client
      .patch("portfolio")
      // Remove the dual-state fields
      .unset(["lightBg", "lightText", "darkBg", "darkText", "accentPrimary", "accentSecondary"])
      // Restore the static fields if they don't exist
      .setIfMissing({
        globalBgColor: "#FFF9F0",
        globalTextColor: "#000000",
        accentColorOne: "#FACC15",
        accentColorTwo: "#FF6B9E"
      })
      .commit();
    console.log("✅ Successfully purged dual-state fields and restored static colors!");
  } catch (error) {
    console.error("❌ Patch failed:", error);
  }
}

patchThemeRevert();
