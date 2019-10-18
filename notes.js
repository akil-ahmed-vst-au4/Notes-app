const fs = require("fs");
const chalk = require("chalk");

//ADD NOTES
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);
  if (!duplicateNote) {
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

const removeNote = title => {
  const notes = loadNotes();

  const keepNotes = notes.filter(note => note.title !== title);

  if (notes.length > keepNotes.length) {
    console.log(chalk.bgGreen.bold("removed a new Note"));
    saveNotes(keepNotes);
  } else {
    console.log(chalk.bgRed.bold("Note title does not exist"));
  }
};

//LIST ALL THE NOTES

const listNotes = () => {
  console.log(chalk.bgBlue("Your Notes"));
  const notes = loadNotes();
  notes.forEach(note => {
    console.log(note.title);
  });
};

//READ THE NOTES

const readNotes = title => {
  const notes = loadNotes();
  const findNote = notes.find(note => note.title === title);
  if (findNote) {
    console.log(chalk.inverse(findNote.title));
    console.log(findNote.body);
  } else {
    console.log(chalk.red("No Note Found"));
  }
};

const saveNotes = notes => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
};
