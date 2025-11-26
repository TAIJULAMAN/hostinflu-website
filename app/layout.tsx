import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hostinflu",
  description:
    "A trusted collaboration platform connecting professional hosts and verified influencers for authentic partnerships.",
  generator: "md shah aman patwary",
  icons: {
    icon: [
      {
        url: "/mini.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/mini.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/mini.png",
        type: "image/png",
      },
    ],
    apple: "/mini.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
