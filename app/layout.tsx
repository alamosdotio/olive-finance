import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import Connectionprovider from "@/contexts/connectionprovider";

export const metadata: Metadata = {
  title: "Olive Finance",
  description: "Options and Futures Trading App on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark-purple">
          <Connectionprovider>
            <div className="px-6 max-w-screen-2xl mx-auto">
              <NavBar></NavBar>
              {children}
            </div>
          </Connectionprovider>
        </ThemeProvider>
        <Script
          src="/charting_library/charting_library.standalone.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/datafeeds/udf/dist/bundle.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
