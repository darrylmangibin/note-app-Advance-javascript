const searchText = document.querySelector('#search-text');
const filterBy = document.querySelector('#filter-by');
const notesDiv = document.querySelector('#notes');
const createBtn = document.querySelector('#create-note');

const notes = getNotes();

render(notes)

createBtn.addEventListener('click', (e) => {
    const id = uuidv4();
    notes.push({
        id,
        title: '',
        body: '',
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf()
    })
    saveNotes();
    location.assign('edit.html#'+id);
});

searchText.addEventListener('input', (e) => {
    render(notes)
})

filterBy.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    sortNotes(notes, sortBy);
    render(notes)
})