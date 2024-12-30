import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { WalletProvider } from "@/contexts/walletprovider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from 'next/script'


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
      <body
        className={`antialiased`}
      >
        <ThemeProvider
          attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <WalletProvider>
            <div className="px-6 max-w-screen-2xl mx-auto">
              <NavBar></NavBar>
              {children}
            </div>
          </WalletProvider>
        </ThemeProvider>
        <Script src="/charting_library/charting_library.standalone.js" strategy="beforeInteractive" />
        <Script src="/datafeeds/udf/dist/bundle.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
