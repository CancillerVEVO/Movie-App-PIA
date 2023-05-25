function colorearEstrellas(containerId, cantidad) {
    var container = document.getElementById(containerId);
    container.innerHTML = '';
  
    for (var i = 0; i < cantidad; i++) {
      var estrella = document.createElement('i');
      estrella.classList.add('fas', 'fa-star', 'text-warning','m-1');
      estrella.setAttribute('aria-hidden', 'true');
      container.appendChild(estrella);
    }
  
    for (var j = cantidad; j < 10; j++) {
      var estrellaVacia = document.createElement('i');
      estrellaVacia.classList.add('far', 'fa-star', 'text-warning', 'm-1');
      estrellaVacia.setAttribute('aria-hidden', 'true');
      container.appendChild(estrellaVacia);
    }
  }
  export { colorearEstrellas };