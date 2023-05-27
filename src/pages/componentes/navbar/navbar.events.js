import Cookies from "js-cookie";
//import { getUsuario } from "../../myperfil/me/me.api.js";

// Utiliza fetch para obtener el contenido del archivo del navbar
fetch("../componentes/navbar/navbar.html")
  .then((response) => response.text()) // convierte la respuesta a texto
  .then((data) => {
    // Coloca el contenido del navbar en el contenedor correspondiente
    document.getElementById("nav-reseñas-container").innerHTML = data;
    //Agregar nombre de usuario

    // Agrega un event listener al enlace "Mi perfil"
    document
      .getElementById("mi-perfil")
      .addEventListener("click", function (e) {
        e.preventDefault(); // Evita que el enlace cambie la URL

        window.location.href = "../myperfil/myperfil.html";
      });
    // Agrega un event listener al enlace "Cerrar Sesión"
    document
      .getElementById("cerrar-sesion")
      .addEventListener("click", function (e) {
        e.preventDefault(); // Evita que el enlace cambie la URL

        Cookies.remove("token");
        window.location.href = "/";
      });

    // Agrega un event listener al enlace "Buscar"

    document
      .getElementById("searchButton")
      .addEventListener("click", function (e) {
        e.preventDefault();
        let search = document.getElementById("searchInput").value;

        window.location.href = `/pages/peliculas/buscar.html?page=1&name=${search}`;
      });
  })
  .catch((error) => {
    console.error("Error al cargar el navbar:", error);
  });
