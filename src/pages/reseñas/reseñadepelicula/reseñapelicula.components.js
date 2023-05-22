function ImprimirPeliculas({ id, title, posterPath }) {
  return `<h2>PELICULA</h2>
    <div class="card movie-card">
    <div class="row">
        <div class="col-md-5 d-flex justify-content-center">
            <img id="posterPathMovies" src="${posterPath}" class="card-img-top m-3" alt="Portada de la película" />
        </div>
        <div class="col-md-7">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6>Descripción</h6>
                <p>Descripción de cada película xd</p>
            </div>
        </div>
    </div>
</div>

      `;
}

function Error(message) {
  return `
        <h4>ERROR</h4>
          <p>${message}</p>
      `;
}

function GenreListItem(name) {
  return `
      <p>
          ${name}
      </p>
    `;
}

export { Error, GenreListItem, ImprimirPeliculas };
