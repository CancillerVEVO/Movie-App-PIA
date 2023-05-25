window.addEventListener("DOMContentLoaded", async () => {
  var searchBtn = document.getElementById("searchButton");

  searchBtn.addEventListener("click", function () {
    alert("Si entra")
    var searchValue = document.getElementById("searchInput").value;
    window.location.href = "buscarpelicula.html?name=" + encodeURIComponent(searchValue);
  });
});
