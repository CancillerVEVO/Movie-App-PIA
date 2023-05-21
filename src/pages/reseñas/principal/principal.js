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

//FUNCIONES XD
selectOption(); //Para dar funcionamiento al selector entre PELICULAS Y RESEÑAS.