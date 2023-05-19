$(document).ready(function() {
    //AGREGAR
    $('#btnAgregar').click(function() {
      var id = $('#tablaRegistros tr').length + 1;
      var usuario = 'Nuevo Usuario';
      var email = 'nuevo@example.com';
      var fila = '<tr>' +
        '<td><input type="checkbox" class="registroCheckbox"></td>' +
        '<td>' + id + '</td>' +
        '<td>' + usuario + '</td>' +
        '<td>' + email + '</td>' +
        '</tr>';
      $('#tablaRegistros').append(fila);
    });

    //BORRAR
    $('#btnBorrar').click(function() {
      $('#tablaRegistros .registroCheckbox:checked').closest('tr').remove();
    });

    //EDITAR
    $('#btnEditar').click(function() {
      var seleccionados = $('#tablaRegistros .registroCheckbox:checked');
      if (seleccionados.length === 1) {
        var fila = seleccionados.closest('tr');
        var id = fila.find('td:nth-child(2)').text();
        var usuario = fila.find('td:nth-child(3)').text();
        var email = fila.find('td:nth-child(4)').text();
        var nuevoUsuario = prompt('Editar Usuario', usuario);
        var nuevoEmail = prompt('Editar Email', email);
        if (nuevoUsuario && nuevoEmail) {
          fila.find('td:nth-child(3)').text(nuevoUsuario);
          fila.find('td:nth-child(4)').text(nuevoEmail);
        }
      } else {
        alert('Por favor, selecciona un registro para editar.');
      }
    });
  });