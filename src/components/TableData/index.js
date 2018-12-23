import React from 'react';

const TableData = ({data, headings}) => {
    let tableRows = data.map(item => {
        if(item) {
            return (
                <tr key={item['ID']}>
                    {headings.map(col => {
                        return <td key={item[col]}>{item[col]}</td>
                    })}
                </tr>)
        }
    });
    return (
        <tbody>{tableRows}</tbody>
    );
};

export default TableData;
