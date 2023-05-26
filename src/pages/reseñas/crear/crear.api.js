import { movieApi } from "../../../api/movieApi";
import { getApiError } from "../../../utils/getApiError";

export async function traerDetallePelicula(id) {
  try {
    const response = await movieApi.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function crearReseña(id, { titulo, contenido, calificacion }) {
  try {
    const response = await movieApi.post(`/review`, {
      peliculaId: id,
      titulo,
      contenido,
      calificacion,
    });

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
