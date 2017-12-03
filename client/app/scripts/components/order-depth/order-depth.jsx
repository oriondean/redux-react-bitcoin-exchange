import Immutable from 'immutable';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import OrderDepthItem from './order-depth-item';

import './order-depth.scss';

export default class OrderDepth extends PureComponent {
  render() {
    const items = this.props.depth.map((quantity, price) => {
      const item = { price, quantity };
      return <OrderDepthItem key={String(price)} item={item} side={this.props.side} />;
    }).toArray();

    return (
      <div className="aggregated-order-book-container panel-container">
        <h5 className="header">ORDER DEPTH</h5>
        <div className="book-header">
          <span className="price right">Market Size</span>
          <span className="quantity right">Price</span>
        </div>
        <div className={`aggregated-order-book ${this.props.side}-side`}>
          {items}
        </div>
      </div>
    );
  }
}

OrderDepth.propTypes = {
  depth: PropTypes.instanceOf(Immutable.Map).isRequired,
  side: PropTypes.string.isRequired,
};
