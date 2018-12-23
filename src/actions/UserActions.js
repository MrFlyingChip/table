import {FETCH_TABLE_FOR_PAGE, SORT_TABLE, SEARCH_IN_TABLE, FETCH_TABLE} from '../constants/User';
import data from './data.json';

export function fetchTable() {
    return(dispatch) => {
        const table = data;
        dispatch({
            type: FETCH_TABLE,
            table: table
        })
    }
}

export function fetchTableForPage(page, count) {
    return(dispatch, getState) => {
        let table = (getState().user.filtered) ? getState().user.filteredTable : getState().user.table;
        let result = [];
        for(let i = 0; i < Math.ceil(table.length / count); i++){
            if(i === page){
                for(let j = 0; j < count; j++){
                    result.push(table[i * count + j]);
                }
            }
        }
        dispatch({
            type: FETCH_TABLE_FOR_PAGE,
            sortedTable: result,
            maxPages: Math.ceil((getState().user.filtered) ? getState().user.filteredTable / count : table.length / count)
        })
    }
}

export function sortTable(field) {
    return(dispatch, getState) => {
        let result = getState().user.table;
        result = result.sort(function (a, b) {
            if (a[field] > b[field]) {
                return 1;
            }
            if (a[field] < b[field]) {
                return -1;
            }

            return 0;
        });

        dispatch({
            type: SORT_TABLE,
            table: result
        })
    }
}

export function searchInTable(search) {
    return(dispatch, getState) => {
        const table = getState().user.table;
        let result = [];
        Object.keys(table[0]).forEach(item => {
            table.forEach(data => {
                if(data[item] && data[item].toString().includes(search) && !result.includes(data)){
                    result.push(data);
                }
            })
        });

        dispatch({
            type: SEARCH_IN_TABLE,
            filteredTable: result,
            filtered: (search && search.length > 0)
        })
    }
}

export function getTableCols(table) {
    if(table && table.length > 0){
        return Object.keys(table[0]);
    }

    return [];
}
