const yargs = require('yargs')

const func = require("./notesFunctions")

yargs.version('1.1.0')
yargs.command({
 command: 'add',
 describe: 'Add a new note',
 handler: function () {
 console.log('Adding a new note!')
 }
})

yargs.command({
    command: "add",
    describe: "Add a new note",
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
    handler: function(){
        func.list();
    }
}).command({
    command: "read",
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
}).argv
