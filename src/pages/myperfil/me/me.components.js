function componentMe() {
  return `
        <div class="card border">
        <div class="card-header">
            Mi Perfil
            <a href="#" class="float-right">
            <i class="bi bi-gear-fill"></i> Configuración de Perfil
            </a>
        </div>
        <div class="card-body">
            <h5 class="card-title">Nombre de Usuario</h5>
            <p class="card-text">Biografía del usuario</p>
        </div>
        </div>
          `;
}
function Error(message) {
  return `
            <h4>ERROR</h4>
              <p>${message}</p>
          `;
}
export { Error, componentMe };
