import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import fetch from 'cross-fetch';
import NoteEditor from "./components/NoteEditor";
import NoteGrid from "./components/NoteGrid";

const initialState = {
  notes: []
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount(){
      fetch('https://apeps.kiev.ua/api/getMessages')
          .then(res => res.json())
          .then(response => {
            this.setState({notes: response});
          })
          .catch(error => {
            console.log(error);
          })
  }

  addNote = (note) => {
    const {notes} = this.state;
    notes.push(note);
    this.setState({notes: notes});
  };

  deleteNote = (noteId) => {
      const {notes} = this.state;
      for (let i = 0; i < notes.length; i++){
          if (notes[i].messageID === noteId) {
              notes.splice(i, 1);
          }
      }
      this.setState({notes: notes});
  };

  render() {
    const notes = this.state.notes;
    console.log(notes);
    return (
      <div className="App">
        <Header header={'Notes App'}/>
        <NoteEditor addNote={this.addNote}/>
        <NoteGrid notes={notes} deleteNote={this.deleteNote}/>
      </div>
    );
  }
}

export default App;
