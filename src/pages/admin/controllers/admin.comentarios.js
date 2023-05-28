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
