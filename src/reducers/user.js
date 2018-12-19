import {DELETE_STICKER, ADD_STICKER, FETCH_STICKERS} from '../constants/User';

let initialState = {
    notes: []
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case FETCH_STICKERS:
            return {...state, notes: action.notes};
        case ADD_STICKER:
            return {...state, notes: action.notes};
        case DELETE_STICKER:
            return {...state, notes: action.notes};
        default:
            return state;
    }
}