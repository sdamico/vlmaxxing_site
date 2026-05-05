import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Stop paying twice to see the same pixels. Training-free anti-recomputation for video VLMs, fast same-video follow-ups, and no measurable accuracy drift in tested rows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vlmaxxi.ng"),
  title: "VLMaxxing through FrameMogging — training-free anti-recomputation for video VLMs",
  description,
  authors: [
    { name: "Sam D'Amico", url: "https://sdami.co" },
    { name: "JF Bastien", url: "https://jfbastien.com" },
  ],
  openGraph: {
    title: "VLMaxxing through FrameMogging",
    description,
    url: "https://vlmaxxi.ng",
    siteName: "VLMaxxing through FrameMogging",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VLMaxxing through FrameMogging",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-100">
        {children}
      </body>
    </html>
  );
}
