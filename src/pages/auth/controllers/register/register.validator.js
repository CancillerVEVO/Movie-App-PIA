document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Evita el envío del formulario por defecto

  const formRegister = document.getElementById("register-form");
  var user = document.getElementById("user-register").value;
  var correo = document.getElementById("email-register").value;
  var passFirst = document.getElementById("password-first").value;
  var passConfirm = document.getElementById("password-confirm").value;

  var userRegister = document.getElementById("user-register");
  var emailRegister = document.getElementById("email-register");
  var passRegisterFirst = document.getElementById("password-first");
  var passRegisterConfirm = document.getElementById("password-confirm");

  if (user === "" && correo === "" && passFirst === "" && passConfirm === "") {
    userRegister.classList.add("is-invalid");
    emailRegister.classList.add("is-invalid");
    passRegisterFirst.classList.add("is-invalid");
    passRegisterConfirm.classList.add("is-invalid");
   

  } else if(user === ""){
    userRegister.classList.add("is-invalid");
    

  }else if (correo === "") {
    userRegister.classList.remove("is-invalid");
    emailRegister.classList.add("is-invalid");
    
  } else if (passFirst === "") {
    emailRegister.classList.remove("is-invalid");
    passRegisterFirst.classList.add("is-invalid");
    
  }  else if (passConfirm === "") {
    passRegisterFirst.classList.remove("is-invalid");
    passRegisterConfirm.classList.add("is-invalid");
    
  }else if (passFirst !== passConfirm) {
    passRegisterFirst.classList.add("is-invalid");
    passRegisterConfirm.classList.add("is-invalid");
    
  }else {
    userRegister.classList.remove("is-invalid");
    emailRegister.classList.remove("is-invalid");
    passRegisterFirst.classList.remove("is-invalid");
    passRegisterConfirm.classList.remove("is-invalid");
    
  }
});
