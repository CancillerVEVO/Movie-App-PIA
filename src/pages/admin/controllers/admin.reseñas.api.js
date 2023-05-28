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

export async function getComentarios() {
  try {
    const response = await movieApi.get("/admin/comments");
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
