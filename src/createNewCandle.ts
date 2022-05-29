import moment from "moment";
import { Candle, Tick } from "./types";

export function createNewCandle(firstTick: Tick): Candle {
    return {
        symbol: firstTick.s,
        opening: firstTick.p,
        closing: firstTick.p,
        low: firstTick.p,
        high: firstTick.p,
        startingTimestampInUTC: Number(
            moment.utc(firstTick.t).startOf("minute").format("x")
        )
    };
}
