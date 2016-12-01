import * as ActionType from './action-types';

export const ORDER_BOOK = {
    'initial': ActionType.ORDER_BOOK_UPDATES.REFRESH,
    'added': ActionType.ORDER_BOOK_UPDATES.ADD_ORDER,
    'changed': ActionType.ORDER_BOOK_UPDATES.CHANGE_ORDER,
    'removed': ActionType.ORDER_BOOK_UPDATES.REMOVE_ORDER
};

export const TRADE_HISTORY = {
    'initial': ActionType.TRADE_HISTORY_UPDATES.REFRESH,
    'new': ActionType.TRADE_HISTORY_UPDATES.ADD_TRADE
};

export const ORDER_DEPTH = {
    'initial': ActionType.ORDER_DEPTH_UPDATES.REFRESH,
    'new': ActionType.ORDER_DEPTH_UPDATES.ADD_ORDER,
    'change': ActionType.ORDER_DEPTH_UPDATES.CHANGE_ORDER,
    'removal': ActionType.ORDER_DEPTH_UPDATES.REMOVE_ORDER
};