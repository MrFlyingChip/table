import React from 'react';

const Footer = ({page, count, rowsCount, rowsFilteredCount, filtered}) => {
    function generateFooter() {
        const startRow = count * page + 1;
        let endRow = count * page + +count;
        if(filtered){
            if(endRow > rowsFilteredCount){
                endRow = rowsFilteredCount;
            }
            return 'Showing ' + startRow + ' to ' + endRow + ' of ' +
                rowsFilteredCount + ' entries (filtered from ' + rowsCount + ' total entries)';
        } else {
            if(endRow > rowsCount){
                endRow = rowsCount;
            }
            return 'Showing ' + startRow + ' to ' + endRow + ' of ' +
                rowsCount + ' entries';
        }
    }

    return (
        <div>
            {generateFooter()}
        </div>
    );
};

export default Footer;
