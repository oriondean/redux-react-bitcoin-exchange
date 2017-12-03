import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import OrderAction from '../../constants/order-action';

const TradeHistoryItem = ({ trade }) => (
  <div className="trade">
    <span className="price right">{trade.get('price').toFixed(3)}</span>
    <span className="quantity right">{trade.get('quantity').toFixed(9)}</span>
    <span className={`aggressor ${(trade.get('aggressor') === OrderAction.BID ? 'bid' : 'ask')}`}>
      {trade.get('aggressor').toUpperCase()}
    </span>
    <span className="time right">{dateFormat(trade.get('created'), 'dd mmm yyyy HH:MM:ss')}</span>
  </div>
);

TradeHistoryItem.propTypes = {
  trade: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default TradeHistoryItem;
