import React from 'react';

const Footer = ({page, count, rowsCount, rowsFilteredCount, filtered}) => {
    function generateFooter() {
        const startRow = count * page + 1;
        const endRow = count * page + +count;
        if(filtered){
            return 'Showing ' + startRow + ' to ' + endRow + ' of ' +
                rowsFilteredCount + ' entries (filtered from ' + rowsCount + ' total entries)';
        } else {
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
