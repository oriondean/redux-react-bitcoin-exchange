import React from 'react';

import OrderBookItem from './order-book-item';

import './order-book.scss';

export default class OrderBook extends React.Component {
    render() {

        const orders = this.props.orders.valueSeq()
            .sortBy(order => order.get('created'))
            .map(order => <OrderBookItem key={order.get('id')} order={order} />)
            .toArray();

        return <div className="order-book-container panel-container">
            <h5 className="header">MY ORDERS</h5>
            <div className="order-book">
                {orders}
            </div>
        </div>
    }

    componentWillMount() {
        this.props.subscribe(this.props.account);
    }
}

OrderBook.propTypes = {
    orders: React.PropTypes.object.isRequired,
    account: React.PropTypes.string.isRequired,
    subscribe: React.PropTypes.func.isRequired
};