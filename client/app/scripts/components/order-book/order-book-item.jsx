import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import OrderAction from '../../constants/order-action';

// TODO: replace quantity with remaining
const OrderBookItem = ({ order }) => (
  <div className="order">
    <div className="id">ORDER #{order.get('id')}</div>
    <div className="quantity">
      <span className="initial">
        <span className="quantity-header">Quantity</span>
        <br />
        <span className="value">{order.get('initialQuantity').toFixed(9)}</span>
      </span>
      <span className="remaining">
        <span className="remaining-header">Remaining</span>
        <br />
        <span className="value">{order.get('quantity').toFixed(9)}</span>
      </span>
    </div>
    <div className="pricing">
      <span className={`action ${order.get('action') === OrderAction.BID ? 'bid' : 'ask'}`}>
        {order.get('action').toUpperCase()}
      </span>
      @
      <span className="price">{parseFloat(order.get('price')).toFixed(3)}</span>
    </div>
    <div className="time">{dateFormat(order.get('created'), 'dd mmm yyyy HH:MM:ss')}</div>
  </div>
);

OrderBookItem.propTypes = {
  order: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default OrderBookItem;
