import {DELETE_STICKER, FETCH_STICKERS, ADD_STICKER} from '../constants/User';
import axios from 'axios';
import fetch from "cross-fetch";
import React from "react";

export function fetchNotes(findByHashTag) {
    return(dispatch) => {
        fetch('https://apeps.kiev.ua/api/getMessages')
            .then(res => res.json())
            .then(response => {
                const notes = response.map(note => {return findHashTags(note, findByHashTag)});
                dispatch({
                    type: FETCH_STICKERS,
                    notes: notes
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: FETCH_STICKERS,
                    notes: []
                });
            })
    }
}

export function addNote(note, findByHashTag) {
    return(dispatch, getState) => {
        let notes = getState().user.notes;
        axios({
            method: 'post',
            url: 'https://apeps.kiev.ua/api/addMessage',
            data: new URLSearchParams(note)
        })
            .then(response => {
                if (response.data) {
                    note.messageID = response.data;
                    note = findHashTags(note, findByHashTag);
                    notes.push(note);
                    dispatch({
                        type: ADD_STICKER,
                        notes: notes
                    });
                }
            })
            .catch(function(error) {
                console.log(error);
                dispatch({
                    type: ADD_STICKER,
                    notes: notes
                });
            });
    }
}

export function deleteNote(noteId) {
    return(dispatch, getState) => {
        let notes = getState().user.notes;
        axios({
            method: 'post',
            url: 'https://apeps.kiev.ua/api/deleteMessage',
            data: new URLSearchParams({ messageID: noteId })
        });
        for (let i = 0; i < notes.length; i++){
            if (notes[i].messageID === noteId) {
                notes.splice(i, 1);
            }
        }
        dispatch({
            type: DELETE_STICKER,
            notes: notes
        })
    }
}

function findHashTags(note, findByHashTag){
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
    note.text = formatMentionText(note.text, note.hashTags, /(#[A-Za-z0-9]+(?:|$))/g, findByHashTag);
    return note;
}

function formatMentionText(text, values, regex, findByHashTag){
    if (!values.length)
        return text;
    console.log(text.split(regex));
    return (<span>
            {text.split(regex)
                .reduce((prev, current, i) => {
                    if (!i)
                        return [current];

                    return prev.concat(
                        values.includes(current)  ?
                            <a onClick={findByHashTag.bind(this, current)}>
                                {current}
                            </a>
                            : current
                    );
                }, [])}
        </span>);
}
