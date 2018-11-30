import React, { Component } from 'react';
import './styles.css';
import Masonry from 'react-masonry-layout';

class NoteGrid extends Component {

    render() {
        const notes = this.props.notes;
        const grid = this.$refs.grid;
        const msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
        return (
            <div className="notes-grid" ref="grid">
            </div>
        );
    }
}

export default NoteGrid;
