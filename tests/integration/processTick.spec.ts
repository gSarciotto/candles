import { expect } from "chai";
import { describe } from "mocha";
import moment from "moment";
import { createCandleStore } from "../../src/candleStore";
import { processTick } from "../../src/processTick";
import { Candle, Tick } from "../../src/types";

describe("processTick should", () => {
    it("create a new candle array if there are no candles stored for the tick stock", () => {
        const { getStockCandles, insertCandle, updateLastCandleForStock } =
            createCandleStore();
        const tick: Tick = {
            s: "a",
            p: 10,
            t: Date.now()
        };
        const expectedCandle: Candle = {
            symbol: tick.s,
            high: tick.p,
            low: tick.p,
            opening: tick.p,
            closing: tick.p,
            startingTimestampInUTC: Number(
                moment.utc(tick.t).startOf("minute").format("x")
            )
        };
        processTick({
            getStockCandles,
            insertCandle,
            updateLastCandleForStock,
            tick
        });
        const candlesForStock = getStockCandles(tick.s);
        expect(candlesForStock)
            .to.be.an("array")
            .with.deep.members([expectedCandle]);
    });
    it("update the latests candle with tick information", () => {
        const { getStockCandles, insertCandle, updateLastCandleForStock } =
            createCandleStore();
        const tick: Tick = {
            s: "a",
            p: 10,
            t: Date.now()
        };
        const existingCandle: Candle = {
            symbol: tick.s,
            high: 8,
            low: 5,
            opening: 5,
            closing: 8,
            startingTimestampInUTC: Number(
                moment.utc(tick.t).startOf("minute").format("x")
            )
        };
        insertCandle(existingCandle);
        const expectedCandle: Candle = {
            ...existingCandle,
            high: tick.p,
            closing: tick.p
        };
        processTick({
            getStockCandles,
            insertCandle,
            updateLastCandleForStock,
            tick
        });
        const candlesForStock = getStockCandles(tick.s);
        expect(candlesForStock)
            .to.be.an("array")
            .with.deep.members([expectedCandle]);
    });
});
