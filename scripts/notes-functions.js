const getNotes = () => {
    const json = localStorage.getItem('note');
    try {
        return json !== null ? JSON.parse(json) : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

const genMessage = () => {
    const message = document.createElement('p');
    message.classList.add('empty-message');
    message.textContent = 'No notes to show';
    return message;
}

const genTime = (ts) => {
    return `Last edited ${moment(ts).fromNow()}`
}

const genNotes = (todo) => {
    const link = document.createElement('a');
    link.classList.add('list-item');
    link.setAttribute('href', `edit.html#${todo.id}`);

    const title = document.createElement('p');
    title.classList.add('list-item__title');
    title.textContent = todo.title.length === 0 ? 'Unnamed note' : todo.title;
    link.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.classList.add('list-item__subtitle');
    subtitle.textContent = genTime(todo.updatedAt);
    link.appendChild(subtitle)

    notesDiv.appendChild(link)
}

const saveNotes = () => {
    localStorage.setItem('note', JSON.stringify(notes))
}

const removeNote = (id) => {
    const x = notes.findIndex((note) => id === note.id);
    if(x > -1) {
        notes.splice(x, 1);
    }
}

const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            return a.updatedAt > b.updatedAt ? -1 : 1;
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : 1;
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;            
        })
    }
}

const render = (notes) => {
    const filterNotes = notes.filter((note) => {
        if(note.title.toLowerCase().indexOf(searchText.value.toLowerCase()) > - 1) {
            return note
        }
    });

    notesDiv.innerHTML = '';

    if(filterNotes.length <= 0) {
        notesDiv.appendChild(genMessage())
    } else {
        filterNotes.forEach((note) => {
            genNotes(note)
        })
    }
}

