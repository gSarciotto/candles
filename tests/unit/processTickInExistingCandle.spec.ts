import { expect } from "chai";
import { processTickInExistingCandle } from "../../src/processTickInExistingCandle";
import { Candle, Tick } from "../../src/types";

describe("processTickInExistingCandle should", () => {
    it("update closing price with the tick price for all ticks", () => {
        const existingCandle: Candle = {
            symbol: "APPL",
            opening: 1,
            closing: 2,
            high: 3,
            low: 1,
            startingTimestampInUTC: 3213
        };
        const tick: Tick = {
            s: existingCandle.symbol,
            t: existingCandle.startingTimestampInUTC + 100,
            p: 1.5
        };
        expect(
            processTickInExistingCandle(tick, existingCandle)
        ).to.be.deep.equal({
            ...existingCandle,
            closing: tick.p
        });
    });
    it("update high when tick price is higher than existing candle high", () => {
        const existingCandle: Candle = {
            symbol: "APPl",
            opening: 1,
            closing: 2,
            high: 3,
            low: 1,
            startingTimestampInUTC: 3213
        };
        const tick: Tick = {
            s: existingCandle.symbol,
            t: existingCandle.startingTimestampInUTC + 100,
            p: existingCandle.high + 1
        };
        expect(
            processTickInExistingCandle(tick, existingCandle)
        ).to.be.deep.equal({
            ...existingCandle,
            closing: tick.p,
            high: tick.p
        });
    });
    it("update low when tick price is lower than existing candle low", () => {
        const existingCandle: Candle = {
            symbol: "APPl",
            opening: 1,
            closing: 3,
            high: 4,
            low: 2,
            startingTimestampInUTC: 3213
        };
        const tick: Tick = {
            s: existingCandle.symbol,
            t: existingCandle.startingTimestampInUTC + 100,
            p: existingCandle.low - 1
        };
        expect(
            processTickInExistingCandle(tick, existingCandle)
        ).to.be.deep.equal({
            ...existingCandle,
            closing: tick.p,
            low: tick.p
        });
    });
});
