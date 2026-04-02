// ----------------- TOGGLE SIDEBAR -----------------
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-260px" : "0px";
}

// ----------------- DASHBOARD SUBMENU TOGGLE -----------------
function toggleDashboardMenu() {
    const submenu = document.getElementById("dashboardSubmenu");
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load saved preference
window.onload = () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").checked = true;
    }
};

// ----------------- LOAD DASHBOARD MENU BY ROLE -----------------
document.addEventListener("DOMContentLoaded", () => {

    const role = sessionStorage.getItem("role");
    const submenu = document.getElementById("dashboardSubmenu");

    if (!submenu) return;

    let menuHTML = `
        <a href="/dashboard.html">📍 Overview</a>
    `;

    if (role === "CITIZEN") {
        menuHTML += `
            <a href="/help-request.html">🆘 Request Help</a>
        `;
    }

    if (role === "RESPONDER") {
        menuHTML += `
            <a href="/responder-requests.html">🚑 Help Requests</a>
            <a href="/rescue-operations.html">🚨 Rescue Operations</a>
        `;
    }

    if (role === "ADMIN") {
        menuHTML += `
            <a href="/rescue-operations.html">🚨 Rescue Operations</a>
        `;
    }

    submenu.innerHTML = menuHTML;
});

document.addEventListener("DOMContentLoaded", () => {
    const role = sessionStorage.getItem("role");
    const reportsMenu = document.getElementById("reportsMenu");

    if (reportsMenu && role !== "ADMIN") {
        reportsMenu.style.display = "none";
    }
});


// ----------------- FILTER HANDLING -----------------
// ----------------- FILTER HANDLING (SHOW MESSAGE ONLY WHEN ALL SELECTED) -----------------
document.addEventListener("DOMContentLoaded", () => {
    const typeSelect = document.getElementById("type");
    const severitySelect = document.getElementById("severity");
    const locationSelect = document.getElementById("location");
    const msgBox = document.getElementById("filterMsg");

    let locationMarker;

    const locationCoords = {
        "Telangana": [17.3850, 78.4867],
        "Karnataka": [15.3173, 75.7139],
        "Tamil Nadu": [11.1271, 78.6569]
    };

    function checkFilters() {
    const type = typeSelect.value;
    const severity = severitySelect.value;
    const location = locationSelect.value;

    if (
        type !== "Disaster Type" &&
        severity !== "Severity" &&
        location !== "Location"
    ) {
        const coords = locationCoords[location];
        if (!coords) return;

        // ✅ Move map smoothly
        map.flyTo(coords, 7, { duration: 0.8 });

        // Remove previous marker (if any)
        if (locationMarker) {
            map.removeLayer(locationMarker);
        }

        // Add marker
        locationMarker = L.marker(coords).addTo(map);

        // ✅ MAP POPUP MESSAGE (NON-BLOCKING)
        L.popup({ maxWidth: 320 })
          .setLatLng(coords)
          .setContent(`
           <div style="font-size:18px; line-height:1.6;">
              <div style="font-size:18px; font-weight:bold;">
                 📍 ${location}
              </div>
              ✅ No active ${type} risk<br>
              ⚠ Severity: <b>${severity}</b>
          </div>
          `)
          .openOn(map);

    }
}


    typeSelect.addEventListener("change", checkFilters);
    severitySelect.addEventListener("change", checkFilters);
    locationSelect.addEventListener("change", checkFilters);
});
