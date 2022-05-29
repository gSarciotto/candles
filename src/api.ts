import express from "express";
import { Candle } from "./types";

interface StartServerParams {
    port: number;
    getStockCandles: (stockName: string) => Candle[];
}

export function startServer({
    port = 3000,
    getStockCandles
}: StartServerParams) {
    const app = express();

    app.get("/candles/:stockSymbol", (request, response) => {
        const candles = getStockCandles(request.params.stockSymbol);
        if (!candles || !candles.length) {
            response.status(404).json();
        } else {
            response.status(200).json(candles);
        }
    });

    return app.listen(port, () => {
        console.log(`Started api on port ${port}`);
    });
}
