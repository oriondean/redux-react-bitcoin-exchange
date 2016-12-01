import * as ActionTypes from '../constants/action-types';
import * as APIMappings from '../constants/api-mappings';
import Socket from '../connection/socket';

export const changeAccount = account => {
    return dispatch => {
        Socket.emit('private-order-book', account);
        dispatch({
            type: ActionTypes.CHANGE_ACCOUNT,
            account
        });
    };
};

export const submitOrder = order => {
    // TODO: Implement a server-response to sending a new order
    Socket.emit('order', order);
};

export const subscribeOrderBook = account => {
    return (dispatch, getState) => {
        if(getState().subscriptions.get('orderBook')) return;
        
        Socket.emit('private-order-book', account); // subscribe
        dispatch({type: ActionTypes.SUBSCRIBE.ORDER_BOOK});
        
        Socket.on('private-order-book', (updateType, data) => {
            dispatch({
                type: APIMappings.ORDER_BOOK[updateType],
                data: data
            });
        });
    };
};

export const subscribeTradeHistory = () => {
    return (dispatch, getState) => {
        if(getState().subscriptions.get('tradeHistory')) return;
        
        Socket.emit('trade-history'); // subscribe
        dispatch({type: ActionTypes.SUBSCRIBE.TRADE_HISTORY});
        
        Socket.on('trade-history', (updateType, data) => {
            dispatch({
                type: APIMappings.TRADE_HISTORY[updateType],
                data: data
            });
        });
    }
};

export const subscribeOrderDepth = () => {
    return (dispatch, getState) => {
        if(getState().subscriptions.get('orderDepth')) return;
        
        Socket.emit('aggregated-order-book'); // subscribe
        dispatch({type: ActionTypes.SUBSCRIBE.ORDER_DEPTH});

        Socket.on('aggregated-order-book', (updateType, orderAction, data) => {
            dispatch({
                type: APIMappings.ORDER_DEPTH[updateType],
                data: data,
                orderAction: orderAction
            });
        });      
    };
};