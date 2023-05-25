window.addEventListener("DOMContentLoaded", () => {
    const moviesBtn = document.getElementById("moviesBtn");
    const reviewsBtn = document.getElementById("reviewsBtn");
  
    const currentPage = decodeURIComponent(window.location.pathname);
    const moviesPage = "../peliculas/peliculas.html";
    const reviewsPage = "../reseñas/reseñas.html";
    //console.log(currentPage)
  
    if (currentPage === moviesPage) {
      moviesBtn.classList.add("active");
    } else if (currentPage === reviewsPage) {
      reviewsBtn.classList.add("active");
    }
  
    moviesBtn.addEventListener("click", () => {
      if (currentPage !== moviesPage) {
        window.location.href = moviesPage;
      }
    });
  
    reviewsBtn.addEventListener("click", () => {
      if (currentPage !== reviewsPage) {
        window.location.href = reviewsPage;
      }
    });
  });
    