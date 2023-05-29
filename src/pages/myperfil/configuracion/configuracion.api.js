import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE MI PERFIL
async function getMyperfil() {
  try {
    const response = await movieApi.get(`profile`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
//Edicion de perfil
async function updatePerfil(nombre, biografia) {
  try {
    const response = await movieApi.put(`profile`, {
      nombre,
      biografia,
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { updatePerfil, getMyperfil };
