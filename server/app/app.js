const express = require('express');
const bodyParser = require('body-parser');

const AggregatedOrderBook = require('./order-book/aggregated');
const Matcher = require('./matcher');
const Order = require('./order/order');
const PrivateOrderBooks = require('./order-book/private');

const app = express();

const matcher = new Matcher();
let orderID = 0;

const state = {
  bidAggregatedOrderBook: new AggregatedOrderBook(),
  askAggregatedOrderBook: new AggregatedOrderBook(),
  privateOrderBook: new PrivateOrderBooks(),
  tradeHistory: [],
};

const getState = account => ({
  bidAggregatedOrderBook: state.bidAggregatedOrderBook.orderBook,
  askAggregatedOrderBook: state.askAggregatedOrderBook.orderBook,
  privateOrderBook: state.privateOrderBook.get(account),
  tradeHistory: state.tradeHistory,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

matcher.on('new-trade', trade => state.tradeHistory.unshift(trade));

matcher.on('new-order', (order) => {
  state.privateOrderBook.add(order);
  const orderBook = order.isBid() ? state.bidAggregatedOrderBook : state.askAggregatedOrderBook;
  orderBook.add(order);
});

matcher.on('matched-order', (order) => {
  state.privateOrderBook.remove(order);
  const orderBook = order.isBid() ? state.bidAggregatedOrderBook : state.askAggregatedOrderBook;
  orderBook.reduce(order.price, order.quantity);
});

matcher.on('partially-matched-order', (newOrder, oldOrder, matchedQuantity) => {
  state.privateOrderBook.change(newOrder, oldOrder);
  const orderBook = newOrder.isBid() ? state.bidAggregatedOrderBook : state.askAggregatedOrderBook;
  orderBook.reduce(newOrder.price, matchedQuantity);
});

app.get('/state/:account', (req, res) => res.json(getState(req.params.account)));
app.get('/trade-history', (req, res) => res.json(state.tradeHistory));
app.get('/private-order-book/:account', (req, res) => res.json(state.privateOrderBook.get(req.params.account)));
app.get('/order-book/:side', (req, res) => {
  res.json(req.params.side === 'bid' ? state.bidAggregatedOrderBook.orderBook : state.askAggregatedOrderBook.orderBook);
});

app.post('/order', (req, res) => {
  const { action, account } = req.body;
  const price = parseFloat(req.body.price);
  const quantity = parseFloat(req.body.quantity);

  try {
    matcher.onNewOrder(new Order(orderID += 1, price, quantity, action, account));
    res.json(getState(account));
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(3000);
