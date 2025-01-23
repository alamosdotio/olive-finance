import datafeed from "./datafeed";

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
                        open: bar.open/2,
                        high: bar.high/2,
                        low: bar.low / 2,
                        close: bar.close / 2,
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
                    open: bar.open / 2,
                    high: bar.high / 2,
                    low: bar.low / 2,
                    close: bar.close / 2,
                };
                onRealtimeCallback(modifiedBar);
            },
            subscriberUID,
            onResetCacheNeededCallback
        );
    }
}