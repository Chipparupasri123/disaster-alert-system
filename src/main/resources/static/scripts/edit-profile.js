window.onload = () => {
  // Pre-fill form fields with current values
  document.getElementById("editName").value = sessionStorage.getItem("name") || "";
  document.getElementById("editEmail").value = sessionStorage.getItem("email") || "";
  document.getElementById("editPhone").value = sessionStorage.getItem("phone") || "";
  document.getElementById("editRole").value = sessionStorage.getItem("role") || "";
  document.getElementById("editDob").value = sessionStorage.getItem("dob") || "";
  document.getElementById("editLocation").value = sessionStorage.getItem("location") || "";
  document.getElementById("editBloodGroup").value = sessionStorage.getItem("bloodGroup") || "";
  document.getElementById("editSkills").value = sessionStorage.getItem("skills") || "";
  document.getElementById("editBio").value = sessionStorage.getItem("bio") || "";
};

function saveProfile(event) {
  event.preventDefault();

  // Save updated values to sessionStorage
  sessionStorage.setItem("name", document.getElementById("editName").value);
  sessionStorage.setItem("email", document.getElementById("editEmail").value);
  sessionStorage.setItem("phone", document.getElementById("editPhone").value);
  sessionStorage.setItem("role", document.getElementById("editRole").value);
  sessionStorage.setItem("dob", document.getElementById("editDob").value);
  sessionStorage.setItem("location", document.getElementById("editLocation").value);
  sessionStorage.setItem("bloodGroup", document.getElementById("editBloodGroup").value);
  sessionStorage.setItem("skills", document.getElementById("editSkills").value);
  sessionStorage.setItem("bio", document.getElementById("editBio").value);

  // Show success message and redirect
  alert("Profile updated successfully!");
  window.location.href = "/profile.html";
}
