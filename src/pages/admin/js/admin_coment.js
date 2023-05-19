$(document).ready(function() {
    //BOTON ELIMINAR
    $('.btnEliminar').click(function() {
      var fila = $(this).closest('tr');
      var confirmacion = confirm('¿Estás seguro de que deseas eliminar este registro?');

      if (confirmacion) {
        fila.remove();
      }
    });

    //BOTON VER
    $('.btnVer').click(function() {
      var fila = $(this).closest('tr');
      var usuario = fila.find('td:nth-child(1)').text();
      var publicacion = fila.find('td:nth-child(2)').text();
      var idComentario = fila.find('td:nth-child(3)').text();

      //MOSTRAR MODARL
      $('#modalVerRegistroBody').html('<p><strong>Usuario:</strong> ' + usuario + '</p>' +
        '<p><strong>Publicación:</strong> ' + publicacion + '</p>' +
        '<p><strong>ID Comentario:</strong> ' + idComentario + '</p>');

      $('#modalVerRegistro').modal('show');
    });
  });