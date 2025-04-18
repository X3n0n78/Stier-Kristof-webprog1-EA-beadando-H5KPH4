const API_URL = "http://gamf.nhely.hu/ajax2/";

// Code generálása (H5KPH4 + customCode)
function getCode() {
    const neptun = document.getElementById("neptunCode").value;
    const custom = document.getElementById("customCode").value.trim();
    if (!custom) {
        alert("Add meg az egyedi kódot!");
        return null;
    }
    return neptun + custom;
}

// Read művelet
async function readData() {
    const code = getCode();
    if (!code) return;

    try {
        const response = await fetch(`${API_URL}?op=read&code=${code}`);
        const result = await response.json();
        
        // Adatok megjelenítése
        const readResult = document.getElementById("readResult");
        readResult.innerHTML = result.list.map(item => `
            <div>ID: ${item.id} | Név: ${item.name} | Magasság: ${item.height} | Súly: ${item.weight}</div>
        `).join("");

        // Statisztikák
        const heights = result.list.map(item => parseFloat(item.height));
        const sum = heights.reduce((a, b) => a + b, 0).toFixed(2);
        const avg = (sum / heights.length || 0).toFixed(2);
        const max = Math.max(...heights).toFixed(2);
        document.getElementById("stats").innerHTML = `
            Magasság statisztika:<br>
            Összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}
        `;
    } catch (error) {
        alert("Hiba a lekérés során!");
    }
}

// Create művelet
document.getElementById("createForm").onsubmit = async function(e) {
    e.preventDefault();
    const code = getCode();
    if (!code) return;

    const name = document.getElementById("createName").value.trim();
    const height = document.getElementById("createHeight").value.trim();
    const weight = document.getElementById("createWeight").value.trim();
    const msg = document.getElementById("createMsg");

    // Validáció
    if (!name || !height || !weight) {
        msg.textContent = "Minden mező kötelező!";
        return;
    }
    if (name.length > 30) {
        msg.textContent = "A név maximum 30 karakter!";
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`
        });
        const result = await response.text();
        msg.textContent = result.includes("1") ? "Sikeres létrehozás!" : "Hiba!";
        readData();
    } catch (error) {
        msg.textContent = "Hiba a létrehozás során!";
    }
};

// Update művelet
let currentId = null;

async function getDataForId() {
    const code = getCode();
    if (!code) return;
    const id = document.getElementById("updateId").value;
    if (!id) {
        alert("Add meg az ID-t!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}?op=read&code=${code}`);
        const result = await response.json();
        const item = result.list.find(x => x.id == id);
        if (!item) throw new Error();
        
        document.getElementById("updateName").value = item.name;
        document.getElementById("updateHeight").value = item.height;
        document.getElementById("updateWeight").value = item.weight;
        currentId = id;
    } catch (error) {
        alert("Nem található rekord!");
    }
}

document.getElementById("updateForm").onsubmit = async function(e) {
    e.preventDefault();
    const code = getCode();
    if (!code || !currentId) return;

    const name = document.getElementById("updateName").value.trim();
    const height = document.getElementById("updateHeight").value.trim();
    const weight = document.getElementById("updateWeight").value.trim();
    const msg = document.getElementById("updateMsg");

    // Validáció (ugyanaz, mint a Create-nél)
    if (!name || !height || !weight || name.length > 30) {
        msg.textContent = "Érvénytelen adatok!";
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `op=update&id=${currentId}&name=${name}&height=${height}&weight=${weight}&code=${code}`
        });
        const result = await response.text();
        msg.textContent = result.includes("1") ? "Sikeres módosítás!" : "Hiba!";
        readData();
    } catch (error) {
        msg.textContent = "Hiba a módosítás során!";
    }
};

// Delete művelet
async function deleteData() {
    const code = getCode();
    if (!code) return;
    const id = document.getElementById("deleteId").value;
    if (!id) {
        alert("Add meg az ID-t!");
        return;
    }

    if (!confirm("Biztosan törlöd ezt a rekordot?")) return;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `op=delete&id=${id}&code=${code}`
        });
        const result = await response.text();
        document.getElementById("deleteMsg").textContent = 
            result.includes("1") ? "Sikeres törlés!" : "Hiba!";
        readData();
    } catch (error) {
        document.getElementById("deleteMsg").textContent = "Hiba a törlés során!";
    }
}
