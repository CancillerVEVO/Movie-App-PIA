import { movieApi } from "../../../api/movieApi";
import { getApiError } from "../../../utils/getApiError";

async function comentarReseña(reviewId, comentarioPadreId, contenido) {
  try {
    await movieApi.post(`review/${reviewId}/comments`, {
      comentarioPadreId,
      contenido,
    });
  } catch (error) {
    throw getApiError(error);
  }
}

export { comentarReseña };
