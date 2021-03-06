const fs = require("fs");
const chalk  = require("chalk")

// For user input
var standard_input = process.stdin;
standard_input.setEncoding('utf-8')

const notes = "Notes.json";
// create a way to have sections like completed but for End week, update ...

display = (newNote) =>{
    newNote.forEach((element)=>{
        console.log(chalk.blue.inverse("Title: "), chalk.blue(element.title))
        console.log(chalk.green.inverse("Body:  "), chalk.green(element.body))
        console.log("---------------------------------------------------------")
    })
}

remove = (title) => {
    try{
        var prevNote = JSON.parse(fs.readFileSync(notes));
    }catch(e){
        return console.log("No notes exist")
    }
    var newNote = prevNote.filter(note=> note.title === title)
    if(newNote.length > 1){
        display(newNote)
        console.log("Please enter a list of numbers for which ones you want to remove, ex 1 2 3 or enter all for all")
        standard_input.on('data', function (data) {
            if(data === "all\r\n"){
                console.log("I have complete this part... Should not be too hard");
                process.exit();
            }else{
                data = data.split(" ").map(function(item) {
                    return parseInt(item, 10);
                });

                for(var i = 0; i < data.length; i++){
                    if(isNaN(data[i])){
                        return console.log("Incorrect Input")
                    }
                }
                data.forEach((num)=>{
                    var index = prevNote.indexOf(newNote[num])
                    if (index > -1) {
                        prevNote.splice(index, 1);
                     }
                     
                    })

                fs.writeFile(notes, JSON.stringify(prevNote),()=>{
                    console.log("Notes Removed!")
                    process.exit();

                })
            }
        });
    }else if(newNote.length === 1){
        otherNotes = prevNote.filter(note => note.title !== title)
        fs.writeFile(notes, JSON.stringify(otherNotes), ()=>{
            console.log("Note Removed!")
        })
    }
}

list = ()=>{
    try{
        var allNotes = JSON.parse(fs.readFileSync(notes))
        var newNote = allNotes.filter(note=> note.completed===false)
        display(newNote)
    }catch(e){
        return console.log("no notes exist");
    }
}

read = (title)=>{
    try{
        var prevNote = JSON.parse(fs.readFileSync(notes));
        var note = prevNote.filter(note=> note.title === title);
        display(note)
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
        display(note)
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


