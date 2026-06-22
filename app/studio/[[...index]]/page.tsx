/**
 * Embedded Sanity Studio route.
 * Accessible at: /studio (local) or https://your-site.vercel.app/studio
 *
 * MUST be a Client Component — the Studio uses browser APIs.
 * MUST NOT be statically rendered — each load hits the live Sanity API.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
