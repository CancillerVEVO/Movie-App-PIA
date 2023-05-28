import {
  getUsuarios,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from "./admin.usuarios.api";
import DataTable from "datatables.net-dt";
import Swal from "sweetalert2";

const userTable = document.getElementById("usuarios-table");
const editarUsuarioModal = document.getElementById("editarUsuarioModal");
const editarUsuarioForm = document.getElementById("editar-usuario-form");
const crearUsuarioForm = document.getElementById("crear-usuario-form");
const editarPassword = document.getElementById("editar-password");
const passwordSwitch = document.getElementById("password-switch");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getUsuarios();

  const usuarios = response.users.map((usuario) => {
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
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            await deleteUsuario(id);
            Swal.fire("¡Eliminado!", "El usuario ha sido eliminado", "success");
            dataTable.row(e.target.parentElement.parentElement).remove().draw();
          }
        } catch (error) {
          Swal.fire("Error", error.message, "error");
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
  let usuario;
  const id = editarUsuarioModal.dataset.id;
  const nombre = document.getElementById("editar-nombre").value;
  const email = document.getElementById("editar-email").value;
  const password = document.getElementById("editar-password").value;
  const rol = document.getElementById("editar-rol").value;
  const biografia = document.getElementById("editar-biografia").value;

  if (!passwordSwitch.checked) {
    usuario = {
      id,
      nombre,
      email,
      rol,
      biografia,
    };
  } else {
    usuario = {
      id,
      nombre,
      email,
      password,
      rol,
      biografia,
    };
  }

  try {
    const response = await updateUsuario(usuario);
    $("#editarUsuarioModal").modal("hide");
    Swal.fire(
      "¡Actualizado!",
      `El usuario ${response.user.id} ha sido actualizado`,
      "success"
    ).then(() => {
      editarPassword.value = "";
      window.location.reload();
    });
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
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

  try {
    const response = await createUsuario(usuario);
    $("#crearUsuarioModal").modal("hide");
    Swal.fire(
      "¡Creado!",
      `El usuario ${response.user.id} ha sido creado`,
      "success"
    ).then(() => {
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

passwordSwitch.addEventListener("change", (e) => {
  if (passwordSwitch.checked) {
    editarPassword.disabled = false;
  } else {
    editarPassword.disabled = true;
  }
});
