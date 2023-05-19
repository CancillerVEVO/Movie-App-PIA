import {login} from "./auth.api"
import Cookies from "js-cookie";

const loginForm = document.getElementById("login-form");
const validationErrors = document.querySelector("#validationErrors");


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();//EVITA QUE SE ENVIE EL FORMULARIO
  
  //OBTENCION DE VALORES
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;
  

  try {
    const response = await login({ email, password });

    Cookies.set("token", response.data.token);

    loginForm.reset(); // Reinicia el formulario
    window.location.href = "/";
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = error.data.map((error) => {
        return `<li>${error.msg}</li>`;
      });

      validationErrors.innerHTML = errorMessages.join("");
    } else {
      validationErrors.innerHTML = error.message;
    }
  }
});
