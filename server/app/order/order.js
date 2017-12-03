const OrderAction = require('./orderAction');

/**
 * Immutable order object
 *
 * @param id order id
 * @param price order price
 * @param quantity order quantity
 * @param action orders action (bid or ask)
 * @param account account order belongs to
 * @param initialQuantity initial order quantity
 * @constructor
 * */
function Order(id, price, quantity, action, account, initialQuantity) {
  if (id == null) {
    return new Error('Invalid order id');
  }

  if (price == null || Number.isNaN(Number(price))) {
    throw new Error('Invalid price');
  }

  if (quantity == null || Number.isNaN(Number(quantity)) || quantity <= 0) {
    throw new Error(`Invalid quantity ${quantity}`);
  }

  if (action !== OrderAction.BID && action !== OrderAction.ASK) {
    throw new Error('Invalid order action');
  }

  if (account == null) {
    throw new Error('Invalid account');
  }

  this.id = id;
  this.price = price;
  this.quantity = quantity;
  this.initialQuantity = initialQuantity == null ? quantity : initialQuantity;
  this.action = action;
  this.account = account;
  this.created = Date.now();

  Object.freeze(this); // immutable
}

/**
 * If order is a bid order
 * @returns {boolean} true if order is a bid order, otherwise false
 */
Order.prototype.isBid = function isBid() {
  return this.action === OrderAction.BID;
};

/**
 * Returns true if order can be matched with given counterpart
 * @param order
 * @returns {boolean} true if can be matched, otherwise false
 */
Order.prototype.canMatch = function canMatch(order) {
  if (this.isBid() === order.isBid()) return false; // can't match two bid/ask orders

  return this.isBid() ? this.price <= order.price : this.price >= order.price;
};

/**
 * Returns true if the order has a worse price than given counterpart
 * @param order
 * @returns {boolean} true if worse price
 */
Order.prototype.hasWorsePrice = function hasWorsePrice(order) {
  if (this.isBid() !== order.isBid()) {
    throw new Error('Cannot compare prices between orders with different actions');
  }

  return this.isBid() ? this.price > order.price : this.price < order.price;
};

/**
 * Returns new order object with reduced quantity
 * @param amount amount to reduce existing quantity by
 * @returns {Order}
 */
Order.prototype.reduceQuantity = function reduceQuantity(amount) {
  return new Order(
    this.id, this.price, this.quantity - amount, this.action,
    this.account, this.initialQuantity,
  );
};

module.exports = Order;
