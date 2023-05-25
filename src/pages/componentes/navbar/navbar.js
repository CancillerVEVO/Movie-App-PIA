// Utiliza fetch para obtener el contenido del archivo del navbar
fetch("../componentes/navbar/navbar.html")
  .then((response) => response.text()) // convierte la respuesta a texto
  .then((data) => {
    // Coloca el contenido del navbar en el contenedor del navbar
    document.getElementById("nav-reseñas-container").innerHTML = data;
  })
  .catch((error) => {
    console.error("Error al cargar el navbar:", error);
  });
