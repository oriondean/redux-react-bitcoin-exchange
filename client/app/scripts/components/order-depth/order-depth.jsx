import React from 'react';
import OrderDepthItem from './order-depth-item';

import './order-depth.scss';

export default class OrderDepth extends React.Component {
    render() {
        const orderBookClass = 'aggregated-order-book ' + this.props.side + '-side';
        
        const items = this.props.depth.map((quantity, price) => {
            const item = {price: price, quantity: quantity};
            return <OrderDepthItem key={price} item={item} side={this.props.side}/>
        }).toArray();

        return <div className="aggregated-order-book-container panel-container">
            <h5 className="header">ORDER DEPTH</h5>
            <div className="book-header">
                <span className="price right">Market Size</span><span className="quantity right">Price</span>
            </div>
            <div className={orderBookClass}>
                {items}
            </div>
        </div>
    }

    componentWillMount() {
        this.props.subscribe();
    }
}

OrderDepth.propTypes = {
    depth: React.PropTypes.object.isRequired,
    side: React.PropTypes.string.isRequired,
    subscribe: React.PropTypes.func.isRequired
};