import React from 'react';
import TableData from "../TableData";
import TableHead from "../TableHead";

const Table = ({headings, data}) => {
    return (
        <table>
            <TableHead headings={headings}/>
            <TableData headings={headings} data={data}/>
        </table>
    );
};

export default Table;
