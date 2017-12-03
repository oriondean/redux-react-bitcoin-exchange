import * as ActionTypes from '../constants/action-types';

const host = 'http://localhost:3000';

const headers = new Headers({
  'Content-Type': 'application/json; charset=UTF-8',
});

const handleResponse = (data, dispatch) => {
  dispatch({
    type: ActionTypes.ORDER_DEPTH_UPDATES.REFRESH, data: data.bidAggregatedOrderBook, orderAction: 'bid',
  });
  dispatch({
    type: ActionTypes.ORDER_DEPTH_UPDATES.REFRESH, data: data.askAggregatedOrderBook, orderAction: 'ask',
  });
  dispatch({
    type: ActionTypes.ORDER_BOOK_UPDATES.REFRESH, data: data.privateOrderBook,
  });
  dispatch({
    type: ActionTypes.TRADE_HISTORY_UPDATES.REFRESH, data: data.tradeHistory,
  });
};

export const retrieveState = () => (
  (dispatch, getState) => (
    fetch(`${host}/state/${getState().accounts.selected}`, { method: 'GET', headers })
      .then(res => res.json())
      .then(data => handleResponse(data, dispatch))
  )
);

export const changeAccount = account => (
  (dispatch) => {
    dispatch({
      type: ActionTypes.CHANGE_ACCOUNT,
      account,
    });
    dispatch(retrieveState());
  }
);

export const submitOrder = order => (
  dispatch => (
    fetch(`${host}/order`, {
      method: 'POST',
      headers,
      body: JSON.stringify(order),
    })
      .then(res => res.json())
      .then(data => handleResponse(data, dispatch))
  )
);
