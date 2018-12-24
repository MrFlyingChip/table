import React from 'react';

const TableHead = ({headings, sortTable, sortBy, sort}) => {
    const tableCols = headings.map(item => {
        return (
            <th key={item} className={(sortBy === item && sort === 0) ? 'sortAsc' : ((sortBy === item && sort === 1) ? 'sortDesc' : '')}
                onClick={sortTable.bind(this, item, (sortBy === item && sort === 0) ? 1 : 0)}>{item}</th>
        );
    });
    return (
        <thead><tr>{tableCols}</tr></thead>
    );
};

export default TableHead;
