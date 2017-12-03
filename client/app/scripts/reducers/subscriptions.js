import Immutable from 'immutable';
import { SUBSCRIBE } from '../constants/action-types';

const initialState = Immutable.Map({
  orderBook: false,
  orderDepth: false,
  tradeHistory: false,
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE.ORDER_BOOK:
      return state.set('orderBook', true);
    case SUBSCRIBE.ORDER_DEPTH:
      return state.set('orderDepth', true);
    case SUBSCRIBE.TRADE_HISTORY:
      return state.set('tradeHistory', true);
    default:
      return state;
  }
}
