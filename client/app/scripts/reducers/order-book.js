import Immutable from 'immutable';
import {ORDER_BOOK_UPDATES} from '../constants/action-types';

const initialState = Immutable.Map();

export default function reduce(state = initialState, action) {
    if(action.data && action.data.id != null) {
        action.data.id = action.data.id.toString(); // ensure key is a string, rather than number
    }

    switch(action.type) {
        case ORDER_BOOK_UPDATES.REFRESH:
        {
            // Transform array of orders into map (id -> order)
            const ordersById = action.data.reduce((map, order) => {
                map[order.id] = order;
                return map;
            }, {});

            return Immutable.fromJS(ordersById);
        }
        case ORDER_BOOK_UPDATES.ADD_ORDER:
            return state.set(action.data.id, Immutable.fromJS(action.data));
        case ORDER_BOOK_UPDATES.CHANGE_ORDER:
            return state.set(action.data.id, Immutable.fromJS(action.data));
        case ORDER_BOOK_UPDATES.REMOVE_ORDER:
            return state.remove(action.data.id);
        default:
            return state;
    }
}