export const ok = (res, data = {}, message = "OK") => {
    res.json({
        success: true,
        message, 
        data
    });
};

export const fail = (res, error = "Error", status = 500) => {
    res.status(status).json({
        success: false,
        message: error
    });
};