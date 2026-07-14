import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DemoProvider } from "@/lib/demo-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bangladesh Police Association | Serving & Protecting Our Community",
  description: "Official web portal of the Bangladesh Police Association. Representing active and retired law enforcement officers, promoting public safety, and supporting our members.",
  keywords: ["police association", "law enforcement", "officer benefits", "police charity", "community safety"],
  authors: [{ name: "Bangladesh Police Association" }],
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <DemoProvider>
          <ThemeProvider defaultTheme="dark">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </ThemeProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
