function ImprimirPeliculas({ id, title, posterPath }) {
  return `
    <a href="detalle.html?movieId=${id}&page=1">
        <div class="card movie-card d-flex align-items-center">
            <img id="posterPathMovies" src="${posterPath}" class="card-img-top mt-3"
                alt="Portada de la película" />
            <div class="card-body">
                <h5 class="card-title text-center">${title}</h5>
            </div>
        </div>
    </a>
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
