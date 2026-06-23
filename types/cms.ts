import type { CSSProperties } from "react";

/**
 * Per-section style override object.
 * Any field left blank falls back to global theme or Tailwind defaults.
 */
export interface SectionSettings {
  customFont?: string;        // e.g. "Anton" — blank = use Global Font
  fontSizeDesktop?: string;   // e.g. "7rem"  — applied to section heading
  fontSizeMobile?: string;    // e.g. "3rem"  — reserved for future responsive use
  textColor?: string;         // hex e.g. "#FF0000"
  backgroundColor?: string;   // hex e.g. "#000000"
  alignment?: "left" | "center" | "right";
  entryAnimation?: "fade-up" | "brutalist-slam" | "stagger";
}

/**
 * Converts a SectionSettings object into a React inline style object.
 * Safe to spread onto any element — undefined values are ignored.
 */
export function buildSectionStyle(settings?: SectionSettings): CSSProperties {
  return {
    fontFamily:      settings?.customFont      ? `'${settings.customFont}', sans-serif` : undefined,
    backgroundColor: settings?.backgroundColor || undefined,
    color:           settings?.textColor        || undefined,
    textAlign:       settings?.alignment        || undefined,
  };
}
