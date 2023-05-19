$(document).ready(function() {
    //BOTON AGREGAR
    $('#btnAgregar').click(function() {
      var id = $('#tablaRegistros tr').length + 1;
      var titulo = 'Nuevo Título';
      var usuario = 'Nuevo Usuario';
      var pelicula = 'Nueva Película';
      var fila = '<tr>' +
        '<td><input type="checkbox" class="registroCheckbox"></td>' +
        '<td>' + id + '</td>' +
        '<td>' + titulo + '</td>' +
        '<td>' + usuario + '</td>' +
        '<td>' + pelicula + '</td>' +
        '</tr>';
      $('#tablaRegistros').append(fila);
    });

    //BOTON BORRAR
    $('#btnBorrar').click(function() {
      $('#tablaRegistros .registroCheckbox:checked').closest('tr').remove();
    });

    //BOTON EDITAR
    $('#btnEditar').click(function() {
      var seleccionados = $('#tablaRegistros .registroCheckbox:checked');
      if (seleccionados.length === 1) {
        var fila = seleccionados.closest('tr');
        var id = fila.find('td:nth-child(2)').text();
        var titulo = fila.find('td:nth-child(3)').text();
        var usuario = fila.find('td:nth-child(4)').text();
        var pelicula = fila.find('td:nth-child(5)').text();

        var nuevoTitulo = prompt('Modificar título', titulo);
        var nuevoUsuario = prompt('Modificar usuario', usuario);
        var nuevaPelicula = prompt('Modificar película', pelicula);

        if (nuevoTitulo !== null && nuevoUsuario !== null && nuevaPelicula !== null) {
          fila.find('td:nth-child(3)').text(nuevoTitulo);
          fila.find('td:nth-child(4)').text(nuevoUsuario);
          fila.find('td:nth-child(5)').text(nuevaPelicula);
        }
      } else {
        alert('Por favor, selecciona un solo registro para editar.');
      }
    });
  });