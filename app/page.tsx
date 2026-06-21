import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import RecruiterTerminal from "@/components/RecruiterTerminal";
import MediaProduction from "@/components/MediaProduction";
import Experience from "@/components/Experience";
import DeprecatedArchive from "@/components/DeprecatedArchive";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { fetchPortfolioContent } from "@/lib/notion";

// Incremental Static Regeneration (ISR)
export const revalidate = 60;

export default async function Home() {
  const contentMap = await fetchPortfolioContent();

  const heroHeadline = contentMap["heroHeadline"] || "BUILDING BOLD HARDWARE & WEB ARCHITECTURES";
  const heroSubtext = contentMap["heroSubtext"] || "Bridging embedded systems logic with scalable full-stack platforms.";
  const metricsHardware = contentMap["metricsHardware"] || "Logic Gates Built: XX";
  const metricsSoftware = contentMap["metricsSoftware"] || "Components Rendered: XX";

  return (
    <main className="relative w-full max-w-[100vw] min-h-screen bg-neocream overflow-x-clip">
      <Navbar />
      
      <div className="w-full flex flex-col gap-16 md:gap-32 pb-32">
        <Hero headline={heroHeadline} subtext={heroSubtext} />
        <Skills />
        <Projects />
        <RecruiterTerminal metricOne={metricsHardware} metricTwo={metricsSoftware} />
        <MediaProduction />
        <Experience />
        <DeprecatedArchive />
        <Testimonials />
        <Contact />
      </div>
      
      <Footer />
    </main>
  );
}
