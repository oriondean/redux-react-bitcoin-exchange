import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './order-entry.scss';

class OrderEntry extends Component {
  constructor() {
    super();

    this.state = {
      price: 15,
      quantity: 10,
    };
  }

  onQuantityChange(quantity) {
    this.setState({ quantity: parseFloat(quantity) });
  }

  onPriceChange(price) {
    this.setState({ price: parseFloat(price) });
  }

  isInvalid() {
    return Number.isNaN(this.state.price) ||
      Number.isNaN(this.state.quantity) ||
      this.state.quantity < 1;
  }

  placeBid() {
    this.props.submitOrder({
      price: this.state.price, quantity: this.state.quantity, action: 'bid', account: this.props.account,
    });
  }

  placeAsk() {
    this.props.submitOrder({
      price: this.state.price, quantity: this.state.quantity, action: 'ask', account: this.props.account,
    });
  }

  render() {
    const invalid = this.isInvalid();

    return (
      <div className="order-entry-container panel-container">
        <h5 className="header">ORDER ENTRY</h5>
        <form className="order-entry-form form-inline" name="form">
          <input
            type="number"
            className="form-control"
            id="quantity-field"
            placeholder="Quantity"
            value={this.state.quantity}
            onChange={event => this.onQuantityChange(event.target.value)}
            required
          />
          <input
            type="number"
            className="form-control"
            id="price-field"
            placeholder="Price"
            value={this.state.price}
            onChange={event => this.onPriceChange(event.target.value)}
            required
          />
          <button type="button" className="btn btn-default disabled">Limit</button>
          <button
            type="button"
            className="btn btn-default btn-bid bid right"
            onClick={() => this.placeBid()}
            disabled={invalid}
          >
            Place Bid
          </button>
          <button
            type="button"
            className="btn btn-default btn-ask ask right"
            onClick={() => this.placeAsk()}
            disabled={invalid}
          >
            Place Ask
          </button>
        </form>
      </div>
    );
  }
}

OrderEntry.propTypes = {
  account: PropTypes.string.isRequired,
  submitOrder: PropTypes.func.isRequired,
};

export default OrderEntry;
