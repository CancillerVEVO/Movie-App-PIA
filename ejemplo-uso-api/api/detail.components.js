function Movie({ title, tagline, posterPath }) {
  return `
    <div style="margin:20px"> 
      <h1>${title}</h1>
      <p>${tagline}</p>
      <img src="${posterPath}" alt="${title}" style="width: 200px;"/>
    </div>
    `;
}

function Error(message) {
  return `
    <div> 
      <h4>ERROR</h4>
        <p>${message}</p>
    </div>
    `;
}

export { Movie, Error };
