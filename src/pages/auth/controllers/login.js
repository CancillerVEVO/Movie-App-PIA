document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Evita el envío del formulario por defecto

  const formLogin = document.getElementById("login-form");
  var correo = document.getElementById("email-login").value;
  var password = document.getElementById("password-login").value;

  var emailLogin = document.getElementById("email-login");
  var passwordLogin = document.getElementById("password-login");

  if (correo === "" && password === "") {
    emailLogin.classList.add("is-invalid");
    passwordLogin.classList.add("is-invalid");
    /*alert(
      "No se a introducido ningun dato, favor de introducir los datos correspondientes"
    );*/
  } else if (correo === "") {
    emailLogin.classList.remove("is-invalid");
    passwordLogin.classList.add("is-invalid");
    // alert("NO se a introducido el correo electronico, intente de nuevo!");
  } else if (password === "") {
    emailLogin.classList.remove("is-invalid");
    passwordLogin.classList.add("is-invalid");
    // alert("NO se a introducido la contraseña, intente de nuevo!");
  } else {
    emailLogin.classList.remove("is-invalid");
    passwordLogin.classList.remove("is-invalid");
    /*alert(
      `El correo introducido es: ${correo}\nLa contraseña introducida es: ${password}`
    );*/
    //formLogin.reset(); // Reinicia el formulario
  }
});
