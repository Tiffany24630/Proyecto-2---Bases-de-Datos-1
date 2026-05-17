const API = "http://localhost:3000";

export const apiFetch = async (
    endpoint,
    options = {}
) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        API + endpoint,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                ...(options.headers || {})
            }
        }
    );

    return response.json();
};