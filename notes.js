const fs = require('fs')
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note taken'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }

}

const removeNote = (title) => {
    console.log(title)
    const notes = loadNotes()
    const duplicateNotes = notes.filter(note => note.title !== title)

    if (duplicateNotes.length === notes.length){
        console.log(chalk.red.inverse("No note found"))
    } else {
        console.log(chalk.green.inverse("Note Removed!"))
        saveNotes(duplicateNotes)
    }
}

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length === 0) {
        console.log(chalk.blue.inverse("You don't have any notes"))
    } else {
        console.log(chalk.blue("Your Brilliant Notes!"))
        notes.map(note => console.log(note.title))
    }
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(`${chalk.blue(note.title)}: ${chalk.blue.inverse(note.body)}`)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSoN)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}