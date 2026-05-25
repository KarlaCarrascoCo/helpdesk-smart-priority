function verificarToken(req, res, next) {

    const token = req.headers.authorization;

    if (token !== "token-seguro-123") {

        return res.status(401).json({
            error: "Acceso no autorizado"
        });
    }

    next();
}

module.exports = verificarToken;