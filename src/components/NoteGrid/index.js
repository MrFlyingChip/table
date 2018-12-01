import React, {Component} from 'react';
import './styles.css';
import Masonry  from 'react-masonry-layout';
import NoteItem from "../NoteItem";
import PropTypes from 'prop-types';

class NoteGrid extends Component{
    render() {
        const notesList = this.props.notes.map(item => {
            return (
                <NoteItem note={item} deleteNote={this.props.deleteNote} key={item.messageID}/>
            )
        });
        return (
            <div className="notes-grid">
                <Masonry
                    id="masonry-layout"
                    ref={instance => this.instance = instance}
                    sizes={[{columns: 6, gutter: 10}]}>
                    {notesList}
                </Masonry>
            </div>
        )
    }
}

NoteGrid.propTypes = {
    notes: PropTypes.array.isRequired,
    deleteNote: PropTypes.func.isRequired
};

export default NoteGrid;
