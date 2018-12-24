import {FETCH_TABLE, FETCH_TABLE_FOR_PAGE, SEARCH_IN_TABLE, SORT_TABLE} from '../constants/User';

let initialState = {
    table: [],
    sortedTable: [],
    maxPages: 0,
    filtered: false,
    filteredTable: []
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case FETCH_TABLE:
            return {...state, table: action.table};
        case FETCH_TABLE_FOR_PAGE:
            return {...state, sortedTable: action.sortedTable, maxPages: action.maxPages};
        case SEARCH_IN_TABLE:
            return {...state, filteredTable: action.filteredTable, filtered: action.filtered, maxPages: action.maxPages};
        case SORT_TABLE:
            return {...state, sortedTable: action.sortedTable};
        default:
            return state;
    }
}