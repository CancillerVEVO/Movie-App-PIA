import { getListaPeliculasPop } from "./listapeliculas.api";

function renderPaginationComponent(currentPage, totalPages, containerId) {
  var container = document.getElementById(containerId);

  var render = function () {
    var paginationHTML = "";

    if (totalPages > 1) {
      paginationHTML +=
        '<li class="page-item ' +
        (currentPage === 1 ? "disabled" : "") +
        '"><a class="page-link" href="#" data-page="prev">Anterior</a></li>';

      var startPage = Math.max(1, currentPage - 1);
      var endPage = Math.min(startPage + 2, totalPages);

      for (var i = startPage; i <= endPage; i++) {
        paginationHTML +=
          '<li class="page-item ' +
          (currentPage === i ? "active" : "") +
          '"><a class="page-link" href="#" data-page="' +
          i +
          '">' +
          i +
          "</a></li>";
      }

      paginationHTML +=
        '<li class="page-item ' +
        (currentPage === totalPages ? "disabled" : "") +
        '"><a class="page-link" href="#" data-page="next">Siguiente</a></li>';
    }

    container.innerHTML = '<ul class="pagination">' + paginationHTML + "</ul>";

    attachEvents();
  };

  var attachEvents = function () {
    container.querySelectorAll(".page-link").forEach(function (link) {
      link.addEventListener("click", async function (event) {
        event.preventDefault();
        var page = this.getAttribute("data-page");

        if (page === "prev" && currentPage > 1) {
          currentPage--;
        } else if (page === "next" && currentPage < totalPages) {
          currentPage++;
        } else {
          page = parseInt(page);
          if (!isNaN(page) && page !== currentPage) {
            currentPage = page;
          } else {
            return;
          }
        }

        render();

        try {
          const data = await getListaPeliculasPop(currentPage);
          // Realizar acciones con los datos obtenidos, como mostrarlos en la página
          console.log(data);
        } catch (error) {
          // Manejar el error de la llamada a la API
          console.error(error);
        }
      });
    });
  };

  render();
}

export { renderPaginationComponent };
