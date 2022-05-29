import { Candle, Tick } from "./types";

export function processTickInExistingCandle(
    tick: Tick,
    candle: Candle // maybe only type what is used later
): Candle {
    return {
        ...candle,
        closing: tick.p,
        high: getNewHigh(tick.p, candle.high),
        low: getNewLow(tick.p, candle.low)
    };
}

function getNewHigh(tickPrice: number, candleHigh: number): number {
    return tickPrice > candleHigh ? tickPrice : candleHigh;
}

function getNewLow(tickPrice: number, candleLow: number): number {
    return tickPrice < candleLow ? tickPrice : candleLow;
}
