let myChart = null;

// Táblázat sor kiválasztása
document.querySelectorAll("#dataTable tbody tr").forEach(tr => {
    tr.onclick = () => {
        // Régi kijelölés törlése
        document.querySelectorAll("#dataTable tr").forEach(row => {
            row.classList.remove("selected");
        });
        tr.classList.add("selected");
        
        // Adatok kinyerése
        const data = Array.from(tr.children).map(td => parseInt(td.textContent));
        updateChart(data);
    };
});

// Diagram frissítése
function updateChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // Régi diagram törlése
    if (myChart) myChart.destroy();

    // Új diagram létrehozása
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Év 1', 'Év 2', 'Év 3', 'Év 4', 'Év 5'],
            datasets: [{
                label: 'Értékek',
                data: data,
                borderColor: '#0055a5',
                backgroundColor: '#0055a533',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Éves értékek diagramja'
                }
            }
        }
    });
}

// Diagram törlése
function clearChart() {
    if (myChart) {
        myChart.destroy();
        myChart = null;
        document.querySelectorAll("#dataTable tr").forEach(row => {
            row.classList.remove("selected");
        });
    }
}
