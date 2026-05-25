function manejarErrores(err, req, res, next) {

    res.status(500).json({
        error: "Error interno del servidor"
    });
}

module.exports = manejarErrores;