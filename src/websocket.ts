import WebSocket from "ws";
import { createCandleStore } from "./candleStore";
import { processTick } from "./processTick";
import { Tick } from "./types";

type StartWebSocketClientParams = Omit<
    ReturnType<typeof createCandleStore>,
    "resetStore"
>;

export function startWebSocketClient({
    insertCandle,
    updateLastCandleForStock,
    getStockCandles
}: StartWebSocketClientParams): () => void {
    const ws = new WebSocket(
        "wss://testing-random-data.herokuapp.com/websockets"
    );
    ws.on("open", () => {
        console.log("started websocket client");
    });

    ws.on("error", (err) => {
        console.error("client error", err);
        ws.close();
        process.exit(1);
    });

    ws.on("message", (data) => {
        let parsedTick: Tick;
        try {
            parsedTick = JSON.parse(data.toString()) as Tick;
            parsedTick.p = Number(parsedTick.p);
            //validate message
        } catch (err) {
            console.error("Unable to parse tick", err);
            return;
        }
        console.log("New tick", parsedTick);
        processTick({
            tick: parsedTick,
            insertCandle,
            updateLastCandleForStock,
            getStockCandles
        });
    });

    return () => {
        ws.close();
    };
}
