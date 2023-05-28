import {
  añadirFavoritos,
  deleteFavoritos,
} from "../../myperfil/misfavoritos/misfavoritos.api";
//import { Error } from "../../myperfil/misfavoritos/misfavoritos.components";

//botoon de favoritos
function botonFavorito(estadoFavorito) {
  // Obtener referencia al botón de favoritos
  const favoritosBtn = document.getElementById("favoritosBtn");
  // Variable para almacenar el estado actual de favorito (true/false)
  let esFavorito = estadoFavorito;

  // Función para actualizar el estilo del botón según el estado de favorito
  if (esFavorito) {
    favoritosBtn.classList.remove("btn-outline-warning");
    favoritosBtn.classList.add("btn-warning");
    console.log("SI ES FAVORIT:D", esFavorito);
    eliminarFavorito();
  } else {
    favoritosBtn.classList.remove("btn-warning");
    favoritosBtn.classList.add("btn-outline-warning");
    console.log("NO ES FAVORIT D:", esFavorito);
    hacerFavorito();
  }

  // // Función para alternar el estado de favorito
  // function toggleFavorito() {
  //   esFavorito = !esFavorito; // Cambiar el valor a su opuesto
  //   actualizarEstilo();
  //   // Aquí puedes realizar otras acciones según el estado de favorito
  // }

  // // Llamar a la función de actualización inicialmente para establecer el estilo
  // actualizarEstilo();

  // // Agregar el evento de clic al botón de favoritos
  // favoritosBtn.addEventListener("click", toggleFavorito);
}

function hacerFavorito() {
  console.log("ESCUCHANDO PARA HACER FAVORITO");
  favoritosBtn.addEventListener("click", () => {
    const queryParams = new URLSearchParams(window.location.search);
    let reviewId = parseInt(queryParams.get("reviewId")) || 0;
    añadirFavoritos(reviewId);
    alert("Añadido a favoritos");
    //recargar la pagina
    window.location.reload();
  });
}
function eliminarFavorito() {
  console.log("ESCUCHANDO PARA ELIMINAR DE FAVORITO");
  favoritosBtn.addEventListener("click", () => {
    const queryParams = new URLSearchParams(window.location.search);
    let reviewId = parseInt(queryParams.get("reviewId")) || 0;
    deleteFavoritos(reviewId);
    alert("Borrado de favoritos");
    //recargar la pagina
    window.location.reload();
  });
}
export { botonFavorito };
