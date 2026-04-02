document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msgEl = document.getElementById("msg");

    if (!email || !password) {
        msgEl.innerText = "Please enter email and password";
        return;
    }

    try {
        const res = await fetch(`https://disaster-alert-system-7tx4.onrender.com/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            msgEl.innerText = data;
            return;
        }

        msgEl.innerText = data.message;

        // ✅ SAVE USER SESSION
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("role", data.role);

        setTimeout(() => {
            window.location.href = "/dashboard.html";
        }, 1000);

    } catch (err) {
        console.error(err);
        msgEl.innerText = "Server error";
    }
});