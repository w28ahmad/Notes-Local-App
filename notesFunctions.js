const fs = require("fs");

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
        prevNote = JSON.parse(fs.readFileSync(notes));
        console.log(prevNote);
    }catch(e){
        return console.log("no notes exist");
    }
}

read = (title)=>{
    console.log("Hello");
    try{
        prevNote = JSON.parse(fs.readFileSync(notes));
        var note = prevNote.filter(note=> note.title === title);
        console.log(`Note Found
        Title: ${note[0].title}
        Body: ${note[0].body}`);
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

// module.exports = remove