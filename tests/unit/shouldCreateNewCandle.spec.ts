import { expect } from "chai";
import { describe } from "mocha";
import moment from "moment";
import { shouldCreateNewCandle } from "../../src/shouldCreateNewCandle";

describe("shouldCreateNewCandle should return", () => {
    const candleDuration = 60 * 1000; // 1 minute
    const candleStartTime = Number(moment.utc().format("x"));
    it("true if there isnt a last candle", () => {
        expect(shouldCreateNewCandle(123)).to.be.true;
    });
    it("false if tick timestamp is equal to last candle starting time", () => {
        expect(shouldCreateNewCandle(candleStartTime, candleStartTime)).to.be
            .false;
    });
    it("true if tick timestamp is equal to last candle starting time + candle duration", () => {
        const candleStartTimePlusCandleDuration = moment
            .utc(candleStartTime)
            .add(candleDuration, "millisecond");
        expect(
            shouldCreateNewCandle(
                Number(candleStartTimePlusCandleDuration.format("x")),
                candleStartTime,
                candleDuration
            )
        ).to.be.true;
    });
    it("true if tick timestamp is after last candle starting time + candle duration", () => {
        const justAfterCandleStartTimePlusCandleDuration = moment
            .utc(candleStartTime)
            .add(candleDuration + 1, "millisecond");
        expect(
            shouldCreateNewCandle(
                Number(justAfterCandleStartTimePlusCandleDuration.format("x")),
                candleStartTime,
                candleDuration
            )
        ).to.be.true;
    });
    it("false if tick timestamp is before last candle starting time + candle duration", () => {
        const justBeforeCandleStartTimePlusCandleDuration = moment
            .utc(candleStartTime)
            .add(candleDuration, "milliseconds")
            .subtract(1, "millisecond");
        expect(
            shouldCreateNewCandle(
                Number(justBeforeCandleStartTimePlusCandleDuration.format("x")),
                candleStartTime,
                candleDuration
            )
        ).to.be.false;
    });
});
