// get save note from local storage
const getSaveNotes = () => {
	const notesJSON = localStorage.getItem('notes');
	try {
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch(e) {
		return [];
		console.log(e);
	}
}

// save notes to local storage;
const saveNotes = () => {
	localStorage.setItem('notes', JSON.stringify(notes));
}
// generate empty mesagge if notes is empty
const genEmpty = () => {
	const emptyMessage = document.createElement('p');
	emptyMessage.textContent = 'No notes to show';
	emptyMessage.classList.add('empty-message');
	return emptyMessage;
}
// generate time las edited
const lastEdited = (timeStamp) => {

	return `Last Edited ${moment(timeStamp).fromNow()}`
}

// genrate DOM Elements to render notes
const generateDOM = (note) => {
	const link = document.createElement('a');
	const itemTitle = document.createElement('p');
	const itemSubTitle = document.createElement('p');

	// setup the container
	link.classList.add('list-item');
	link.setAttribute('href', 'edit.html#'+note.id)

	// setup the title
	itemTitle.classList.add('list-item__title');
	if (note.title.length <= 0) {
		itemTitle.textContent = `Unnamed Note`;
	} else {
		itemTitle.textContent = note.title;
	}
	link.appendChild(itemTitle);

	// setup the time
	itemSubTitle.classList.add('list-item__subtitle');
	itemSubTitle.textContent = lastEdited(note.updatedAt)
	link.appendChild(itemSubTitle)
	return link

}

const renderNotes = (notes) => {
	notesElement.innerHTML = '';
	notes = sortNotes(filterBy.value, notes)
	if (notes.length === 0) {
		notesElement.appendChild(genEmpty())
	} else {
		notes.forEach((note) => {
			notesElement.appendChild(generateDOM(note))
		})
	}
}
// remove note by id
const removeNotes = (id) => {
	const x = notes.findIndex((note) => note.id === id);
	if(x > -1) {
		notes.splice(x, 1)
	}
}

// sort note by selected item/value
const sortNotes = (sortBy, notes) => {
	if (sortBy === 'byEdited') {
		return notes.sort((a, b) => {
			if (a.updatedAt > b.updatedAt) {
				return -1
			} else if (a.updatedAt < b.updatedAt) {
				return 1
			} else {
				return 0
			}
		})
	} else if (sortBy === 'byCreated') {
		return notes.sort((a, b) => {
			if(a.createdAt > b.createdAt) {
				return -1
			} else if (a.createdAt < b.createdAt) {
				return 1
			} else {
				return 0
			}
		})
	} else if(sortBy === 'alphabetical') {
		return notes.sort((a, b) => {
			if(a.title.toLowerCase() < b.title.toLowerCase()) {
				return -1
			} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
				return 1
			} else {
				return 0
			}
		})
	} else {
		return notes
	}
}
