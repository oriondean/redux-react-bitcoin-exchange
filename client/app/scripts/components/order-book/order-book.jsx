import Immutable from 'immutable';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import OrderBookItem from './order-book-item';

import './order-book.scss';

export default class OrderBook extends PureComponent {
  render() {
    const orders = this.props.orders.valueSeq()
      .sortBy(order => order.get('created'))
      .map(order => <OrderBookItem key={order.get('id')} order={order} />)
      .toArray();

    return (
      <div className="order-book-container panel-container">
        <h5 className="header">MY ORDERS</h5>
        <div className="order-book">
          {orders}
        </div>
      </div>
    );
  }
}

OrderBook.propTypes = {
  orders: PropTypes.instanceOf(Immutable.Map).isRequired,
};
