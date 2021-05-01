const { Console } = require('console');
const fs = require('fs');

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
    console.log('Note successfully added');
  } else {
    console.log("Title is already in use");
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
  const note = findNote(title)
  if (note) {
    console.log('Note has been deleted')
  } else {
    console.log('Note title does not exist')
  }
}



module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};