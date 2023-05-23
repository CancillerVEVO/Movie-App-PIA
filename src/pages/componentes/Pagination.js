class Pagination {
  constructor(containerId, totalPages, currentPage) {
    this.container = document.getElementById(containerId);
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.onChangePage = null;
  }

  render() {
    this.container.innerHTML = "";
    const pagination = document.createElement("nav");
    pagination.setAttribute("aria-label", "Page navigation");
    const paginationList = document.createElement("ul");
    paginationList.classList.add("pagination");

    // Botón "Anterior"
    const prevButton = this.createPaginationButton(
      "Anterior",
      this.currentPage > 1
    );
    paginationList.append(prevButton);

    // Página actual
    const currentPageButton = this.createPaginationButton(
      this.currentPage,
      false
    );
    currentPageButton.classList.add("active");
    paginationList.append(currentPageButton);

    // Botón "Siguiente"
    const nextButton = this.createPaginationButton(
      "Siguiente",
      this.currentPage < this.totalPages
    );
    paginationList.append(nextButton);

    pagination.append(paginationList);
    this.container.append(pagination);

    // Manejar el evento de clic en los botones de paginación
    paginationList.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.tagName === "BUTTON") {
        const buttonValue = event.target.textContent;
        let newPage = this.currentPage;

        if (buttonValue === "Anterior") {
          newPage = this.currentPage - 1;
        } else if (buttonValue === "Siguiente") {
          newPage = this.currentPage + 1;
        }

        if (newPage !== this.currentPage && this.onChangePage) {
          this.onChangePage(newPage);
        }
      }
    });
  }

  createPaginationButton(text, enabled) {
    const button = document.createElement("button");
    button.classList.add("page-link");
    button.textContent = text;
    button.disabled = !enabled;
    return button;
  }
}

export { Pagination };
