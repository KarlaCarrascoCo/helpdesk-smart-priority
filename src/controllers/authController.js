exports.login = (req, res) => {

    const { usuario, password } = req.body;

    const usuarios = [

        {
            usuario: "karla",
            password: "1234",
            token: "token-karla"
        },

        {
            usuario: "admin",
            password: "admin123",
            token: "token-admin"
        }
    ];

    const usuarioEncontrado = usuarios.find(

        u =>

            u.usuario === usuario &&

            u.password === password
    );

    if (!usuarioEncontrado) {

        return res.status(401).json({

            error: "Credenciales incorrectas"
        });
    }

    res.json({

        mensaje: "Login exitoso",

        token: usuarioEncontrado.token,

        usuario: usuarioEncontrado.usuario
    });
};