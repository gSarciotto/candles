export interface Candle {
    symbol: string;
    opening: number;
    closing: number;
    high: number;
    low: number;
    startingTimestampInUTC: number;
}

export interface Tick {
    s: string;
    t: number;
    p: number;
}
