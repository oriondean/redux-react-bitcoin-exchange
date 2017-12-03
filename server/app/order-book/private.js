function PrivateOrderBooks() {
  this.orderBookMap = {}; // account --> order book
}

PrivateOrderBooks.prototype.get = account => this.orderBookMap[account] || [];

PrivateOrderBooks.prototype.add = (order) => {
  if (!this.orderBookMap[order.account]) {
    this.orderBookMap[order.account] = [];
  }

  this.orderBookMap[order.account].push(order);
};

PrivateOrderBooks.prototype.change = (newOrder, oldOrder) => {
  const index = this.orderBookMap[newOrder.account].indexOf(oldOrder);
  this.orderBookMap[newOrder.account].splice(index, 1, newOrder);
};

PrivateOrderBooks.prototype.remove = (order) => {
  const index = this.orderBookMap[order.account].indexOf(order);
  this.orderBookMap[order.account].splice(index, 1);
};

module.exports = PrivateOrderBooks;
