import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE PELICULAS POPULARES
async function getListaPeliculasPop(){
  try{
    const responseMovies = await movieApi.get(`movies?page=1`);
    return responseMovies.data;
  }catch(error){
    throw getApiError(error);
  }
}

//OBTENCION DE RESEÑAS
async function getListaReseñas(){
  try{
    const responseMovies = await movieApi.get(`review`);
    return responseMovies.data;
  }catch(error){
    throw getApiError(error);
  }
}

export { getListaPeliculasPop, getListaReseñas };