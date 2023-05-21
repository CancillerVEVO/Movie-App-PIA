import { getListaReseñas } from "./listareseñas.api";
import { Error, ImprimirReseñas } from "./listareseña.components";
import { colorearEstrellas } from "./stars";

const errorContainer = document.getElementById("error-de-extraccion-reseñas");
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
      listReseñas.classList.add('col-md-11', 'border', 'border-secondary','m-4');
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
    errorContainer.append(errorHTML);
  }
}
mostrarReseñas();