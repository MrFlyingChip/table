import React, { Component } from 'react';

const Header = ({onCountChange, onSearchChange}) => {
    return (
        <div className={'app-header'}>
            <div>Show
                <select onChange={onCountChange.bind(this)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                </select>
                entries per page
            </div>
            <div className={'search-items'}>
                Search:
                <input type={'search'} onChange={onSearchChange.bind(this)}/>
            </div>
        </div>
    );
};

export default Header;
