document.addEventListener("DOMContentLoaded", () => {
    loadPending();
    loadAcknowledged();
});

function loadPending() {
    fetch("http://localhost:8080/api/help/pending")
        .then(res => res.json())
        .then(data => {
            const div = document.getElementById("pendingRequests");
            div.innerHTML = "";

            if (data.length === 0) {
                div.innerHTML = "<p>No pending requests</p>";
                return;
            }

            data.forEach(r => {
                div.innerHTML += `
                    <div class="request-card">
                        <h4>🆘 ${r.title}</h4>
                        <p>${r.description}</p>
                        <p class="location">📍 ${r.location}</p>
                        <p>📧 ${r.citizenEmail || "Unknown"}</p>
                        <button onclick="acknowledge(${r.id})">
                            ✔ Acknowledge
                        </button>
                    </div>
                `;
            });
        });
}

function loadAcknowledged() {
    fetch("http://localhost:8080/api/help/acknowledged")
        .then(res => res.json())
        .then(data => {
            const div = document.getElementById("acknowledgedRequests");
            div.innerHTML = "";

            if (data.length === 0) {
                div.innerHTML = "<p>No acknowledged requests</p>";
                return;
            }

            data.forEach(r => {
                div.innerHTML += `
                    <div class="request-card acknowledged">
                        <h4>${r.title}</h4>
                        <p>${r.description}</p>
                        <p class="location">📍 ${r.location}</p>
                        <span class="tick">✔</span>
                    </div>
                `;
            });
        });
}

function acknowledge(id) {
    fetch(`http://localhost:8080/api/help/${id}/acknowledge`, {
        method: "PUT"
    }).then(() => {
        loadPending();
        loadAcknowledged();
    });
}