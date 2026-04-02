window.onload = loadAlerts;

function broadcastAlert() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const message = document.getElementById("message");

    if (!title || !description || !location) {
        alert("All fields are required!");
        return;
    }

    fetch("http://localhost:8080/api/alerts/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, location })
    })
    .then(res => res.json())
    .then(() => {
        message.textContent = "Alert broadcasted successfully!";
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("location").value = "";
        loadAlerts();
    })
    .catch(() => {
        message.textContent = "Error broadcasting alert";
    });
}

function loadAlerts() {
    fetch("http://localhost:8080/api/alerts")
        .then(res => res.json())
        .then(alerts => {
            const list = document.getElementById("alertsList");
            list.innerHTML = "";

            if (alerts.length === 0) {
                list.innerHTML = "<p>No alerts broadcasted yet.</p>";
                return;
            }

            alerts.reverse().forEach(alert => {
                const time = new Date(alert.createdAt).toLocaleString();

                list.innerHTML += `
                    <div class="alert-card">
                        <h4>${alert.title}</h4>
                        <div class="alert-meta">
                            📍 ${alert.location}<br>
                            🕒 ${time}
                        </div>
                        <p>${alert.description}</p>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Error loading alerts:", err));
}