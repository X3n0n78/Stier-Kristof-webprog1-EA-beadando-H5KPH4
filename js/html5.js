// js/html5.js

// Web Storage
function saveToStorage() {
    const val = document.getElementById("storageInput").value;
    localStorage.setItem("html5_demo", val);
    document.getElementById("storageMsg").textContent = "Elmentve!";
}
function loadFromStorage() {
    const val = localStorage.getItem("html5_demo") || "";
    document.getElementById("storageMsg").textContent = "Betöltve: " + val;
}

// Web Worker
let worker;
function startWorker() {
    if (window.Worker) {
        if (!worker) {
            worker = new Worker("js/worker.js");
            worker.onmessage = function(e) {
                document.getElementById("workerMsg").textContent = "Összeg: " + e.data;
            };
        }
        worker.postMessage("start");
        document.getElementById("workerMsg").textContent = "Számolás folyamatban...";
    } else {
        document.getElementById("workerMsg").textContent = "A böngésző nem támogatja a Web Worker-t.";
    }
}

// Server-Sent Events (SSE) – csak bemutató, szerver nélkül szimulálva
function startSSE() {
    if (!!window.EventSource) {
        document.getElementById("sseMsg").textContent = "Élő idő: ";
        if (window.sseInterval) clearInterval(window.sseInterval);
        window.sseInterval = setInterval(() => {
            const now = new Date();
            document.getElementById("sseMsg").textContent = "Élő idő: " + now.toLocaleTimeString();
        }, 1000);
    } else {
        document.getElementById("sseMsg").textContent = "A böngésző nem támogatja az SSE-t.";
    }
}

// Geolocation API
function getLocation() {
    const msg = document.getElementById("geoMsg");
    if (!navigator.geolocation) {
        msg.textContent = "A böngésző nem támogatja a geolokációt.";
        return;
    }
    msg.textContent = "Helyzet lekérése...";
    navigator.geolocation.getCurrentPosition(
        pos => {
            msg.textContent = `Szélesség: ${pos.coords.latitude.toFixed(4)}, Hosszúság: ${pos.coords.longitude.toFixed(4)}`;
        },
        err => {
            msg.textContent = "Hiba: " + err.message;
        }
    );
}

// Drag and Drop API
const draggable = document.getElementById("draggable");
const dropzone = document.getElementById("dropzone");
const dragMsg = document.getElementById("dragMsg");

if (draggable && dropzone) {
    draggable.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", "dragged");
    });
    dropzone.addEventListener("dragover", e => {
        e.preventDefault();
        dropzone.classList.add("active");
    });
    dropzone.addEventListener("dragleave", e => {
        dropzone.classList.remove("active");
    });
    dropzone.addEventListener("drop", e => {
        e.preventDefault();
        dropzone.classList.remove("active");
        dragMsg.textContent = "Sikeres dobás!";
    });
}

// Canvas példa
function drawCanvas() {
    const canvas = document.getElementById("myCanvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0055a5";
        ctx.fillRect(10, 10, 100, 60);
        ctx.strokeStyle = "#003d73";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(180, 50, 30, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#e3e9f0";
        ctx.fill();
        ctx.font = "18px Arial";
        ctx.fillStyle = "#003d73";
        ctx.fillText("Canvas szöveg", 60, 90);
    }
}
