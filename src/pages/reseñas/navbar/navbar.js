// Utiliza fetch para obtener el contenido del archivo del footer
fetch('navbar/navbar.html')
.then(response => response.text()) // convierte la respuesta a texto
.then(data => {
  // Coloca el contenido del footer en el contenedor del footer
  document.getElementById('nav-reseñas-container').innerHTML = data;
})
.catch(error => {
  console.error('Error al cargar el footer:', error);
});