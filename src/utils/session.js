import Cookies from "js-cookie";
import { movieApi } from "../api/movieApi";
import { getApiError } from "./getApiError";

export async function getMe() {
  try {
    const response = await movieApi.get("/auth/me");
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function isAdmin() {
  try {
    const me = await getMe();
    if (me.rol == "ADMIN") {
      window.location.href = "pages/admin/index.html";
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}
