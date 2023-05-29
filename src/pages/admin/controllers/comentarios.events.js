import DataTable from "datatables.net-dt";
import {
  getComentarios,
  editarComentario,
  eliminarComentario,
} from "./admin.comentarios.api";
import Swal from "sweetalert2";
import { format } from "date-fns";

const editarComentarioModal = document.getElementById(
  "editar-comentario-modal"
);

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getComentarios();

  const comentarios = response.comments.map((comentario) => {
    return [
      comentario.id,
      comentario.usuario_id,
      comentario.critica_id,
      comentario.comentario_padre,
      comentario.contenido,
      format(new Date(comentario.fecha_creado), "dd/MM/yyyy HH:mm"),
      format(new Date(comentario.fecha_actualizado), "dd/MM/yyyy HH:mm"),
    ];
  });

  const comentariosTable = document.getElementById("comentarios-table");

  const dataTable = new DataTable(comentariosTable, {
    data: comentarios,
    columns: [
      { title: "id" },
      { title: "ID de Usuario" },
      { title: "ID de Reseña" },
      { title: "ID Comentario Padre" },
      { title: "Contenido" },
      { title: "Fecha de creación" },
      { title: "Fecha de modificación" },
      {
        title: "Acciones",
        render: function (data, type, row) {
          return `
            <button class="btn btn-primary btn-sm" data-id="${row[0]} ">
                EDITAR
            </button>
            <button class="btn btn-danger btn-sm" data-id="${row[0]}">
                ELIMINAR
            </button>
          `;
        },
      },
    ],

    scrollX: true,
    scrollY: "50vh",

    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
    },
  });

  comentariosTable.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const id = e.target.getAttribute("data-id");

      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, ¡eliminar!",
        cancelButtonText: "No, ¡cancelar!",
      });

      if (result.isConfirmed) {
        try {
          await eliminarComentario(id);
          await Swal.fire(
            "¡Eliminado!",
            "Tu archivo ha sido eliminado.",
            "success"
          );
          window.location.reload();
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
      }
    }

    if (e.target.classList.contains("btn-primary")) {
      const id = e.target.getAttribute("data-id");

      const comentario = comentarios.find((comentario) => comentario[0] == id);

      const contenido = document.getElementById("editar-contenido");

      editarComentarioModal.setAttribute("data-id", id);

      contenido.value = comentario[4];

      $("#editar-comentario-modal").modal("show");
    }
  });
});

const editarComentarioForm = document.getElementById("editar-comentario-form");

editarComentarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = editarComentarioModal.getAttribute("data-id");
  const contenido = document.getElementById("editar-contenido").value;

  try {
    const response = await editarComentario({ id, contenido });

    await Swal.fire({
      title: "¡Comentario editado!",
      text: `El comentario con id ${response.comment.id} ha sido editado.`,
      icon: "success",
    });
    $("#editar-comentario-modal").modal("hide");
    window.location.reload();
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
