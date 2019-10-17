const fs = require("fs");
const chalk = require("chalk");

function getNotes() {
  return "Your Notes...";
}

//ADD NOTES
const addNote = function(title, body) {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.bgGreen.bold("Added a new Note"));
  } else {
    console.log(chalk.bgRed.bold("note title exist"));
  }
};

//REMOVE NOTES

const removeNote = function(title) {
  const notes = loadNotes();

  const keepNotes = notes.filter(function(note) {
    return note.title !== title;
  });

  if (notes.length > keepNotes.length) {
    console.log(chalk.bgGreen.bold("removed a new Note"));
    saveNotes(keepNotes);
  } else {
    console.log(chalk.bgRed.bold("Note title does not exist"));
  }
};

const saveNotes = function(notes) {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    console.log(JSON.parse(dataJSON));
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};
