const yargs = require('yargs')

const func = require("./notesFunctions")

yargs.version('1.1.0')

yargs.command({
    command: "add",
    describe: "Add a new note",
    aliases: ["a"],
    builder: {
        title:{
            describe: "Note Tite",
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: "Note Body",
            demandOption:true,
            type: 'string'
        }
        
    },
    handler: function(argv){
        console.log("Adding note");
        func.add(argv);
    }
}).command({
    command: "remove",
    describe: "Remove a note",
    aliases: ["r"],
    builder: {
        title: {
            describe: "Note Title",
            demand: true,
            type: "string"
        }
    },
    handler: function(argv){
        console.log("Removing the note...")
        func.remove(argv.title);
    }
}).command({    
    command: "list",
    describe: "list all notes",
    aliases: ["l"],
    handler: function(){
        func.list();
    }
}).command({
    command: "read",
    aliases: ["r"],
    describe: "Read a note",
    builder:{
        title:{
            describe: "Note title",
            demand: true,
            type: "String"
        }
    },
    handler: function(argv){
        console.log("Finding the note");
        func.read(argv.title)
    }
}).command({
    command: "completed",
    describe: "Show completed Notes",
    aliases: ["c"],
    handler: function(){
        console.log("Finding Notes")
        func.completed()
    }
}).command({
    command: "done",
    describe: "This note is completed",
    aliases: ["d"],
    builder:{
        title: {
            describe: "Note title",
            demand: true,
            type: "String"
        }
    },
    handler: function(argv){
        console.log("Adding the note to the completed list...")
        func.done(argv)
    }
}).argv
