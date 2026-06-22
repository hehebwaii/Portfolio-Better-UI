import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

// Local type — covers all valid Sanity image reference shapes
// without relying on the @sanity/image-url deep sub-path declaration.
type SanityImageSource =
  | string
  | { asset: { _ref: string } | { _id: string } | { url: string } }
  | { _ref: string }
  | { url: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Record<string, any>;

// ─── Lazy client factory ────────────────────────────────────────────────────
// We do NOT create the client at module level because Sanity validates projectId
// format on construction and will throw during the Next.js build if the env var
// is missing. The client is only created when fetchPortfolio() is called and a
// real projectId is confirmed.
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion, useCdn: false });
  }
  return _client;
}

// ─── Image URL builder ───────────────────────────────────────────────────────
/**
 * Converts a Sanity image reference into a usable URL string.
 * Safe to call with null/undefined — returns { url: () => "" } in that case.
 *
 * Usage:
 *   urlFor(data.heroProfilePhoto).width(800).url()
 *   urlFor(data.heroProfilePhoto).url()
 */
export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) return { url: () => "" };
  return imageUrlBuilder(getClient()).image(source);
}

// ─── Portfolio GROQ query ────────────────────────────────────────────────────
// Expands all image references to full asset URLs inline so page.tsx
// receives plain strings and does not need to import urlFor.
export const PORTFOLIO_QUERY = `
  *[_type == "portfolio"][0] {
    // ── Global Theme ──
    globalFont,
    globalBgColor,
    globalTextColor,
    accentColorOne,
    accentColorTwo,

    // ── Global Layout ──
    terminalPlacement,

    // ── Global: Navbar & Footer ──
    navbarBrandName,
    navbarContactButton,
    footerName,
    footerVersionTag,
    footerScrollingText,

    // ── Hero ──
    heroSettings,
    heroHeadline,
    heroSubtext,
    heroButtonText,
    "heroProfilePhotoUrl": heroProfilePhoto.asset->url,

    // ── Skills ──
    skillsSettings,
    skillsSectionTitle,
    skillsSectionSubtitle,
    skillsList,

    // ── Projects ──
    projectsSettings,
    projectsSectionTitle,
    projectsSectionSubtitle,
    projectsList[] {
      _key,
      name,
      description,
      techStack,
      eventTag,
      "screenshotUrl": screenshot.asset->url
    },

    // ── Recruiter Terminal ──
    terminalSettings,
    terminalHardwareMetric,
    terminalSoftwareMetric,
    keyMetrics[] { _key, label, value },
    roiMetrics[] { _key, label, value },

    // ── Media Production ──
    mediaSettings,
    mediaSectionTitle,
    mediaSectionSubtitle,
    mediaCards[] {
      _key,
      title,
      description,
      tags,
      "photoUrl": photo.asset->url
    },

    // ── Timeline ──
    timelineSettings,
    timelineSectionTitle,
    timelineSectionSubtitle,
    timelineEvents[] {
      _key,
      title,
      organization,
      period,
      description
    },

    // ── Archives ──
    archivesSettings,
    archivesSectionTitle,
    archivesSectionSubtitle,
    archivesList[] {
      _key,
      version,
      description,
      errorMessage
    },

    // ── Testimonials ──
    testimonialsSettings,
    testimonialsSectionTitle,
    testimonialsSectionSubtitle,
    testimonialsSubtext,
    testimonialsList[] {
      _key,
      name,
      role,
      quote
    },

    // ── Contact ──
    contactSettings,
    contactSectionTitle,
    contactSubmitButton
  }
`;

/**
 * Fetches the portfolio singleton from Sanity.
 * Returns null if NEXT_PUBLIC_SANITY_PROJECT_ID is not set yet —
 * all components will fall back to their hardcoded defaults in config/content.ts.
 */
export async function fetchPortfolio() {
  // Only attempt a fetch when the env var is actually set to a real value.
  // An absent env var means the project hasn't been wired up yet.
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn(
      "[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. " +
      "Visit sanity.io, create a project, copy the project ID, " +
      "add it to .env.local and Vercel environment variables, then redeploy."
    );
    return null;
  }
  try {
    return await getClient().fetch(PORTFOLIO_QUERY);
  } catch (err) {
    console.error("[Sanity] Fetch failed:", err);
    return null;
  }
}
