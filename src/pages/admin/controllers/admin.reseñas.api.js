import { movieApi } from "../../../api/movieApi";
import { getApiError } from "../../../utils/getApiError";

export async function getReseñas() {
  try {
    const response = await movieApi.get("/admin/reviews");
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function createReseña({
  usuario_id,
  pelicula,
  titulo_critica,
  contenido,
  calificacion,
}) {
  try {
    const response = await movieApi.post("/admin/reviews", {
      usuario_id: Number(usuario_id),
      pelicula: Number(pelicula),
      titulo_critica,
      contenido,
      calificacion: Number(calificacion),
    });
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function updateReseña({
  id,
  titulo_critica,
  contenido,
  calificacion,
}) {
  try {
    const response = await movieApi.put(`/admin/reviews/${id}`, {
      titulo_critica,
      contenido,
      calificacion: Number(calificacion),
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function deleteReseña(id) {
  try {
    const response = await movieApi.delete(`/admin/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
