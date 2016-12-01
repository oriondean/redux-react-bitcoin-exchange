import React from 'react';
import TradeHistoryItem from './trade-history-item';

import './trade-history.scss';

export default class TradeHistory extends React.Component {
    render() {
        const trades = this.props.trades.map((trade, index) => {
            return <TradeHistoryItem key={index} trade={trade} />;
        }).toArray();

        return <div className="trade-history-container panel-container">
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
    }

    componentWillMount() {
        this.props.subscribe();
    }
}

TradeHistory.propTypes = {
    trades: React.PropTypes.object.isRequired,
    subscribe: React.PropTypes.func.isRequired
};