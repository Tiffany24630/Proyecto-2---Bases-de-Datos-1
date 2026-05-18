export const protectedRoute = (
    roles = []
) => {
    const token =
        localStorage.getItem("token");

    const rol =
        localStorage.getItem("rol");

    if (!token) {
        window.location.hash =
            "#/login";

        return false;
    }

    if (
        roles.length > 0 &&
        !roles.includes(rol)
    ) {
        alert("No autorizado");

        window.location.hash =
            "#/dashboard";

        return false;
    }
    return true;
};