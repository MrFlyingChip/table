import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import fetch from 'cross-fetch';
import NoteEditor from "./components/NoteEditor";

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
    const notesList = notes.map(item => {
      return(
          <p>{item.text}</p>
      )
    });

    return (
      <div className="App">
        <Header header={'Notes App'}/>
        <NoteEditor addNote={this.addNote}/>
          {notesList}
      </div>
    );
  }
}

export default App;
