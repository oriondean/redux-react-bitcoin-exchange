/**
 * Immutable trade object
 *
 * @param price trade price
 * @param quantity trade quantity
 * @param aggressor trade aggressor
 * @constructor
 */
function Trade(price, quantity, aggressor) {
    this.price = price;
    this.quantity = quantity;
    this.created = Date.now();
    this.aggressor = aggressor;

    Object.freeze(this); // immutable
}

module.exports = Trade;