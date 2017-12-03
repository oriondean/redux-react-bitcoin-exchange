function PrivateOrderBooks() {
  this.orderBookMap = {}; // account --> order book
}

PrivateOrderBooks.prototype.get = function get(account) {
  return this.orderBookMap[account] || [];
};

PrivateOrderBooks.prototype.add = function add(order) {
  if (!this.orderBookMap[order.account]) {
    this.orderBookMap[order.account] = [];
  }

  this.orderBookMap[order.account].push(order);
};

PrivateOrderBooks.prototype.change = function change(newOrder, oldOrder) {
  const index = this.orderBookMap[newOrder.account].indexOf(oldOrder);
  this.orderBookMap[newOrder.account].splice(index, 1, newOrder);
};

PrivateOrderBooks.prototype.remove = function remove(order) {
  const index = this.orderBookMap[order.account].indexOf(order);
  this.orderBookMap[order.account].splice(index, 1);
};

module.exports = PrivateOrderBooks;
