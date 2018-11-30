import React, { Component } from 'react';
import './styles.css';

class NoteItem extends Component {

    render() {
        const note = this.props.note;
        const deleteNote = this.props.deleteNote;
        return (
            <div className="note">
                <span className="delete-note">x</span>
                <span>{note.text}</span>
            </div>
        )
    }
}

export default NoteItem;
