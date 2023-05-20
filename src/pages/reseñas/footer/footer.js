// Utiliza fetch para obtener el contenido del archivo del footer
fetch('footer/footer.html')
.then(response => response.text()) // convierte la respuesta a texto
.then(data => {
  // Coloca el contenido del footer en el contenedor del footer
  document.getElementById('footer-container').innerHTML = data;
})
.catch(error => {
  console.error('Error al cargar el footer:', error);
});