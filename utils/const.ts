import { Connection, PublicKey } from "@solana/web3.js";

export const clusterUrl = "https://api.devnet.solana.com";
export const connection = new Connection(clusterUrl, "confirmed");

// Mainnet
// export const USDC_MINT = new PublicKey(
//   "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
// );
// export const WSOL_MINT = new PublicKey(
//   "So11111111111111111111111111111111111111112"
// );
// export const SOL_USD_PYTH_ACCOUNT = new PublicKey(
//   "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG"
// );

// Devnet
export const USDC_MINT = new PublicKey(
  "4dfkxzRKJzwhWHAkJErU4YVKr8RVKESDFj5xKqGuw7Xs"
);
export const USDC_DECIMALS = 6;
export const WSOL_MINT = new PublicKey(
  "AvGyRAUiWkF6fzALe1LNnzCwGbNTZ4aqyfthuEZHM5Wq"
);
export const WSOL_DECIMALS = 6;
export const SOL_USD_PYTH_ACCOUNT = new PublicKey(
  "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"
);

export const HERMES_URL = "https://hermes.pyth.network/";
export const SOL_PRICE_FEED_ID =
  "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";
