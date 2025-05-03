import { black_scholes } from "@/utils/optionsPricing";
import datafeed from "./datafeed";
import { differenceInSeconds } from "date-fns";

let strikePrice = 150;
let expiry = new Date();
let isCall = true;

export const setOptionParameters = (strike: number, expiryDate: Date, contractType: 'Call' | 'Put') => {
    strikePrice = strike;
    expiry = expiryDate;
    isCall = contractType === 'Call';
};

const calculateOptionPrice = (assetPrice: number, timestamp: number): number => {
  const timeToExpiry = differenceInSeconds(expiry, new Date(timestamp)) / (365 * 24 * 60 * 60);
  return black_scholes(assetPrice, strikePrice, timeToExpiry, isCall);
};

export const optionsDatafeed = {
    ...datafeed,
    getBars: async (
        symbolInfo: any,
        resolution: any,
        periodParams: any,
        onHistoryCallback: any,
        onErrorCallback: any,
    ) => {
        try {
            await datafeed.getBars(
                symbolInfo,
                resolution,
                periodParams,
                (bars: any[]) => {
                    const modifiedBars = bars.map(bar => ({
                        ...bar,
                        open: calculateOptionPrice(bar.open, bar.time),
                        high: calculateOptionPrice(bar.high, bar.time),
                        low: calculateOptionPrice(bar.low, bar.time),
                        close: calculateOptionPrice(bar.close, bar.time),
                    }));
                    onHistoryCallback(modifiedBars)
                },
                onErrorCallback
            )
        } catch (error) {
            onErrorCallback(error)
        }
    },
    subscribeBars: (
        symbolInfo: any,
        resolution: any,
        onRealtimeCallback: any,
        subscriberUID: any,
        onResetCacheNeededCallback: any
    ) => {
        return datafeed.subscribeBars(
            symbolInfo,
            resolution,
            (bar: any) => {
                const modifiedBar = {
                    ...bar,
                    open: calculateOptionPrice(bar.open, bar.time),
                    high: calculateOptionPrice(bar.high, bar.time),
                    low: calculateOptionPrice(bar.low, bar.time),
                    close: calculateOptionPrice(bar.close, bar.time),
                };
                onRealtimeCallback(modifiedBar);
            },
            subscriberUID,
            onResetCacheNeededCallback
        );
    }
}