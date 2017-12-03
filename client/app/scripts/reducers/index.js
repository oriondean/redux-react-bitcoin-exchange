import { combineReducers } from 'redux';

import accounts from './accounts';
import orderBook from './order-book';
import orderDepth from './depth';
import subscriptions from './subscriptions';
import trades from './trades';

const rootReducer = combineReducers({
  accounts,
  orderDepth,
  orderBook,
  subscriptions,
  trades,
});

export default rootReducer;
