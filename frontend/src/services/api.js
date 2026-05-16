const API = "http://localhost:3000/api";

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
                ...API(options.headers || {})
            }
        }
    );
    return response.json();
};