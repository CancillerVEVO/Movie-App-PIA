if (document.cookie.includes("token")) {
  window.location.href = "./pages/peliculas/peliculas.html";
} else {
  console.log("No hay token");
}
