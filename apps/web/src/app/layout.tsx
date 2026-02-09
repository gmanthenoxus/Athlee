import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { MobileNav } from "@/components/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athlehub - Professional Sports Management Platform",
  description: "Track matches, stats, and connect with your sports community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="hidden md:block border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4">
              <Navigation />
            </div>
          </div>
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
