const API = "http://localhost:3000";

export const apiFetch = async (
    endpoint,
    options = {}
) => {
    const token =
        localStorage.getItem("token");

    const response = await fetch(
        API + endpoint,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",

                ...(token && {
                    Authorization:
                        `Bearer ${token}`
                }),

                ...(options.headers || {})
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error(data);

        if (response.status === 401) {
            alert("Debe iniciar sesión");
        }

        if (response.status === 403) {
            alert("No tiene permisos");
        }
    }
    return data;
};