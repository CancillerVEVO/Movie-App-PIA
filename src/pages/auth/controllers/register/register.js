import { register } from "../auth.api"

const registerForm = document.getElementById("register-form");
const validationErrors = document.querySelector("#validationErrors");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();//EVITA QUE SE ENVIE EL FORMULARIO
  
    //OBTENCION DE VALORES
    const nombre = document.getElementById("user-register").value;
    const email = document.getElementById("email-register").value;
    const password = document.getElementById("password-first").value;
    const passwordConfirmation = document.getElementById("password-confirm").value;

    try {
        const response = await register({ nombre, email, password, passwordConfirmation });


    registerForm.reset(); // Reinicia el formulario
    window.location.href = "/pages/auth/login.html";
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

