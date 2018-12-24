import React from 'react';
import TableData from "../TableData";
import TableHead from "../TableHead";

const Table = ({headings, data, sortTable, sortBy, sort}) => {
    return (
        <table>
            <TableHead headings={headings} sortTable={sortTable} sort={sort} sortBy={sortBy}/>
            <TableData headings={headings} data={data}/>
        </table>
    );
};

export default Table;
