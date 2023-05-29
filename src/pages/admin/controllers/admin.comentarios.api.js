import { movieApi } from "../../../api/movieApi";
import { getApiError } from "../../../utils/getApiError";

export async function getComentarios() {
  try {
    const response = await movieApi.get("/admin/comments");
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw getApiError(error);
  }
}

export async function editarComentario({ id, contenido }) {
  try {
    const response = await movieApi.put(`/admin/comments/${id}`, {
      contenido,
    });
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function eliminarComentario(id) {
  try {
    const response = await movieApi.delete(`/admin/comments/${id}`);
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
