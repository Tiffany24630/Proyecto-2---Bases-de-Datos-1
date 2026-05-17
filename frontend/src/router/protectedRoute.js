export const protectedRoute = (roles = []) => {
  const token =
    localStorage.getItem("token");

  const rol =
    localStorage.getItem("rol");

  if (!token) {
    alert(
      "Debe iniciar sesión"
    );
    window.location.hash = "#/login";
    return false;
  }

  if (
    roles.length > 0 &&
    !roles.includes(rol)
  ) {
    alert(
      "No tiene permisos"
    );
    return false;
  }
  return true;
};