import Immutable from 'immutable';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TradeHistoryItem from './trade-history-item';

import './trade-history.scss';

export default class TradeHistory extends PureComponent {
  componentWillMount() {
    this.props.subscribe();
  }

  render() {
    const trades = this.props.trades.map((trade, index) => (
      <TradeHistoryItem key={String(index)} trade={trade} />
    )).toArray();

    return (
      <div className="trade-history-container panel-container">
        <h5 className="header">TRADE HISTORY</h5>
        <div className="history-header">
          <span className="price right">Price</span>
          <span className="quantity right">Quantity</span>
          <span className="aggressor">Aggressor</span>
          <span className="time right">Time</span>
        </div>
        <div className="trade-history">
          {trades}
        </div>
      </div>
    );
  }
}

TradeHistory.propTypes = {
  trades: PropTypes.instanceOf(Immutable.List).isRequired,
  subscribe: PropTypes.func.isRequired,
};
