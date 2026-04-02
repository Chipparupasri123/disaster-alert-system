/* ===== DEFAULT AVATAR ===== */
const DEFAULT_AVATAR =
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
        <rect width='100%' height='100%' fill='#667eea'/>
        <circle cx='150' cy='110' r='55' fill='#fff'/>
        <rect x='60' y='185' width='180' height='90' rx='45' fill='#fff'/>
    </svg>
`);

/* ===== HELPER: UNIQUE KEY BASED ON EMAIL ===== */
function getUserKey() {
    const email = sessionStorage.getItem("email");
    return email ? email.replace(/[@.]/g, "_") : "guest";
}

/* ===== LOAD PROFILE ===== */
function loadProfile() {
    const email = sessionStorage.getItem("email");
    if (!email) {
        alert("Please login first");
        window.location.href = "/index.html";
        return;
    }

    const userKey = getUserKey();

    const extra =
        JSON.parse(localStorage.getItem(`profileExtra_${userKey}`)) || {};
    const savedImage =
        localStorage.getItem(`profileImage_${userKey}`);

    // from login
    v_name.textContent = sessionStorage.getItem("name");
    v_email.textContent = email;
    v_role.textContent = sessionStorage.getItem("role");

    // from profile (email-based)
    v_phone.textContent = extra.phone || "-";
    v_dob.textContent = extra.dob || "-";
    v_location.textContent = extra.location || "-";
    v_blood.textContent = extra.blood || "-";
    v_skills.textContent = extra.skills || "-";

    const img = savedImage || DEFAULT_AVATAR;
    profilePic.src = img;
    editProfilePic.src = img;
}

window.onload = loadProfile;

/* ===== IMAGE UPLOAD ===== */
profileImageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file || !file.type.startsWith("image/")) {
        alert("Please select an image");
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        const userKey = getUserKey();
        editProfilePic.src = e.target.result;
        localStorage.setItem(`profileImage_${userKey}`, e.target.result);
    };
    reader.readAsDataURL(file);
});

/* ===== OPEN FULL IMAGE ===== */
function openProfileImage() {
    const userKey = getUserKey();
    const img = localStorage.getItem(`profileImage_${userKey}`);

    if (!img) {
        alert("No profile image uploaded");
        return;
    }

    const win = window.open();
    win.document.write(`
        <html>
        <head><title>Profile Image</title></head>
        <body style="margin:0;display:flex;justify-content:center;align-items:center;background:black">
            <img src="${img}" style="max-width:100%;max-height:100%">
        </body>
        </html>
    `);
}

/* ===== OPEN EDIT ===== */
function openEdit() {
    const userKey = getUserKey();
    const extra =
        JSON.parse(localStorage.getItem(`profileExtra_${userKey}`)) || {};

    // from login
    name.value = sessionStorage.getItem("name");
    email.value = sessionStorage.getItem("email");
    role.value = sessionStorage.getItem("role");

    // from profile
    phone.value = extra.phone || "";
    dob.value = extra.dob || "";
    userLocation.value = extra.location || "";
    blood.value = extra.blood || "";
    skills.value = extra.skills || "";

    viewProfile.classList.add("hide");
    editProfile.classList.remove("hide");
}

/* ===== SAVE ===== */
function saveProfile() {
    const userKey = getUserKey();

    localStorage.setItem(
        `profileExtra_${userKey}`,
        JSON.stringify({
            phone: phone.value,
            dob: dob.value,
            location: userLocation.value,
            blood: blood.value,
            skills: skills.value
        })
    );

    alert("Profile successfully updated ✅");

    editProfile.classList.add("hide");
    viewProfile.classList.remove("hide");
    loadProfile();
}

/* ===== CANCEL ===== */
function cancelEdit() {
    editProfile.classList.add("hide");
    viewProfile.classList.remove("hide");
}

/* ===== LOGOUT ===== */
function logout() {
    sessionStorage.clear();   // clears login only
    alert("Logged out successfully");
    window.location.href = "/index.html";
}
