// Sanity environment variable helpers.
// Reads from .env.local (local dev) or Vercel Environment Variables (production).

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// NOTE: fetchPortfolio() in client.ts checks process.env directly before
// constructing the client, so an empty string here never causes a Sanity error.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// Optional: write-access token for server-side mutations
export const token = process.env.SANITY_API_TOKEN || "";
