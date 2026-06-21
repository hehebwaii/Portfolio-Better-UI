import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Niranjan S S // Neo-Brutalist Pop Portfolio",
  description: "Systems Architect and Frontend Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // CRITICAL FIX: No overflow-hidden on html or body to allow position: sticky to function globally.
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} overflow-x-clip`}>
      <body className="antialiased font-body bg-neocream text-neoblack overflow-x-clip">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
