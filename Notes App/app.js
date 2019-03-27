const fs = require('fs')
filename = "Notes.json";

file = fs.readFileSync(filename)
file = JSON.parse(file);

// console.log(file[0])

prevNote = JSON.parse(fs.readFileSync(filename));
newNote = prevNote.push("Hello")
console.log(newNote);

// newNote = prevNote.append({
//     title: "argv.title",
//     body: "argv.body"
// });
