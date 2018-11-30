import React, { Component } from 'react';
import './styles.css';

class Header extends Component {

    render() {
        const text = this.props.header || '';
        return (
            <h2 className="app-header">
                {text}
            </h2>
        );
    }
}

export default Header;
