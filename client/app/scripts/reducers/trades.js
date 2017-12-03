import Immutable from 'immutable';
import { TRADE_HISTORY_UPDATES } from '../constants/action-types';

const initialState = Immutable.List();

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case TRADE_HISTORY_UPDATES.REFRESH:
      return Immutable.fromJS(action.data);
    case TRADE_HISTORY_UPDATES.ADD_TRADE:
      return state.unshift(Immutable.fromJS(action.data));
    default:
      return state;
  }
}
