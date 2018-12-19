import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import NoteEditor from "./components/NoteEditor";
import NoteGrid from "./components/NoteGrid";
import NoteItem from "./components/NoteItem";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as UserActions from "./actions/UserActions";

const initialState = {
  filteredNotes: null,
  hashTag: null
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount(){
      this.props.actions.fetchNotes(this.findByHashTag);
  }

  addNote = (note) => {
      this.props.actions.addNote(note, this.findByHashTag);
  };

  findByHashTag = (hashTag) => {
     const filteredNotes = this.props.user.notes.filter(note => {return note.hashTags && note.hashTags.includes(hashTag)});
     this.setState({filteredNotes: filteredNotes, hashTag: hashTag});
  };

  cancelHashTagSearch = () => {
    this.setState({filteredNotes: null, hashTag: null});
  };

  deleteNote = (noteId) => {
      this.props.actions.deleteNote(noteId);
  };

  render() {
    const notes = this.state.filteredNotes || this.props.user.notes;
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

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...UserActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
