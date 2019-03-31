const fs = require("fs");
const chalk  = require("chalk")

const notes = "Notes.json";
// create a way to have sections like completed but for End week, update ...

remove = (title) => {
    // This remove function might remove all the notes with that name....
    try{
        var prevNote = JSON.parse(fs.readFileSync(notes));
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
        var allNotes = JSON.parse(fs.readFileSync(notes))
        var newNote = allNotes.filter(note=> note.completed===false)
        newNote.forEach((element)=>{
            console.log(chalk.blue.inverse("Title: "), chalk.blue(element.title))
            console.log(chalk.green.inverse("Body:  "), chalk.green(element.body))
            console.log("---------------------------------------------------------")
        })
    }catch(e){
        return console.log("no notes exist");
    }
}

read = (title)=>{
    try{
        var prevNote = JSON.parse(fs.readFileSync(notes));
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
       var prevNote = JSON.parse(fs.readFileSync(notes));
        prevNote.push({
            title: argv.title,
            body: argv.body,
            completed: false
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

completed = () =>{
    try{
        var prevNote = JSON.parse(fs.readFileSync(notes));
        var note = prevNote.filter(note=> note.completed === true);
        if(note.length === 0){throw e}
            note.forEach((element)=>{
                console.log(chalk.blue.inverse("Title: "), chalk.blue(element.title))
                console.log(chalk.green.inverse("Body:  "), chalk.green(element.body))
                console.log("---------------------------------------------------------")
        })
    }catch(e){
        console.log("There are no completed notes")
    }
}

done = (argv) =>{
    try{
        var prevNote = JSON.parse(fs.readFileSync(notes));
        prevNote.forEach((element)=>{
            if(element.title == argv.title){
                element.completed = true
            }
        })
        fs.writeFile(notes, JSON.stringify(prevNote),()=>{
            console.log("Note Added!")
        })
    }catch(e){
        console.log("No such notes exist")
    }
}

module.exports= {
    remove,
    list,
    add,
    read,
    completed,
    done
}


