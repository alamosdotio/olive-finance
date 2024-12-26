import { BirdeyeResponse } from '../types/trading-view';
import { BIRDEYE_BASE_URL, BIRDEYE_API_KEY } from '../config/trading-view';

export async function fetchHistoricalPrices(
  pairAddress: string,
  resolution: number
): Promise<BirdeyeResponse> {
  if (!BIRDEYE_API_KEY) {
    throw new Error('BIRDEYE_API_KEY is not set');
  }

  try {
    // Convert resolution to minutes and ensure it's within valid ranges
    const validResolution = Math.max(1, Math.min(resolution, 1440)); // Between 1min and 24h
    
    // Add timestamp parameters for the requested range
    const time_to = Math.floor(Date.now() / 1000);
    const time_from = time_to - (validResolution * 60 * 500); // Get data for 500 periods
    
    const url = `${BIRDEYE_BASE_URL}/ohlcv/pair?address=${pairAddress}&type=${validResolution}m&time_from=${time_from}&time_to=${time_to}`;
    console.log('Requesting URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'X-API-KEY': BIRDEYE_API_KEY,
        'accept': 'application/json',
        'x-chain': 'solana'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.success || !data.data?.items?.length) {
      console.warn('No data received from Birdeye API:', data);
      return {
        success: false,
        message: data.message || 'No data available',
        data: { items: [] }
      };
    }

    return data;
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    throw error;
  }
}