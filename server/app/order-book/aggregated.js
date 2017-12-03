function AggregatedOrderBook() {
  this.orderBook = {};
}

AggregatedOrderBook.prototype.add = function add(order) {
  if (this.orderBook[order.price]) {
    this.orderBook[order.price] += order.quantity;
    return { type: 'change', data: { price: order.price, quantity: this.orderBook[order.price] } };
  }

  this.orderBook[order.price] = order.quantity;
  return { type: 'new', data: { price: order.price, quantity: this.orderBook[order.price] } };
};

AggregatedOrderBook.prototype.reduce = function reduce(price, quantity) {
  this.orderBook[price] -= quantity;

  if (this.orderBook[price] === 0) {
    delete this.orderBook[price];
    return { type: 'removal', data: { price } };
  }

  return { type: 'change', data: { price, quantity: this.orderBook[price] } };
};

module.exports = AggregatedOrderBook;
