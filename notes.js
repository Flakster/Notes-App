const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body)=>{
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  debugger

  if (duplicateNote){
    console.log(chalk.red.inverse.bold(' Title is already in use '));
  }
  else {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse.bold(' Note successfully added '));
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = () =>{
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    const notes = JSON.parse(dataJSON);
    return notes
  } catch (e) {
    return []
  }
}

const removeNote = title =>{
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

const listNotes = () => {
  console.log(chalk.blue.inverse.bold(' Your notes '));
  const notes = loadNotes();
  notes.forEach(note => {
    console.log('* ' + note.title);
  });
}

const readNote = (title) => {
  const notes = loadNotes();
  note = notes.find((note) => note.title === title);
  if (note){
    console.log(chalk.inverse(note.title));
    console.log(note.body)
  } else {
    console.log(chalk.red(' No note found! '))
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};