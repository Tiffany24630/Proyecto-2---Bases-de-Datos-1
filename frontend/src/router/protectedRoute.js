export const protectedRoute = (roles = []) => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token) {
        alert("Debe iniciar sesión para acceder a esta página");
        return false;
    }

    if (roles.length && !roles.includes(rol)){
        alert("Sin permisos")
        return false;
    }

    return true;
};