import { getUsuarios } from "./admin.api";
import DataTable from "datatables.net-dt";
import Swal from "sweetalert2";

const userTable = document.getElementById("usuarios-table");
const editarUsuarioModal = document.getElementById("editarUsuarioModal");
const editarUsuarioForm = document.getElementById("editar-usuario-form");
const crearUsuarioForm = document.getElementById("crear-usuario-form");

document.addEventListener("DOMContentLoaded", async () => {
  let usuarios = await getUsuarios();

  usuarios = usuarios.map((usuario) => {
    return [
      usuario.id,
      usuario.nombre,
      usuario.email,
      usuario.rol,
      usuario.biografia,
      usuario.fecha_creado,
      usuario.fecha_actualizado,
    ];
  });

  const dataTable = new DataTable(userTable, {
    data: usuarios,
    columns: [
      { title: "id" },
      { title: "nombre" },
      { title: "email" },
      { title: "rol" },
      { title: "biografia" },
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

  userTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const id = e.target.parentElement.parentElement.children[0].innerText;

      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "¡Eliminado!",
            `El usuario con id ${id} ha sido eliminado`,
            "success"
          );
        }
      });
    }

    if (e.target.classList.contains("btn-primary")) {
      const id = e.target.parentElement.parentElement.children[0].innerText;

      const usuario = usuarios.find((usuario) => usuario[0] == id);

      const nombre = document.getElementById("editar-nombre");
      const email = document.getElementById("editar-email");
      const rol = document.getElementById("editar-rol");
      const biografia = document.getElementById("editar-biografia");

      nombre.value = usuario[1];
      email.value = usuario[2];
      rol.value = usuario[3];
      biografia.value = usuario[4];

      editarUsuarioModal.dataset.id = id;
      editarUsuarioModal.dataset.nombre = usuario[1];
      editarUsuarioModal.dataset.email = usuario[2];
      editarUsuarioModal.dataset.rol = usuario[3];
      editarUsuarioModal.dataset.biografia = usuario[4];

      $("#editarUsuarioModal").modal("show");
    }
  });
});

editarUsuarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = editarUsuarioModal.dataset.id;
  const nombre = document.getElementById("editar-nombre").value;
  const email = document.getElementById("editar-email").value;
  const password = document.getElementById("editar-password").value;
  const rol = document.getElementById("editar-rol").value;
  const biografia = document.getElementById("editar-biografia").value;

  const usuario = {
    id,
    nombre,
    email,
    password,
    rol,
    biografia,
  };

  console.log(usuario);
});

crearUsuarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("crear-nombre").value;
  const email = document.getElementById("crear-email").value;
  const password = document.getElementById("crear-password").value;
  const rol = document.getElementById("crear-rol").value;
  const biografia = document.getElementById("crear-biografia").value;

  const usuario = {
    nombre,
    email,
    password,
    rol,
    biografia,
  };

  console.log(usuario);
});
