export const validatorEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validarNumero = (valor) => {
    return !isNaN(valor);
};