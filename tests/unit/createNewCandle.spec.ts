import { expect } from "chai";
import moment from "moment";
import { createNewCandle } from "../../src/createNewCandle";
import { Tick } from "../../src/types";

describe("createNewCandle should create a new candle with", () => {
    const baseTick: Omit<Tick, "t"> = {
        s: "asd",
        p: 10
    };
    it("opening, closing, low and high equal to the price in tick", () => {
        const aTick: Tick = {
            ...baseTick,
            t: 123
        };
        expect(createNewCandle(aTick)).to.contain({
            opening: aTick.p,
            low: aTick.p,
            high: aTick.p,
            closing: aTick.p
        });
    });
    it("starting time of the candle as the beginning of the minute in the tick if tick timestamp is not the at the beginning of the minute", () => {
        const startOfMinute = moment().startOf("minute").utc();
        const tickWithTimestampAfterMinuteBeginning: Tick = {
            ...baseTick,
            t: Number(moment(startOfMinute).add(1, "millisecond").format("x"))
        };
        const createdCandle = createNewCandle(
            tickWithTimestampAfterMinuteBeginning
        );
        expect(startOfMinute.isSame(createdCandle.startingTimestampInUTC)).to.be
            .true;
    });
    it("starting time of the candle as the beginning of the minute in the tick if tick timestamp is exactly at the beginning of the minute", () => {
        const startOfMinute = moment().startOf("minute").utc();
        const tickWithTimestampAtTheMinuteBeginning: Tick = {
            ...baseTick,
            t: Number(moment(startOfMinute).format("x"))
        };
        const createdCandle = createNewCandle(
            tickWithTimestampAtTheMinuteBeginning
        );
        expect(startOfMinute.isSame(createdCandle.startingTimestampInUTC)).to.be
            .true;
    });
});
