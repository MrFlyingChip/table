import React, { Component } from 'react';
import './styles.css';

const initialState = {
    text: ""
};
class NoteEditor extends Component {
    constructor(props){
        super(props);
        this.state = initialState;
    }

    onChange(event){
        this.setState({text: event.target.value});
    };

    hashCode = function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    };

    onSubmit(e){
        const {text} = this.state;
        const newSticker = {text: text,
                            bgColor: document.getElementById('color').value};
        this.props.addNote(newSticker);
        this.setState({text: ""});
    }

    render() {
        const text = this.state.text;
        return (
            <div className="note-editor">
                <textarea placeholder="Enter your note here ..." rows="5" onChange={this.onChange.bind(this)} name={"text"} value={text}/>
                <input type={'color'} id={'color'}/>
                <button className="add-button" disabled={text.length === 0} onClick={this.onSubmit.bind(this)}>Add</button>
            </div>
        );
    }
}

export default NoteEditor;
