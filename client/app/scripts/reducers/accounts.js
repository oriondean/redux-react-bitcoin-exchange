import Immutable from 'immutable';
import {CHANGE_ACCOUNT} from '../constants/action-types';

const initialState = {
    available: Immutable.Set(['jmadden', 'dkerr', 'wferg', 'wsmith', 'jarnstein', 'aconlin']),
    selected: 'jmadden'
};

export default function reduce(state = initialState, action) {
    switch(action.type) {
        case CHANGE_ACCOUNT:
            return { selected: action.account, available: state.available };

        default:
            return state;
    }
}