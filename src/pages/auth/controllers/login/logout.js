import Cookies from "js-cookie";

function cerrarSesion() {
  Cookies.remove("token");
  // Redireccionar al usuario a la página de inicio de sesión u otra página adecuada después de cerrar la sesión
  window.location.href = "/";
}
// Utiliza fetch para obtener el contenido del archivo del navbar
fetch('../componentes/navbar/navbar.html')
  .then(response => response.text()) // convierte la respuesta a texto
  .then(data => {
    // Coloca el contenido del navbar en el contenedor correspondiente
    document.getElementById('nav-reseñas-container').innerHTML = data;

    // Agrega un event listener al enlace "Cerrar Sesión"
    document.getElementById('cerrar-sesion').addEventListener('click', function(event) {
      event.preventDefault(); // Evita que el enlace cambie la URL

      // Ejecuta la función cerrarSesion()
      cerrarSesion();
    });
  })
  .catch(error => {
    console.error('Error al cargar el navbar:', error);
  });
