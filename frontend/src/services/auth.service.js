import { apiFetch } from "./api.js";

export const loginService = async (
    username,
    password
) => {
    return await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
    });
};