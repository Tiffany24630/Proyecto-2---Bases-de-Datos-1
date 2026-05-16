export const manejarError = (res, error) => {
    console.error(error);

    res.status(500).json({
        error: error.message
    });
};