import React, {Component} from 'react';
import './styles.css';
import Masonry  from 'masonry-layout';
import NoteItem from "../NoteItem";
import PropTypes from 'prop-types';

class NoteGrid extends Component{
    componentDidMount() {
        const grid = this.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.msnry.reloadItems();
        this.msnry.layout();
    }

    render() {
        const notesList = this.props.notes.map(item => {
            return (
                <NoteItem note={item} deleteNote={this.props.deleteNote} key={item.messageID}/>
            )
        });
        return (
            <div className="notes-grid" ref={grid => this.grid = grid}>
                {notesList}
            </div>
        )
    }
}

NoteGrid.propTypes = {
    notes: PropTypes.array.isRequired,
    deleteNote: PropTypes.func.isRequired
};

export default NoteGrid;
