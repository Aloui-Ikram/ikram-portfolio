import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { themeInitScript } from "@/components/theme-toggle";
import { site } from "@/content/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The site's primary face, headings and body alike. Newsreader is a text serif
 * drawn for screen reading, so it holds up at 15px in a way a display serif
 * such as Instrument Serif does not. Crucially it ships real weights: bold has
 * to exist or every <strong> in the PR descriptions silently loses emphasis.
 */
const newsreader = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  /* Exactly the weights the site uses: 400 body, 500 the name, 600 headings.
     700 and italic were declared but never referenced, and each extra face is
     another file on the critical path; dropping them cut mobile LCP. */
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "Ikram Aloui",
    "cloud-native security engineer",
    "supply chain security",
    "Harbor",
    "CNCF",
    "container registry",
    "Cosign",
    "Sigstore",
    "SBOM",
    "Kubernetes",
    "SPIFFE",
    "SPIRE",
    "Go",
    "DevSecOps",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} · ${site.title}`,
    title: `${site.name} · ${site.title}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.title}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#120a14" },
    { media: "(prefers-color-scheme: light)", color: "#fff8fb" },
  ],
  colorScheme: "dark light",
};

/** Structured data so search engines resolve the person, not just the page. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.github, site.linkedin],
  address: { "@type": "PostalAddress", addressCountry: "DZ" },
  worksFor: { "@type": "Organization", name: "8gears AG", url: "https://8gears.com" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Science and Technology Houari Boumediene (USTHB)",
  },
  knowsAbout: [
    "Software supply chain security",
    "Container registries",
    "Kubernetes",
    "Sigstore and Cosign",
    "Zero Trust architecture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
