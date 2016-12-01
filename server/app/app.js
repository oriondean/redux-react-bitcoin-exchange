var app = require('http').createServer();
var io = require('socket.io')(app);

var AggregatedOrderBook = require('./order-book/aggregated');
var Matcher = require('./matcher');
var Order = require("./order/order");
var PrivateOrderBooks = require('./order-book/private');

var matcher = new Matcher();
var orderID = 0;

app.listen(8081);

var data = {
    bidAggregatedOrderBook: new AggregatedOrderBook(),
    askAggregatedOrderBook: new AggregatedOrderBook(),
    privateOrderBook: new PrivateOrderBooks(),
    tradeHistory: []
};

matcher.on("new-trade", function(trade) {
    data.tradeHistory.unshift(trade);
    io.to("trade-history").emit("trade-history", "new", trade);
});

matcher.on("new-order", function(order) {
    console.log("matcher: new order", order.id, order.price, order.quantity, order.action, order.account);

    data.privateOrderBook.add(order);
    io.to("account-" + order.account).emit("private-order-book", "added", order);

    var update = order.isBid() ? data.bidAggregatedOrderBook.add(order) : data.askAggregatedOrderBook.add(order);
    io.to("aggregated-order-book").emit("aggregated-order-book", update.type, order.action, update.data);
});

matcher.on("matched-order", function(order) {
    console.log("matcher: matched order", order.id, order.price, order.quantity);

    data.privateOrderBook.remove(order);
    io.to("account-" + order.account).emit("private-order-book", "removed", order);

    var update = order.isBid() ? data.bidAggregatedOrderBook.reduce(order.price, order.quantity) :
        data.askAggregatedOrderBook.reduce(order.price, order.quantity);
    io.to("aggregated-order-book").emit("aggregated-order-book", update.type, order.action, update.data);
});

matcher.on("partially-matched-order", function(newOrder, oldOrder, matchedQuantity) {
    console.log("matcher: partially-matched-order", newOrder.id, newOrder.price, newOrder.quantity, newOrder.action, newOrder.account);

    data.privateOrderBook.change(newOrder, oldOrder);
    io.to("account-" + newOrder.account).emit("private-order-book", "changed", newOrder);

    var update = newOrder.isBid() ? data.bidAggregatedOrderBook.reduce(newOrder.price, matchedQuantity) :
        data.askAggregatedOrderBook.reduce(newOrder.price, matchedQuantity);
    io.to("aggregated-order-book").emit("aggregated-order-book", update.type, newOrder.action, update.data);
});

io.on('connection', function (socket) {
    console.log("new connection", socket.id);

    socket.on('order', function(order) {

        order.price = parseFloat(order.price);
        order.quantity = parseFloat(order.quantity);

        matcher.onNewOrder(new Order(++orderID, order.price, order.quantity, order.action, order.account));
    });

    socket.on('aggregated-order-book', function() {
        socket.join("aggregated-order-book");
        socket.emit("aggregated-order-book", "initial", "bid", data.bidAggregatedOrderBook.orderBook);
        socket.emit("aggregated-order-book", "initial", "ask", data.askAggregatedOrderBook.orderBook);
    });

    socket.on('private-order-book', function(account) {
        console.log("private order book", account, data.privateOrderBook.get(account).length, "orders");

        for(var i = 0; i < socket.rooms.length; i++) {
            if(/^account-/.test(socket.rooms[i])) {
                socket.leave(socket.rooms[i]);
            }
        }

        socket.join("account-" + account);

        socket.emit("private-order-book", "initial", data.privateOrderBook.get(account));
    });

    socket.on('trade-history', function() {
        socket.join("trade-history");
        socket.emit("trade-history", "initial", data.tradeHistory);
    });
});