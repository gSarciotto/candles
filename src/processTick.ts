import { createCandleStore } from "./candleStore";
import { createNewCandle } from "./createNewCandle";
import { processTickInExistingCandle } from "./processTickInExistingCandle";
import { shouldCreateNewCandle } from "./shouldCreateNewCandle";
import { Tick } from "./types";

type ProcessTickParams = { tick: Tick } & Omit<
    ReturnType<typeof createCandleStore>,
    "resetStore"
>;

export function processTick({
    tick,
    insertCandle,
    updateLastCandleForStock,
    getStockCandles
}: ProcessTickParams): void {
    // could make an adapter for the Tick interface to decouple it from 3rd party format
    const candlesForStock = getStockCandles(tick.s);
    const lastCandle =
        candlesForStock.length > 0
            ? candlesForStock[candlesForStock.length - 1]
            : undefined;
    if (shouldCreateNewCandle(tick.t, lastCandle?.startingTimestampInUTC)) {
        insertCandle(createNewCandle(tick));
        return;
    } else {
        if (!lastCandle) {
            throw new Error(
                `Trying to update inexistent candle, tick: ${JSON.stringify(
                    tick
                )}`
            );
        }
        updateLastCandleForStock(processTickInExistingCandle(tick, lastCandle));
    }
}
