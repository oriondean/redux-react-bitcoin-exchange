const EventEmitter = require('events');
const Trade = require('./trade/trade');
const Util = require('util');

/**
 * Creates new Matcher
 * @constructor
 */
function Matcher() {
  EventEmitter.call(this);

  this.bidOrders = []; // sorted lowest to highest price (best offer)
  this.askOrders = []; // sorted highest to lowest price (best offer)
  this.trades = [];
}

Util.inherits(Matcher, EventEmitter);

/**
 * Attempts to match new order with existing orders, otherwise adds it to be matched
 * @param newOrder
 */
Matcher.prototype.onNewOrder = function onNewOrder(newOrder) {
  const order = this.match(newOrder, newOrder.isBid() ? this.askOrders : this.bidOrders);

  if (order) {
    let index = 0;
    const orders = order.isBid() ? this.bidOrders : this.askOrders;

    while (orders[index] && !orders[index].hasWorsePrice(order)) {
      index += 1;
    }

    this.emit('new-order', order);
    orders.splice(index, 0, order);
  }
};

/**
 * Matches an order with potential candidate orders
 *
 * @param toMatch new order that needs a match
 * @param toMatchAgainst potential orders that can be matched
 * @returns {order} null if order has been fully matched, otherwise remaining part of order
 */
Matcher.prototype.match = function match(toMatch, candidates) {
  let order = toMatch;

  while (!!candidates[0] && order.canMatch(candidates[0])) {
    const existingOrder = candidates[0];
    const matchedQuantity = Math.min(existingOrder.quantity, order.quantity);

    // match at existing order's price, and lowest quantity
    this.trades.push(new Trade(existingOrder.price, matchedQuantity, order.action));
    this.emit('new-trade', this.trades.slice(-1));

    if (order.quantity >= existingOrder.quantity) {
      this.emit('matched-order', existingOrder);
      candidates.splice(0, 1); // existing fully matched, remove

      if (order.quantity === existingOrder.quantity) {
        return null; // new order fully matched
      }

      order = order.reduceQuantity(existingOrder.quantity);
    } else {
      // eslint-disable-next-line no-param-reassign
      candidates[0] = existingOrder.reduceQuantity(order.quantity); // existing partially matched
      this.emit('partially-matched-order', candidates[0], existingOrder, matchedQuantity);

      return null; // new order fully matched
    }
  }

  return order;
};

module.exports = Matcher;
