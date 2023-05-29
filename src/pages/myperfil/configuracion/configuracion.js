import { updatePerfil, getMyperfil } from "./configuracion.api";

window.addEventListener("DOMContentLoaded", async () => {
  // obterner datos de perfil.
  const response = await getMyperfil();
  const { user } = response.data;
  console.log(user.nombre);
  //improsion de datos
  const nombreInput = document.getElementById("nombre");
  nombreInput.value = user.nombre;
  const biografiaInput = document.getElementById("biografia");
  biografiaInput.value = user.biografia;

  //obtencion de nuevos datos en formulario
  const editarForm = document.getElementById("editarForm");
  editarForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = nombreInput.value;
    const biografia = biografiaInput.value;
    console.log(nombre, biografia);
    try {
      await updatePerfil(nombre, biografia);
      // Mostrar mensaje de éxito
      alert("Perfil actualizado correctamente");
      // Redirigir a la página de detalle de la reseña
      window.location.href = `myperfil.html`;
    } catch (error) {
      console.error(error);
    }
  });
});
