const { Console } = require('console');
const fs = require('fs');
const chalk = require('chalk');

const getNotes = function(){
  return 'These are my notes...'
}

const addNote = function(title, body){
  const notes = loadNotes()
  const duplicatedNotes = notes.filter(function(note){
    return note.title === title
  })
  if (duplicatedNotes.length === 0){
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse.bold(' Note successfully added '));
  } else {
    console.log(chalk.red.inverse.bold(' Title is already in use '));
  }
}

const saveNotes = function(notes){
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = function(){
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    const notes = JSON.parse(dataJSON);
    return notes
  } catch (e) {
    return []
  }
}

const removeNote = function(title){
  const notes = loadNotes();
  const newNotes = notes.filter(function(note){
    return note.title !== title
  });
  if (notes.length > newNotes.length){
    saveNotes(newNotes);
    console.log(chalk.green.inverse.bold(' Note removed! '));
  } else {
    console.log(chalk.red.inverse.bold(' No note found '));
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};