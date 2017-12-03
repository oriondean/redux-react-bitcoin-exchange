import React from 'react';
import PropTypes from 'prop-types';

const OrderDepthItem = ({ item, side }) => (
  <div className="tier">
    <span className="quantity right">{item.quantity.toFixed(9)}</span>
    <span className={`price right ${side}`}>
      {parseFloat(item.price).toFixed(3)}
    </span>
  </div>
);

OrderDepthItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  side: PropTypes.string.isRequired,
};

export default OrderDepthItem;
