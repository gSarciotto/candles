# Candles

Simple building of stock candles. We consume a websocket API with the prices for a stock and then build the 1-minute candles for it. The candles are stored in memory.

Assumptions:
* The sequence of ticks from 3rd party is in ascending order in time.
* Dont care about loss of precision of using float point numbers and no need to specify a precision range when comparing them.

##### Running the code
The project has a Dockerfile on it. Assuming that docker is installed, first build the image running the following command in the root folder of the project:
```
docker build -t candles-test .
```

After built, run the following (pick a port on the host that will be mapped in the container):
```
docker run -p <port>:3000 --name candles candles-test
```

To stop the container:
```
docker stop candles
```

To delete the container:
```
docker rm candles
```

##### Get candles for a stock
PS: use the same port as the one you ran the docker container.
```
curl -X GET http://localhost:<port>/candles/<stock_symbol>
```
If the stock_symbol is unknown, the server will reply with a 404, else it will answer with all the candles of that stock until now.