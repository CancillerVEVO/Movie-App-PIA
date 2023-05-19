import { getApiError  } from "../../../utils/getApiError";
import { movieApi} from "../../../api/movieApi";

export async function register({
  nombre,
  email,
  password,
  passwordConfirmation,
}) {
  try {
    const response = await movieApi.post("/auth/register", {
      nombre,
      email,
      password,
      passwordConfirmation,
    });

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function login({ email, password }) {
  try {
    const response = await movieApi.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function me() {
  try {
    const response = await movieApi.get("/auth/me");

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

