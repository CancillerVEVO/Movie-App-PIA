import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE RESEÑAS
async function getListaReseñas(){
  try{
    const response = await movieApi.get(`review`);
    return response.data;
  }catch(error){
    throw getApiError(error);
  }
}

export { getListaReseñas };