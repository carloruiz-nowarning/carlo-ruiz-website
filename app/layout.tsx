import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carlo Ruiz-Goldstein | Marketing & Creative Director",
  description:
    "Senior marketing leader. Brand strategist. Creative director. Give me a brand and a goal.",
  openGraph: {
    title: "Carlo Ruiz-Goldstein",
    description:
      "Give me a brand and a goal. I'll build the strategy, make the content, run the campaigns, ship the site, and track the data.",
    images: ["/assets/carlo-hero.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={garamond.variable}>
      <body className="bg-[#E9E7E3] text-[#111111]">{children}</body>
    </html>
  );
}
