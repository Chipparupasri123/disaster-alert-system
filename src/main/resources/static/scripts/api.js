// api.js
const API_BASE = "https://disaster-alert-system-7tx4.onrender.com";

// Initialize map (India)
const map = L.map('map').setView([20.5937, 78.9629], 5);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Default marker (India center)
let marker = L.marker([20.5937, 78.9629]).addTo(map);

// ----------------- LOCATION SEARCH -----------------
async function searchLocation() {
    const query = document.getElementById("locationInput").value.trim();
    const suggestions = document.getElementById("suggestions");

    if (query.length < 3) {
        suggestions.innerHTML = "";
        return;
    }

    try {
        const response = await fetch(
            `/api/location/search?query=${query}`
        );
        const text = await response.text();
        const data = JSON.parse(text);
        suggestions.innerHTML = "";

        data.slice(0, 5).forEach(place => {
            const li = document.createElement("li");
            li.textContent = place.display_name;

            li.onclick = () => {
                const lat = parseFloat(place.lat);
                const lon = parseFloat(place.lon);

                // Move map to location
                map.setView([lat, lon], 10);

                // Update main marker
                marker.setLatLng([lat, lon]);

                // Update input and hide suggestions
                document.getElementById("locationInput").value = place.display_name;
                suggestions.innerHTML = "";

                // Show alerts
                showAlerts(place.display_name, lat, lon);
                showEarthquakeAlerts(lat, lon, place.display_name);

                // Add custom marker for searched location
                const searchMarkerIcon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="
                        background: blue;
                        width:16px;
                        height:16px;
                        border-radius:50%;
                    "></div>`
                });

                L.marker([lat, lon], { icon: searchMarkerIcon })
                  .addTo(map)
                  .bindPopup(`<b>📍 ${place.display_name}</b><br>🕒 Updated: ${new Date().toLocaleTimeString()}`)
                  .openPopup();
            };

            suggestions.appendChild(li);
        });
    } catch (err) {
        console.error("Location search failed:", err);
    }
}
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left =
        sidebar.style.left === "0px" ? "-260px" : "0px";
}




// ----------------- REAL WEATHER ALERTS -----------------
async function showAlerts(location, lat, lon) {
    const alertsList = document.getElementById("alertsList");
    alertsList.innerHTML = "<p>Fetching real disaster alerts...</p>";

    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=rain`;
        const response = await fetch(weatherUrl);
        const data = await response.json();

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const rain = data.hourly?.rain?.[0] || 0;

        alertsList.innerHTML = "";
        let alerts = [];

        if (rain > 30) alerts.push({ type: "Flood Warning", severity: "high", icon: "🌊" });
        if (wind > 45) alerts.push({ type: "Cyclone Alert", severity: "high", icon: "🌪" });
        if (temp > 40) alerts.push({ type: "Heatwave Alert", severity: "moderate", icon: "🔥" });
        if (alerts.length === 0) alerts.push({ type: "No Disaster Risk", severity: "low", icon: "🌤" });

        // Display alerts & map markers
        alerts.forEach(alert => {
            const div = document.createElement("div");
            div.className = `alert-card ${alert.severity}`;
            div.innerHTML = `
                <h4>${alert.icon} ${alert.type}</h4>
                <p>📍 ${location}</p>
                <p>🌡 Temp: ${temp}°C</p>
                <p>🌧 Rain: ${rain} mm</p>
                <p>💨 Wind: ${wind} km/h</p>
            `;
            alertsList.appendChild(div);

            const color = alert.severity === "high" ? "red" : alert.severity === "moderate" ? "orange" : "green";
            const alertMarkerIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    background:${color};
                    width:16px;
                    height:16px;
                    border-radius:50%;
                "></div>`
            });

            L.marker([lat, lon], { icon: alertMarkerIcon })
              .addTo(map)
              .bindPopup(`<b>${alert.type}</b><br>📍 ${location}<br>🌡 Temp: ${temp}°C`);
        });

        showSafetyTips(alerts);
    } catch (err) {
        alertsList.innerHTML = "<p style='color:red'>Failed to fetch weather data.</p>";
        console.error(err);
    }
}

