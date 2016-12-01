import React from 'react';

export default class OrderDepthItem extends React.Component {
    render() {
        const priceClass = 'price right ' + this.props.side;

        return <div className="tier">
            <span className="quantity right">{this.props.item.quantity.toFixed(9)}</span>
            <span className={priceClass}>{parseFloat(this.props.item.price).toFixed(3)}</span>
        </div>
    }
}

OrderDepthItem.propTypes = {
    item: React.PropTypes.object.isRequired,
    side: React.PropTypes.string.isRequired
};