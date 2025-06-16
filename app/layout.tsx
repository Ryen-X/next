import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "../components/theme-provider"; // Import ThemeProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "N.E.X.T || Portal",
  description: "N.E.X.T. - Narayana Empowering Xcellence Tomorrow",
  viewport: "width=device-width, initial-scale=1", // Add viewport meta tag for responsiveness
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn( // suppressHydrationWarning for next-themes
      "antialiased",
      geistSans.variable,
      geistMono.variable
    )}>
      <body className="min-h-screen flex flex-col pt-[5rem] bg-background font-sans overflow-x-hidden" suppressHydrationWarning> {/* Adjust padding for fixed navbar, added overflow-x-hidden, and suppressHydrationWarning */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Set default theme to light
          enableSystem
        >
          <Navbar />
          <main className="flex-grow"> {/* Remove container from main, sections will manage their own */}
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