// ----------------- EARTHQUAKE ALERTS -----------------
async function showEarthquakeAlerts(lat, lon, location) {
    try {
        const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
        const data = await response.json();
        let earthquakes = data.features;

        earthquakes = earthquakes.map(eq => {
            const eqLat = eq.geometry.coordinates[1];
            const eqLon = eq.geometry.coordinates[0];
            const magnitude = eq.properties.mag;
            const distanceKm = getDistanceFromLatLonInKm(lat, lon, eqLat, eqLon);
            return { eqLat, eqLon, magnitude, distanceKm };
        }).filter(eq => eq.distanceKm <= 200);

        earthquakes.sort((a, b) => b.magnitude - a.magnitude);
        earthquakes = earthquakes.slice(0, 5);

        earthquakes.forEach(eq => {
            let color = "yellow";
            if (eq.magnitude >= 5) color = "black";
            else if (eq.magnitude >= 3) color = "orange";

            const eqMarkerIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    background:${color};
                    width:14px;
                    height:14px;
                    border-radius:50%;
                    border: 2px solid white;
                "></div>`
            });

            L.marker([eq.eqLat, eq.eqLon], { icon: eqMarkerIcon })
              .addTo(map)
              .bindPopup(`⚡<b>Earthquake Alert</b><br>Magnitude: ${eq.magnitude.toFixed(1)}<br>Distance: ${eq.distanceKm.toFixed(1)} km<br>Location: ${location}`);
        });

        if (earthquakes.length === 0) console.log("No recent earthquakes nearby.");
    } catch (err) {
        console.error("Earthquake fetch failed:", err);
    }
}

// ----------------- UTILITY FUNCTIONS -----------------
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function deg2rad(deg) { return deg * (Math.PI/180); }

function showSafetyTips(alerts) {
    const tipsList = document.getElementById("tipsList");
    tipsList.innerHTML = "";

    alerts.forEach(alert => {
        let tip = "";
        if (alert.type.includes("Flood")) tip = "Avoid low-lying areas and stay away from rivers or drains.";
        else if (alert.type.includes("Cyclone")) tip = "Stay indoors, secure loose objects, and keep emergency supplies ready.";
        else if (alert.type.includes("Heatwave")) tip = "Stay hydrated, avoid direct sun exposure, and rest in cool areas.";

        if (tip) {
            const li = document.createElement("li");
            li.textContent = tip;
            tipsList.appendChild(li);
        }
    });

    if (tipsList.children.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No immediate risks. Stay aware and monitor alerts regularly.";
        tipsList.appendChild(li);
    }
}

// ----------------- CLEAR BUTTON LOGIC -----------------
const input = document.getElementById("locationInput");
const clearBtn = document.getElementById("clearBtn");

input.addEventListener("input", () => {
    clearBtn.style.display = input.value ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    document.getElementById("suggestions").innerHTML = "";
    map.setView([20.5937, 78.9629], 5); // reset map to India center
});
// ----------------- LOAD BROADCASTED ALERTS ON DASHBOARD -----------------
// ----------------- LOAD BROADCASTED ALERTS (DB) -----------------
function loadBroadcastedAlerts() {
    fetch("/api/alerts")
        .then(res => res.json())
        .then(alerts => {
            const alertsList = document.getElementById("alertsList");
            alertsList.innerHTML = "";

            if (alerts.length === 0) {
                alertsList.innerHTML = "<p>No live alerts available.</p>";
                return;
            }

            alerts.reverse().forEach(alert => {
                const time = new Date(alert.createdAt).toLocaleString();

                alertsList.innerHTML += `
                    <div class="alert-card">
                        <h4>🚨 ${alert.title}</h4>
                        <p class="alert-desc">${alert.description}</p>
                        <div class="alert-location">📍 ${alert.location}</div>
                        <div class="alert-time">🕒 ${time}</div>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error("Failed to load alerts:", err);
        });
}

window.addEventListener("load", () => {
    loadBroadcastedAlerts();
});

function openAlerts() {
    window.location.href = "/admin-login.html";
}
