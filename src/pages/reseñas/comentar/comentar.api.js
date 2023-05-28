import { movieApi } from "../../../api/movieApi";
import { getApiError } from "../../../utils/getApiError";

async function comentarReseña(reviewId, comentarioPadreId, contenido) {
  try {
    const response = await movieApi.post(`/review/${reviewId}/comments`, {
      comentarioPadreId,
      contenido,
    });

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { comentarReseña };
