const { string } = require('yargs');
const yargs = require('yargs');
const notes = require('./notes.js');

console.log(notes.getNotes()); 


// Create add command

yargs.command ({
  command: 'add', 
  describe: 'Adds a note',
  builder:{
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note description',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body)
  }
});

// Create remove command

yargs.command({
  command: 'remove',
  describe: 'Removes a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  }
  handler: function (argv) {
    console.log('Removing a note');
  }
});

// Create the read command

yargs.command({
  command: 'read',
  describe: 'Reads a note',
  handler: function () {
    console.log('Reading a note');
  }
});

// Create the list command

yargs.command({
  command: 'list',
  describe: 'Lists all the notes',
  handler: function () {
    console.log('Listing all the notes');
  }
});

yargs.parse();