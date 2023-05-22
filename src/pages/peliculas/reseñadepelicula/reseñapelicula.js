import { getListaPeliculasPop, getListaReseñas } from "./reseñapelicula.api";
import { Error, ImprimirPeliculas,ImprimirReseñas } from "./reseñapelicula.components";
import { colorearEstrellas } from "./stars";

const errorContainerPelicula = document.getElementById("error-de-extraccion-peliculas");
const moviesCards = document.getElementById("movies-Cards");

async function mostrarPeliculasPop() {
  try{
    const resp = await getListaPeliculasPop();
    const infoPeliculas = resp;
    infoPeliculas.results.forEach((result) => {
      //console.log("Resultado:", result);

      //IMPRIMIR RESULTADOS
      
      const listMovies = document.createElement("div");
      listMovies.classList.add("col-md-8");
      listMovies.innerHTML = ImprimirPeliculas(result);
      moviesCards.append(listMovies);
      
    });


  }catch (error){
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainerPelicula.append(errorHTML);
  }
}

const errorContainerReseña = document.getElementById("error-de-extraccion-reseñas");
const reseñasCards = document.getElementById("reviews-Cards");

async function mostrarReseñas() {
  try{
    const resp = await getListaReseñas();
    const infoReseñas = resp.data;
    console.log(infoReseñas)

    infoReseñas.reviews.forEach((review) => {
      console.log("xd:", review);

      //IMPRIMIR RESULTADOS
      const listReseñas = document.createElement("div");
      listReseñas.classList.add('col-md-8', 'border', 'border-secondary','m-4');
      listReseñas.innerHTML = ImprimirReseñas(review);
      reseñasCards.append(listReseñas);
      
      // Obtener el valor del atributo "value" y aplicar la función colorearEstrellas
      const estrellasContainerId = `estrellas-reseña-${review.id}`; // Generar un ID único para cada contenedor de estrellas
      const cantidadEstrellas = parseInt(review.calificacion);
      colorearEstrellas(estrellasContainerId, cantidadEstrellas);
    });


  }catch (error){
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainerReseña.append(errorHTML);
  }
}
mostrarReseñas();
mostrarPeliculasPop();