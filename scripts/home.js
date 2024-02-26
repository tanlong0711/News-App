"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

function displayHome() {
  if (activeUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${activeUser.firstName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

displayHome();

btnLogout.addEventListener("click", function () {
  if (confirm(`Xác nhận Logout!`)) {
    deleteItem("currentUser");
    activeUser = getFromStorage("currentUser", null);
    displayHome();
  }
});
