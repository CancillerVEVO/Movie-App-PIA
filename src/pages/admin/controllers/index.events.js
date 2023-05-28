import Cookies from "js-cookie";

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
  Cookies.remove("token");
  window.location.href = "/";
});
