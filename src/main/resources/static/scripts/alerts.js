fetch("http://localhost:8080/api/alerts")
    .then(response => response.json())
    .then(data => {
        const alertsDiv = document.getElementById("alerts");
        alertsDiv.innerHTML = "";

        if (data.length === 0) {
            alertsDiv.innerHTML = "<p>No alerts available</p>";
            return;
        }

        data.forEach(alert => {
            const div = document.createElement("div");
            div.className = "alert-card";
            div.innerHTML = `
                <h3>${alert.title}</h3>
                <p>${alert.description}</p>
                <p><b>Location:</b> ${alert.location}</p>
                <hr>
            `;
            alertsDiv.appendChild(div);
        });
    })
    .catch(error => {
        console.error("Error fetching alerts:", error);
    });