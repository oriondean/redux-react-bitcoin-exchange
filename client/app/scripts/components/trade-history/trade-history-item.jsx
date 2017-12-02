import React from 'react';
import OrderAction from '../../constants/order-action';
import dateFormat from 'dateformat';

export default class TradeHistoryItem extends React.Component {
    render() {
        const trade = this.props.trade;
        const aggressorClass = 'aggressor ' + (trade.get('aggressor') === OrderAction.BID ? 'bid' : 'ask');
        
        return <div className="trade">
            <span className="price right">{trade.get('price').toFixed(3)}</span>
            <span className="quantity right">{trade.get('quantity').toFixed(9)}</span>
            <span className={aggressorClass}>{trade.get('aggressor').toUpperCase()}</span>
            <span className="time right">{dateFormat(trade.get('created'), 'dd mmm yyyy HH:MM:ss')}</span>
        </div>
    }
}

TradeHistoryItem.propTypes = {
    trade: React.PropTypes.object.isRequired
};