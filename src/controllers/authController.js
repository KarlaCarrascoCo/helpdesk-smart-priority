function login(req, res) {

    const { usuario, password } = req.body;

    // VALIDAR USUARIO
    if (
        usuario === "karla" &&
        password === "1234"
    ) {

        return res.status(200).json({
            token: "token-seguro-123"
        });
    }

    res.status(401).json({
        error: "Credenciales incorrectas"
    });
}

module.exports = {
    login
};