import { movieApi } from "../../../api/movieApi";
import { getApiError } from "../../../utils/getApiError";

export async function getUsuarios() {
  try {
    const response = await movieApi.get("/admin/users");
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function createUsuario({
  nombre,
  email,
  password,
  rol,
  biografia,
}) {
  try {
    const response = await movieApi.post("/admin/users", {
      nombre,
      email,
      password,
      rol,
      biografia,
    });
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function updateUsuario(usuario) {
  try {
    const response = await movieApi.put(`/admin/users/${usuario.id}`, usuario);
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function deleteUsuario(userId) {
  try {
    const response = await movieApi.delete(`/admin/users/${userId}`);
    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
