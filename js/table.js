// Példa adatok (4x4-es táblázat)
let data = [
    { name: "Anna", age: 22, city: "Budapest", hobby: "Olvasás" },
    { name: "Béla", age: 35, city: "Szeged", hobby: "Futás" },
    { name: "Csilla", age: 28, city: "Debrecen", hobby: "Zene" },
    { name: "Dániel", age: 40, city: "Pécs", hobby: "Horgászat" }
];

let sortCol = null;
let sortDir = 1; // 1: növekvő, -1: csökkenő

// Táblázat kirajzolása
function renderTable(filter = "") {
    const tbody = document.querySelector("#crudTable tbody");
    tbody.innerHTML = "";

    let filtered = data.filter(row =>
        Object.values(row).some(val =>
            val.toString().toLowerCase().includes(filter.toLowerCase())
        )
    );

    filtered.forEach((row, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.city}</td>
            <td>${row.hobby}</td>
            <td>
                <button onclick="editRow(${idx})">Szerkeszt</button>
                <button onclick="deleteRow(${idx})">Töröl</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Rendezés
function sortTable(col) {
    if (sortCol === col) {
        sortDir *= -1;
    } else {
        sortCol = col;
        sortDir = 1;
    }
    data.sort((a, b) => {
        if (a[col] < b[col]) return -1 * sortDir;
        if (a[col] > b[col]) return 1 * sortDir;
        return 0;
    });
    renderTable(document.getElementById("searchInput").value);
}

// Új sor hozzáadása
document.getElementById("addForm").onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const city = document.getElementById("city").value.trim();
    const hobby = document.getElementById("hobby").value.trim();
    const msg = document.getElementById("formMsg");

    // Validáció
    if (name.length < 2 || name.length > 20) {
        msg.textContent = "A név 2-20 karakter lehet!";
        return;
    }
    if (isNaN(age) || age < 1 || age > 120) {
        msg.textContent = "A kor 1-120 között lehet!";
        return;
    }
    if (city.length < 2 || city.length > 20) {
        msg.textContent = "A város 2-20 karakter lehet!";
        return;
    }
    if (hobby.length < 2 || hobby.length > 20) {
        msg.textContent = "A hobbi 2-20 karakter lehet!";
        return;
    }
    msg.textContent = "";

    data.push({ name, age, city, hobby });
    renderTable(document.getElementById("searchInput").value);
    this.reset();
};

// Szerkesztés
window.editRow = function(idx) {
    const row = data[idx];
    const tr = document.querySelectorAll("#crudTable tbody tr")[idx];
    tr.classList.add("editing");
    tr.innerHTML = `
        <td><input type="text" id="editName" value="${row.name}"></td>
        <td><input type="number" id="editAge" value="${row.age}"></td>
        <td><input type="text" id="editCity" value="${row.city}"></td>
        <td><input type="text" id="editHobby" value="${row.hobby}"></td>
        <td>
            <button onclick="saveRow(${idx})">Mentés</button>
            <button onclick="renderTable(document.getElementById('searchInput').value)">Mégse</button>
        </td>
    `;
};

window.saveRow = function(idx) {
    const name = document.getElementById("editName").value.trim();
    const age = parseInt(document.getElementById("editAge").value);
    const city = document.getElementById("editCity").value.trim();
    const hobby = document.getElementById("editHobby").value.trim();

    if (name.length < 2 || name.length > 20 ||
        isNaN(age) || age < 1 || age > 120 ||
        city.length < 2 || city.length > 20 ||
        hobby.length < 2 || hobby.length > 20) {
        alert("Hibás adat! Ellenőrizd a mezőket!");
        return;
    }
    data[idx] = { name, age, city, hobby };
    renderTable(document.getElementById("searchInput").value);
};

// Törlés
window.deleteRow = function(idx) {
    if (confirm("Biztosan törlöd ezt a sort?")) {
        data.splice(idx, 1);
        renderTable(document.getElementById("searchInput").value);
    }
};

// Rendezés kattintásra
document.querySelectorAll("#crudTable th[data-col]").forEach(th => {
    th.onclick = () => sortTable(th.dataset.col);
});

// Szűrés/keresés
document.getElementById("searchInput").oninput = function() {
    renderTable(this.value);
};

// Inicializálás
renderTable();