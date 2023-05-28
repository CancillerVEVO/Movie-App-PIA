import {
  getReseñas,
  createReseña,
  deleteReseña,
  updateReseña,
} from "./admin.reseñas.api";
import DataTable from "datatables.net-dt";
import Swal from "sweetalert2";

const publicacionesTable = document.getElementById("publicaciones-table");
const editarPublicacionModal = document.getElementById(
  "editar-publicacion-modal"
);
const editarPublicacionForm = document.getElementById(
  "editar-publicacion-form"
);
const crearPublicacionForm = document.getElementById("crear-publicacion-form");
const crearPublicacionModal = document.getElementById(
  "crear-publicacion-modal"
);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await getReseñas();

    const reseñas = response.reviews.map((reseña) => {
      return [
        reseña.id,
        reseña.usuario_id,
        reseña.email,
        reseña.pelicula_id,
        reseña.titulo_critica,
        reseña.contenido,
        reseña.calificacion,
        reseña.fecha_creado,
        reseña.fecha_actualizado,
      ];
    });

    const dataTable = new DataTable(publicacionesTable, {
      data: reseñas,
      columns: [
        { title: "id" },
        { title: "usuario_id" },
        { title: "email" },
        { title: "pelicula_id" },
        { title: "titulo_critica" },
        { title: "contenido", className: "text-wrap" },
        { title: "calificacion" },
        { title: "fecha_creado" },
        { title: "fecha_actualizado" },
        {
          title: "acciones",
          render: function (data, type, row) {
            return '<button class="btn btn-primary">Editar</button> <button class="btn btn-danger">Eliminar</button> <button class="btn btn-success">Ver</button>';
          },
        },
      ],
      scrollX: true,

      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
      },
    });

    publicacionesTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-danger")) {
        const id = e.target.parentElement.parentElement.children[0].innerText;
        Swal.fire({
          title: "¿Estás seguro de eliminar esta publicación?",
          text: "Esta acción no se puede deshacer",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await deleteReseña(id);
              Swal.fire(
                "¡Eliminado!",
                `La publicación con id ${id} ha sido eliminada`,
                "success"
              );
              dataTable
                .row(e.target.parentElement.parentElement)
                .remove()
                .draw();
            } catch (error) {
              console.error(error);
            }
          }
        });
      }

      if (e.target.classList.contains("btn-success")) {
        const id = e.target.parentElement.parentElement.children[0].innerText;

        window.location.href = `/pages/reseñas/detallereseña.html?reviewId=${id}`;
      }

      if (e.target.classList.contains("btn-primary")) {
        const id = e.target.parentElement.parentElement.children[0].innerText;

        const review = response.reviews.find((review) => review.id == id);

        const titulo_critica = document.getElementById("editar-titulo");
        const contenido = document.getElementById("editar-contenido");
        const calificacion = document.getElementById("editar-calificacion");

        editarPublicacionModal.dataset.id = id;
        titulo_critica.value = review.titulo_critica;
        contenido.value = review.contenido;
        calificacion.value = review.calificacion;

        $("#editar-publicacion-modal").modal("show");
      }
    });
  } catch (error) {
    console.error(error);
  }
});

crearPublicacionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario_id = crearPublicacionForm["crear-usuario-id"].value;
  const titulo_critica = crearPublicacionForm["crear-titulo"].value;
  const contenido = crearPublicacionForm["crear-contenido"].value;
  const calificacion = crearPublicacionForm["crear-calificacion"].value;
  const pelicula = crearPublicacionForm["crear-pelicula-id"].value;

  try {
    await createReseña({
      usuario_id,
      titulo_critica,
      contenido,
      calificacion,
      pelicula,
    });
    Swal.fire(
      "¡Creado!",
      "La publicación ha sido creada exitosamente",
      "success"
    ).then(() => {
      $("#crear-publicacion-form").trigger("reset");

      window.location.reload();
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = error.data.map((error) => {
        return `<li>${error.msg}</li>`;
      });
      Swal.fire({
        title: "Validation Error",
        html: `<ul>${errorMessages.join("")}</ul>`,
        icon: "error",
      });
    } else {
      Swal.fire("Error", error.message, "error");
    }
  }
});

editarPublicacionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = editarPublicacionModal.dataset.id;
  const titulo_critica = editarPublicacionForm["editar-titulo"].value;
  const contenido = editarPublicacionForm["editar-contenido"].value;
  const calificacion = editarPublicacionForm["editar-calificacion"].value;

  try {
    const response = await updateReseña({
      id,
      titulo_critica,
      contenido,
      calificacion,
    });

    Swal.fire(
      "¡Actualizado!",
      `La publicación con id ${response.review.id} ha sido actualizada`,
      "success"
    ).then(() => {
      $("#editar-publicacion-modal").modal("hide");
      window.location.reload();
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = error.data.map((error) => {
        return `<li>${error.msg}</li>`;
      });
      Swal.fire({
        title: "Validation Error",
        html: `<ul>${errorMessages.join("")}</ul>`,
        icon: "error",
      });
    } else {
      Swal.fire("Error", error.message, "error");
    }
  }
});
