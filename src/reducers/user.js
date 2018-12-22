import {FETCH_TABLE, FETCH_TABLE_FOR_PAGE, SEARCH_IN_TABLE, SORT_TABLE} from '../constants/User';

let initialState = {
    table: [],
    sortedTable: []
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case FETCH_TABLE:
            return {...state, table: action.table};
        case FETCH_TABLE_FOR_PAGE:
            return {...state, sortedTable: action.sortedTable};
        case SEARCH_IN_TABLE:
            return {...state, table: action.table};
        case SORT_TABLE:
            return {...state, sortedTable: action.sortedTable};
        default:
            return state;
    }
}