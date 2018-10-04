const notes = getSaveNotes();

// Define the UI variables
const searchNotes = document.querySelector('#search-text');
const filterBy = document.querySelector('#filter-by');
const notesElement = document.querySelector('#notes');
const createBtn = document.querySelector('#create-note');

// get the time value
const now = moment().valueOf()

renderNotes(notes)

createBtn.addEventListener('click', (e) => {
	const id = uuidv4();
	notes.push({
		id: id,
		title: '',
		body: '',
		createdAt: now,
		updatedAt: now,
	});
	saveNotes();
	location.assign('edit.html#' + id)
})

filterBy.addEventListener('change', (e) => {
	const sortValue = e.target.value
	sortNotes(sortValue, notes);
	saveNotes()
	renderNotes(notes)
})