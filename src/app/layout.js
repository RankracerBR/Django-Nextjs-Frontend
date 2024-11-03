import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/authProvider"; // Import your AuthProvider

import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/themeProvider";
import BaseLayout from "@/components/layout/BaseLayout";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
        <AuthProvider> {/* Wrap children in AuthProvider */}
          <BaseLayout>
            {children}
          </BaseLayout>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
