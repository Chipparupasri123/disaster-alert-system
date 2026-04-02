console.log("admin.js loaded");
function verifyAdmin() {
    console.log("verifyAdmin() called"); // 👈 ADD THIS LINE
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if (!email || !password) {
        msg.textContent = "Enter email and password";
        msg.style.color = "red";
        return;
    }

    fetch(`http://localhost:8080/api/admin/login?email=${email}&password=${password}`, {
        method: "POST"
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.text();
    })
    .then(() => {
        // ADMIN VERIFIED FROM DATABASE
        sessionStorage.setItem("isAdmin", "true");
        window.location.href = "/broadcast.html";
    })
    .catch(() => {
        msg.textContent = "Invalid admin credentials";
        msg.style.color = "red";
    });
}