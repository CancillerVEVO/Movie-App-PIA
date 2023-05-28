import { getMe } from "../../utils/session";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const me = await getMe();

    if (me.rol == "ADMIN") {
      window.location.href = "pages/admin/index.html";
    }

    if (me.rol == "USER") {
      window.location.href = "pages/peliculas/peliculas.html";
    }
  } catch (error) {
    console.log("no token");
  }
});
