export const BIRDEYE_BASE_URL = 'https://public-api.birdeye.so/defi';
export const BIRDEYE_API_KEY = '91c3e7f314da4ac1a363833280f1c4b8';
export const SUPPORTED_RESOLUTIONS = ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'];

export const DEFAULT_SYMBOL_INFO = {
  name: 'SOL/USD',
  description: 'Solana/USD',
  type: 'crypto',
  exchange: 'Birdeye',
  listed_exchange: 'Birdeye',
  timezone: 'Etc/UTC',
  format: 'price',
  pricescale: 1000000,
  minmov: 1,
  has_intraday: true,
  has_daily: true,
  has_weekly_and_monthly: true,
  supported_resolutions: SUPPORTED_RESOLUTIONS,
  intraday_multipliers: SUPPORTED_RESOLUTIONS,
  data_status: 'streaming',
  session: '24x7',
};