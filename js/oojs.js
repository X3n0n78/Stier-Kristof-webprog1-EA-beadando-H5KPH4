// Alap Jegyzet osztály
// Ez az osztály egy egyszerű jegyzetet reprezentál, amelynek van címe, szövege és létrehozási ideje
class Note {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.created = new Date();
    }

    render() {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <h3>${this.title}</h3>
            <p>${this.text}</p>
            <small>${this.created.toLocaleString()}</small>
        `;
        return card;
    }
}

// Színes jegyzet, örökléssel (extends, super)
// Ez az osztály a Note osztályból származik, és egy színt is tárol
class ColoredNote extends Note {
    constructor(title, text, color) {
        super(title, text);
        this.color = color;
    }

    render() {
        const card = super.render();
        card.style.background = this.color;
        return card;
    }
}

// Jegyzetkezelő osztály
// Ez az osztály kezeli a jegyzetek listáját és azok megjelenítését
class NoteApp {
    constructor(container) {
        this.notes = [];
        this.container = container;
    }

    addNote(title, text) {
        // Minden 3. jegyzet színes lesz (példa az öröklésre)
        // A színes jegyzetekhez a ColoredNote osztályt használtam
        let note;
        if ((this.notes.length + 1) % 3 === 0) {
            note = new ColoredNote(title, text, "#ffe0b2");
        } else {
            note = new Note(title, text);
        }
        this.notes.push(note);
        this.render();
    }

    removeNote(idx) {
        this.notes.splice(idx, 1);
        this.render();
    }

    render() {
        this.container.innerHTML = "";
        this.notes.forEach((note, idx) => {
            const card = note.render();
            const delBtn = document.createElement("button");
            delBtn.textContent = "Törlés";
            delBtn.onclick = () => this.removeNote(idx);
            card.appendChild(delBtn);
            this.container.appendChild(card);
        });
    }
}

// App inicializálása
// Az app inicializálásához szükséges DOM elemek kiválasztása és az eseménykezelők beállítása
const notesContainer = document.getElementById("notesContainer");
const app = new NoteApp(notesContainer);

document.getElementById("noteForm").onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById("noteTitle").value.trim();
    const text = document.getElementById("noteText").value.trim();
    if (title && text) {
        app.addNote(title, text);
        this.reset();
    }
};
