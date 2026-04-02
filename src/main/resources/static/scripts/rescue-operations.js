/* =====================================================
   RESCUE OPERATIONS - FINAL JS
   ===================================================== */

const role = sessionStorage.getItem("role");

const adminSection = document.getElementById("adminSection");
const responderSection = document.getElementById("responderSection");

const adminTasksList = document.getElementById("tasksList");
const responderTasksList = document.getElementById("responderTasks");

/* ================= ROLE VISIBILITY ================= */
if (adminSection) {
    adminSection.style.display = role === "ADMIN" ? "block" : "none";
}
if (responderSection) {
    responderSection.style.display = role === "RESPONDER" ? "block" : "none";
}



/* ================= ADMIN ASSIGN TASK ================= */
function assignTask() {

    // 🔒 VALIDATION
    if (!zone.value || !responderType.value || !desc.value.trim()) {
        alert("⚠️ Please choose/enter all fields");
        return; // ❌ STOP here, do NOT assign
    }

    fetch("/api/rescue/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            zone: zone.value,
            responderType: responderType.value,
            description: desc.value.trim()
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Assign failed");
        alert("✅ Task Assigned Successfully");

        // 🧹 Clear form
        desc.value = "";
        zone.selectedIndex = 0;
        responderType.selectedIndex = 0;

        loadAllTasks();
    })
    .catch(err => {
        console.error(err);
        alert("❌ Error assigning task");
    });
}




/* ================= ADMIN VIEW ALL ================= */
function loadAllTasks() {
    fetch("/api/rescue/all")
        .then(res => res.json())
        .then(data => showAdminTasks(data));
}

/* ================= RESPONDER VIEW ================= */
function loadAssignedTasks() {
    fetch("/api/rescue/assigned")
        .then(res => res.json())
        .then(data => showResponderTasks(data));
}

/* ================= ADMIN DISPLAY ================= */
function showAdminTasks(data) {
    adminTasksList.innerHTML = "";

    data.forEach(t => {
        adminTasksList.innerHTML += `
        <div class="card">
            <h4>${t.zone} - ${t.responderType}</h4>
            <p>${t.description || "No description"}</p>
            <p>🕒 ${formatDate(t.createdAt)}</p>

            <span class="status ${t.status}">${t.status}</span>

            <!-- STATUS TIMELINE -->
            <div class="timeline">
                <span class="step ${isActive(t.status, 'ASSIGNED')}">Assigned</span>
                <span class="step ${isActive(t.status, 'ACCEPTED')}">Accepted</span>
                <span class="step ${isActive(t.status, 'COMPLETED')}">Completed</span>
            </div>
        </div>`;
    });
}

/* ================= RESPONDER DISPLAY ================= */
function showResponderTasks(data) {
    responderTasksList.innerHTML = "";

    data.forEach(t => {
        responderTasksList.innerHTML += `
        <div class="card">
            <h4>${t.zone} - ${t.responderType}</h4>
            <p>${t.description || "No description"}</p>
            <p>🕒 ${formatDate(t.createdAt)}</p>

            <span class="status ${t.status}">${t.status}</span>

            <!-- STATUS TIMELINE -->
            <div class="timeline">
                <span class="step ${isActive(t.status, 'ASSIGNED')}">Assigned</span>
                <span class="step ${isActive(t.status, 'ACCEPTED')}">Accepted</span>
                <span class="step ${isActive(t.status, 'COMPLETED')}">Completed</span>
            </div>

            ${t.status === "ASSIGNED"
                ? `<button onclick="acceptTask(${t.id})">Accept</button>` 
                : ""}

            ${t.status === "ACCEPTED"
                ? `<button onclick="completeTask(${t.id})">Complete</button>` 
                : ""}
        </div>`;
    });
}

/* ================= RESPONDER ACTIONS ================= */
function acceptTask(id) {
    fetch(`/api/rescue/${id}/accept`, { method: "PUT" })
        .then(res => {
            if (!res.ok) throw new Error("Accept failed");
            alert("✅ Task Accepted");
            loadAssignedTasks();
        })
        .catch(err => {
            console.error(err);
            alert("❌ Error accepting task");
        });
}

function completeTask(id) {
    fetch(`/api/rescue/${id}/complete`, { method: "PUT" })
        .then(res => {
            if (!res.ok) throw new Error("Complete failed");
            alert("✅ Task Completed");
            loadAssignedTasks();
        })
        .catch(err => {
            console.error(err);
            alert("❌ Error completing task");
        });
}

/* ================= HELPERS ================= */
function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString();
}

function isActive(current, step) {
    const order = ["ASSIGNED", "ACCEPTED", "COMPLETED"];
    return order.indexOf(current) >= order.indexOf(step) ? "active" : "";
}

/* ================= AUTO LOAD ================= */
if (role === "ADMIN") loadAllTasks();
if (role === "RESPONDER") loadAssignedTasks();