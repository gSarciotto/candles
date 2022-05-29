import moment from "moment";
import { Candle, Tick } from "./types";

const ONE_MINUTE = 60 * 1000;

export function shouldCreateNewCandle(
    tickTimestamp: Tick["t"],
    lastCandleStartingTime?: Candle["startingTimestampInUTC"],
    candleDurationInMilliseconds: number = ONE_MINUTE
): boolean {
    if (!lastCandleStartingTime) {
        return true;
    }
    const endingTimestampOfCandle = moment
        .utc(lastCandleStartingTime)
        .add(candleDurationInMilliseconds, "milliseconds");
    return moment
        .utc(tickTimestamp)
        .isSameOrAfter(endingTimestampOfCandle, "millisecond");
}
