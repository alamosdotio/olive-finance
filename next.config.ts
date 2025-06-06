import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "raw.githubusercontent.com",       // for GitHub-hosted token logos
      "tomato-rear-quokka-6.mypinata.cloud", // for your Pinata-hosted assets
      "arweave.net",                     // common for Solana logos
      "shdw.drive.genesysgo.net"        // optional: for Shadow Drive if used
    ],
  },
};

export default nextConfig;
