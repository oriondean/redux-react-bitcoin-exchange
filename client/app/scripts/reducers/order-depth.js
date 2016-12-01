import Immutable from 'immutable';
import {ORDER_DEPTH_UPDATES} from '../constants/action-types';

const initialState = Immutable.Map();

export default function reducer(orderAction) {
    return function reduce(state = initialState, action) {
        const data = action.data;
        
        if(action.orderAction !== orderAction) {
            return state; // shortcut if order action doesn't apply to this side of the depth
        }

        if(data && data.price != null) {
            data.price = data.price.toString(); // ensure key is a string, rather than number
        }

        switch(action.type) {
            case ORDER_DEPTH_UPDATES.REFRESH:
                return Immutable.fromJS(data);
            case ORDER_DEPTH_UPDATES.ADD_ORDER:
                return state.set(data.price, data.quantity);
            case ORDER_DEPTH_UPDATES.CHANGE_ORDER:
                return state.set(data.price, data.quantity);
            case ORDER_DEPTH_UPDATES.REMOVE_ORDER:
                return state.delete(data.price);
            default:
                return state;
        }
    }
}