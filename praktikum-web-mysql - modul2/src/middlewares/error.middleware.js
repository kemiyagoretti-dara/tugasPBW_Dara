module.exports = {
    errorHandler: (err, req, res, next) => {
        console.error(err); // Menampilkan error di terminal
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
};
