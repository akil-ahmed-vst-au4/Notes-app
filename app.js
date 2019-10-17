// const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

//custom version
yargs.version("1.1.0");

//Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string"
    },
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

//Create Remove Command
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title);
  }
});

//Create List Command
yargs.command({
  command: "list",
  describe: "list a new note",
  handler: function() {
    console.log("listing all notes");
  }
});

//Create Read Command
yargs.command({
  command: "read",
  describe: "read a note",
  handler: function() {
    console.log("reading a note");
  }
});

yargs.parse();
