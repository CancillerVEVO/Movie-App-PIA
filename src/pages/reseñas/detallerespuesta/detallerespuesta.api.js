import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE COMENTARIOS Y RESPUESTAS
async function getComentResp(commentId) {
  try {
    const responseComents = await movieApi.get(`review/comments/${commentId}`);
    return responseComents.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getComentResp };
