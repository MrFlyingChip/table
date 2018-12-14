import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import fetch from 'cross-fetch';
import axios from 'axios';
import NoteEditor from "./components/NoteEditor";
import NoteGrid from "./components/NoteGrid";
import NoteItem from "./components/NoteItem";

const initialState = {
  notes: [],
  filteredNotes: null,
  hashTag: null
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  fetchNotes = () => {
      fetch('https://apeps.kiev.ua/api/getMessages')
          .then(res => res.json())
          .then(response => {
              const notes = response.map(note => {return this.findHashTags(note)});
              console.log(notes);
              this.setState({notes: notes});
          })
          .catch(error => {
              console.log(error);
          })
  };

  componentDidMount(){
      this.fetchNotes();
  }

  addNote = (note) => {
      axios({
          method: 'post',
          url: 'https://apeps.kiev.ua/api/addMessage',
          data: new URLSearchParams(note)
      })
          .then(response => {
              if (response.data) {
                  const {notes} = this.state;
                  note.messageID = response.data;
                  notes.push(note);
                  this.setState({notes: notes});
              }
          })
          .catch(function(error) {
              console.log(error);
          });
  };

  findHashTags = (note) => {
      let hashTags, i, len, word, words;
      words = note.text.split(/[\s\r\n]+/);
      hashTags = [];
      for (i = 0, len = words.length; i < len; i++) {
          word = words[i];
          if (word.indexOf('#') === 0) {
              hashTags.push(word);
          }
      }
      note.hashTags = hashTags;
      note.text = this.formatMentionText(note.text, note.hashTags, /(^|\s)#[a-zA-Z0-9][\w-]*\b/g);
      console.log(note);
      return note;
  };
  formatMentionText = (text, values, regex) => {
        if (!values.length)
            return text;

        return (<span>
            {text.split(regex)
                .reduce((prev, current, i) => {
                    if (!i)
                        return [current];

                    return prev.concat(
                        values.includes(current)  ?
                            <a onClick={this.findByHashTag.bind(this, current)}>
                                {current}
                            </a>
                            : current
                    );
                }, [])}
        </span>);
    };
  findByHashTag = (hashTag) => {
     const filteredNotes = this.state.notes.filter(note => {return note.hashTags && note.hashTags.includes(hashTag)});
     this.setState({filteredNotes: filteredNotes, hashTag: hashTag});
  };

  cancelHashTagSearch = () => {
    this.setState({filteredNotes: null, hashTag: null});
  };

  deleteNoteAction = (noteId) => {
      axios({
          method: 'post',
          url: 'https://apeps.kiev.ua/api/deleteMessage',
          data: new URLSearchParams({ messageID: noteId })
      });
  };

  deleteNote = (noteId) => {
      const {notes} = this.state;
      this.deleteNoteAction(noteId);
      for (let i = 0; i < notes.length; i++){
          if (notes[i].messageID === noteId) {
              notes.splice(i, 1);
          }
      }
      this.setState({notes: notes});
  };

  render() {
    const notes = this.state.filteredNotes || this.state.notes;
    const hashTag = this.state.hashTag;
    const noteItem = {text: hashTag, bgColor: `rgb(255, 0, 1)`};
    console.log(notes);
    return (
      <div className="App">
        <Header header={'Notes App'}/>
        {(hashTag) ? <NoteItem deleteNote={this.cancelHashTagSearch} note={noteItem}/> : ""}
        <NoteEditor addNote={this.addNote}/>
        <NoteGrid notes={notes} deleteNote={this.deleteNote}/>
      </div>
    );
  }
}

export default App;
