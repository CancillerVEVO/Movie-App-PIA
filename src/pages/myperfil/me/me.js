import { getMyperfil } from "./me.api";
import { Error, componentMe } from "./me.components";

window.addEventListener("DOMContentLoaded", async () => {
  const errorContainer = document.getElementById("error-de-extraccion-perfil");
  const perfilContainer = document.getElementById("perfil-container");

  try {
    const response = await getMyperfil();
    const { user } = response.data;
    console.log(user);

    const perfil = document.createElement("div");
    perfil.classList.add("col-md-5", "my-3");
    perfil.innerHTML = componentMe(user);
    perfilContainer.append(perfil);
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});
