import { startServer } from "./api";
import { createCandleStore } from "./candleStore";
import { startWebSocketClient } from "./websocket";

const { insertCandle, getStockCandles, updateLastCandleForStock } =
    createCandleStore();

const shutdownWebSocket = startWebSocketClient({
    insertCandle,
    getStockCandles,
    updateLastCandleForStock
});
const server = startServer({
    port: 3000,
    getStockCandles
});

function shutdown() {
    server.close();
    shutdownWebSocket();
}

process.on("uncaughtException", (err) => {
    console.error("uncaught exception", err);
});

process.on("SIGTERM", shutdown);
