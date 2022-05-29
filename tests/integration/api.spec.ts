import { expect } from "chai";
import { describe } from "mocha";
import supertest from "supertest";
import { startServer } from "../../src/api";
import { createCandleStore } from "../../src/candleStore";
import { Candle } from "../../src/types";

describe("GET", () => {
    let server: ReturnType<typeof startServer>;
    let request: ReturnType<typeof supertest.agent>;
    const { getStockCandles, resetStore, insertCandle } = createCandleStore();
    before(() => {
        server = startServer({
            port: 3000,
            getStockCandles
        });
        request = supertest.agent(server);
    });

    beforeEach(() => {
        resetStore();
    });

    after(() => {
        server?.close();
    });

    it("/candles should return 404", async () => {
        const response = await request.get("/candles");
        expect(response.status).to.be.equal(404);
    });
    it("/candles/${stockName} should return a list candles for the requested stock if it exists", async () => {
        const existingStock = "APPL";
        const existingCandle: Candle = {
            symbol: existingStock,
            low: 1,
            opening: 2,
            closing: 3,
            high: 7,
            startingTimestampInUTC: Date.now()
        };
        insertCandle(existingCandle);
        const expectedCandles: Candle[] = [existingCandle];
        const response = await request.get(`/candles/${existingStock}`);
        expect(response.status).to.be.equal(200);
        expect(response.body)
            .to.be.an("array")
            .with.deep.members(expectedCandles);
    });
    it("/candles/${stockName} should return 404 if requested stock does not exist", async () => {
        const nonExistentStock = "xd";
        const existingCandle: Candle = {
            symbol: "APPL",
            low: 1,
            opening: 2,
            closing: 3,
            high: 7,
            startingTimestampInUTC: Date.now()
        };
        insertCandle(existingCandle);
        const response = await request.get(`/candles/${nonExistentStock}`);
        expect(response.status).to.be.equal(404);
    });
});
