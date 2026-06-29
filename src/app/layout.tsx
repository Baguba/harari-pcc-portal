import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Harari PCC Portal — Professional Competence Certificate",
  description:
    "Official Professional Competence Certificate (PCC) portal of the Harari People Regional State, Ethiopia. Apply, get reviewed, and receive your business competence certificate online.",
  keywords: [
    "Harari", "Harar", "Ethiopia", "PCC", "Professional Competence Certificate",
    "Business Licence", "Trade Bureau", "Harari Region",
  ],
  authors: [{ name: "Harari Region Trade, Industry & Tourism Development Bureau" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Harari PCC Portal",
    description: "Professional Competence Certificate portal for the Harari Region, Ethiopia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
