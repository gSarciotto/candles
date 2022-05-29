import { Candle } from "./types";

export function createCandleStore() {
    const store: Record<Candle["symbol"], Candle[]> = {};

    // maybe make the methods async or defer to the next node tick so not block event loop?
    function insertCandle(candle: Candle): void {
        if (store[candle.symbol]) {
            // maybe do it immutably?
            store[candle.symbol].push(candle);
        } else {
            store[candle.symbol] = [candle];
        }
    }

    function getStockCandles(symbol: Candle["symbol"]): Candle[] {
        // not safe ofc, some other function may mutate store
        return store[symbol] || [];
    }

    function updateLastCandleForStock(updatedLastCandle: Candle): void {
        // maybe check for array existence
        const candles = getStockCandles(updatedLastCandle.symbol);
        candles[candles.length - 1] = updatedLastCandle;
    }

    return {
        insertCandle,
        getStockCandles,
        updateLastCandleForStock
    };
}
