const ls = document.querySelector('#last-edited');
const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');

const notes = getNotes();

const pageId = location.hash.substring(1)

const note = notes.find((note) => {
    if(note.id === pageId) {
        return note
    }
})

ls.textContent = genTime(note.updatedAt)

noteTitle.value = note.title;
noteBody.value = note.body;

noteTitle.addEventListener('input', (e) => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf()
    ls.textContent = genTime(note.updatedAt)

    saveNotes();
})

noteBody.addEventListener('input', (e) => {
    note.body = e.target.value;
    note.updatedAt = moment().valueOf()
    ls.textContent = genTime(note.updatedAt)

    saveNotes();
})

document.querySelector('#remove-note').addEventListener('click', (e) => {
    removeNote(note.id);
    saveNotes();
    location.assign('index.html');
})