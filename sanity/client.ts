import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

type SanityImageSource =
  | string
  | { asset: { _ref: string } | { _id: string } | { url: string } }
  | { _ref: string }
  | { url: string }
  | Record<string, any>;

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion, useCdn: false });
  }
  return _client;
}

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) return { url: () => "" };
  return imageUrlBuilder(getClient()).image(source);
}

export const PORTFOLIO_QUERY = `
  *[_type == "portfolio"][0] {
    globalFont,
    globalBgColor,
    globalTextColor,
    accentColorOne,
    accentColorTwo,
    navbarBrandName,
    navItems,
    "resumeUrl": resumeFile.asset->url,
    navbarContactButton,
    footerName,
    footerVersionTag,
    footerScrollingText,
    pageBuilder[] {
      ...,
      _type == "sectionHero" => {
        heroProfilePhoto { ..., asset->{ url, metadata { lqip } } }
      },
      _type == "sectionProjects" => {
        projectsList[] {
          ...,
          screenshot { ..., asset->{ url, metadata { lqip } } }
        }
      },
      _type == "sectionMedia" => {
        mediaCards[] {
          ...,
          photo { ..., asset->{ url, metadata { lqip } } }
        }
      },
      _type == "sectionSandbox" => {
        elements[] {
          ...,
          _type == "sandboxMediaCard" => { image { ..., asset->{ url, metadata { lqip } } } },
          _type == "sandboxProjectCard" => { image { ..., asset->{ url, metadata { lqip } } } }
        }
      }
    }
  }
`;

export async function fetchPortfolio() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn("[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
    return null;
  }
  try {
    return await getClient().fetch(PORTFOLIO_QUERY);
  } catch (err) {
    console.error("[Sanity] Fetch failed:", err);
    return null;
  }
}
