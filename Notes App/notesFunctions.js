const fs = require("fs");
const chalk  = require("chalk")

const notes = "Notes.json";

remove = (title) => {
    try{
        prevNote = JSON.parse(fs.readFileSync(notes));
    }catch(e){
        return console.log("No notes exist")
    }
    var newNote = prevNote.filter(note=> note.title != title)
    if(newNote.length < prevNote.length){
        fs.writeFileSync(notes, JSON.stringify(newNote))
        console.log("Removed");
    }else{
        console.log("Error, This note title does not exist. Please use list to see the notes");
    }
}

list = ()=>{
    try{
        allNotes = JSON.parse(fs.readFileSync(notes));
        allNotes.forEach((element)=>{
            console.log(chalk.blue.inverse("Title: "), chalk.blue(element.title))
            console.log(chalk.green.inverse("Body:  "), chalk.green(element.body))
            console.log("---------------------------------------------------------")
        })
    }catch(e){
        return console.log("no notes exist");
    }
}

read = (title)=>{
    console.log("Hello");
    try{
        prevNote = JSON.parse(fs.readFileSync(notes));
        var note = prevNote.filter(note=> note.title === title);
        note.forEach((element)=>{
            console.log(chalk.blue.inverse("Title: "), chalk.blue(element.title))
            console.log(chalk.green.inverse("Body:  "), chalk.green(element.body))
            console.log("---------------------------------------------------------")
        })
    }catch(e){
        console.log("There are no existing notes");
    }
}

add = (argv) =>{
    try{
        prevNote = JSON.parse(fs.readFileSync(notes));
        prevNote.push({
            title: argv.title,
            body: argv.body
        });
    }catch(e){
        oldnotes=""
        prevNote =[{
                title:argv.title,
                body: argv.body
            }] 
    }
    fs.writeFile(notes, JSON.stringify(prevNote),()=>{
    console.log("Note Added!")
    })
}

module.exports= {
    remove,
    list,
    add,
    read
}
