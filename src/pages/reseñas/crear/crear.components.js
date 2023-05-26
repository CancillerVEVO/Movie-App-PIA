export function ImprimirPelicula({ id, title, posterPath, overview }) {
  return `<div class="card movie-card">
    <div class="row">
      <div class="col-md-5 d-flex justify-content-center">
        <img id="posterPathMovies" src="${posterPath}" class="card-img-top m-3" alt="Portada de la película" />
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <h6>Descripción</h6>
          <p>${overview}</p>
        </div>
      </div>
    </div>
  </div>
        `;
}
