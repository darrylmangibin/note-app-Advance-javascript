const notes = getSaveNotes();

// get the url hash
const pageID = location.hash.substring(1);

// get note by url hash
const note = notes.find((note) => note.id === pageID)
// check note by hash if not return to index.html
note === undefined ? location.assign('index.html') : true;

// define ui variables
const lastEditedEl = document.querySelector('#last-edited');
const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const removeBtn = document.querySelector('#remove-note');

noteTitle.value = note.title;
noteBody.value = note.body;

lastEditedEl.textContent = lastEdited(note.updatedAt)

noteTitle.addEventListener('input', (e) => {
	note.title = noteTitle.value;
	note.updatedAt = moment().valueOf();
	lastEditedEl.textContent = lastEdited(note.updatedAt)
	saveNotes();

})

noteBody.addEventListener('input', (e) => {
	note.body = noteBody.value;
	note.updatedAt = moment().valueOf();
	lastEditedEl.textContent = lastEdited(note.updatedAt)
	saveNotes();
})

removeBtn.addEventListener('click', (e) => {
	removeNotes(note.id);
	saveNotes();
	location.assign('index.html')
})