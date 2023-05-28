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

    console.log(reseñas);

    const dataTable = new DataTable(publicacionesTable, {
      data: reseñas,
      columns: [
        { title: "id" },
        { title: "usuario_id" },
        { title: "email" },
        { title: "pelicula_id" },
        { title: "titulo_critica" },
        { title: "contenido" },
        { title: "calificacion" },
        { title: "fecha_creado" },
        { title: "fecha_actualizado" },
        {
          title: "acciones",
          render: function (data, type, row) {
            return '<button class="btn btn-primary">Editar</button> <button class="btn btn-danger">Eliminar</button>';
          },
        },
      ],
      scrollX: true,
    });
  } catch (error) {
    console.error(error);
  }
});
