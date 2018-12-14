import React from 'react';
import './styles.css';
import PropTypes from "prop-types";

const NoteItem = ({note, deleteNote}) =>{
        const onClick = (e) => {
          deleteNote(note.messageID);
        };
        return (
            <div className="note" style={{backgroundColor: note.bgColor}}>
                <span className="delete-note" onClick={onClick.bind(this)}>x</span>
                {note.text}
            </div>
        )
};

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    deleteNote: PropTypes.func.isRequired
};

export default NoteItem;
