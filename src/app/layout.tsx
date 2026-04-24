/**
 * File: src/app/layout.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Root Next.js layout, metadata, fonts, and shared site chrome.
 */
import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";

import { DevA11y } from "@/components/dev-a11y";
import { PageFooter } from "@/components/page-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { appConfig } from "@/config/app";

import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const editorial = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif-editorial",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? appConfig.defaultAppUrl,
  ),
  title: {
    default: appConfig.productName,
    template: `%s | ${appConfig.productName}`,
  },
  description: "Research-informed work-style assessment platform.",
  applicationName: appConfig.productName,
  authors: [{ name: appConfig.productName }],
  openGraph: {
    title: appConfig.productName,
    description:
      "Take a developmental work-style assessment and contribute to an anonymised open research dataset.",
    siteName: appConfig.productName,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AssessmentOptima open work-style research assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.productName,
    description:
      "A developmental work-style assessment with open research data and a public AI-assisted build story.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${plex.variable} ${editorial.variable} ${mono.variable}`}
      >
        <ThemeProvider>
          <DevA11y />
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <SiteHeader />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <PageFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
