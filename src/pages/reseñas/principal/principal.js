function selectOption() {
  const moviesBtn = document.getElementById("moviesBtn");
  const reviewsBtn = document.getElementById("reviewsBtn");
  const moviesSection = document.getElementById("moviesSection");
  const reviewsSection = document.getElementById("reviewsSection");

  moviesBtn.classList.add("active-btn");//Activar por defecto "Peliculas"

  moviesBtn.addEventListener("click",  ()=> {
    moviesBtn.classList.add("active-btn");
    reviewsBtn.classList.remove("active-btn");
    moviesSection.style.display = "block";
    reviewsSection.style.display = "none";
  });

  reviewsBtn.addEventListener("click", ()=> {
    reviewsBtn.classList.add("active-btn");
    moviesBtn.classList.remove("active-btn");
    moviesSection.style.display = "none";
    reviewsSection.style.display = "block";
  });
}

function marcarEstrellas() {
  // Valor de estrellas
  var valorEstrellas = 9;

  // Seleccionar la estrella correspondiente
  var estrellaSeleccionada = document.querySelector(
    'input[name="estrellas"][value="' + valorEstrellas + '"]'
  );
  if (estrellaSeleccionada) {
    estrellaSeleccionada.checked = true;
  }
}

//FUNCIONES XD
selectOption(); //Para dar funcionamiento al selector entre PELICULAS Y RESEÑAS.

marcarEstrellas(); //Para mostrar cuantas estrellas se han seleccionado
