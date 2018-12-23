import React from 'react';

const TableHead = ({headings}) => {
    const tableCols = headings.map(item => {
        return (
            <th key={item}>{item}</th>
        );
    });
    return (
        <thead><tr>{tableCols}</tr></thead>
    );
};

export default TableHead;
