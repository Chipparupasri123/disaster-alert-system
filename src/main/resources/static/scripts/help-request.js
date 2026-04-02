function sendHelp() {
    const disaster = document.getElementById("disaster").value;
    const issue = document.getElementById("issue").value;
    const location = document.getElementById("location").value;

    if (!disaster || !issue || !location) {
        alert("Please fill all fields");
        return;
    }

    fetch("http://localhost:8080/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: disaster,
            description: issue,
            location: location,                         // ✅ real location
            citizenEmail: sessionStorage.getItem("email")
        })
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        alert("Help request sent successfully");
        window.location.href = "/dashboard.html";
    })
    .catch(() => alert("Failed to send request"));
}