const API_URL = "http://localhost:3000";

let token = "";

// ======================
// LOGIN
// ======================

document
    .getElementById("btnLogin")
    .addEventListener("click", login);

async function login() {

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    const mensaje =
        document.getElementById("mensajeLogin");

    try {

        const response = await fetch(
            `${API_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    usuario,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            mensaje.innerText =
                data.error;

            mensaje.style.color = "red";

            return;
        }

        token = data.token;

        mensaje.innerHTML = `
            ✅ Bienvenida ${usuario}<br>
            Sesión iniciada correctamente
        `;

        mensaje.style.color = "green";

        // OCULTAR LOGIN

        document.getElementById(
            "usuario"
        ).style.display = "none";

        document.getElementById(
            "password"
        ).style.display = "none";

        document.getElementById(
            "btnLogin"
        ).style.display = "none";

        // BOTON CERRAR SESION

        const botonLogout =
            document.createElement("button");

        botonLogout.innerText =
            "Cerrar Sesión";

        botonLogout.style.marginTop =
            "15px";

        botonLogout.onclick =
            cerrarSesion;

        mensaje.appendChild(
            document.createElement("br")
        );

        mensaje.appendChild(
            botonLogout
        );

    } catch (error) {

        mensaje.innerText =
            "Error de conexión";

        mensaje.style.color = "red";
    }
}

// ======================
// CERRAR SESION
// ======================

function cerrarSesion() {

    token = "";

    document.getElementById(
        "usuario"
    ).style.display = "block";

    document.getElementById(
        "password"
    ).style.display = "block";

    document.getElementById(
        "btnLogin"
    ).style.display = "block";

    document.getElementById(
        "usuario"
    ).value = "";

    document.getElementById(
        "password"
    ).value = "";

    document.getElementById(
        "mensajeLogin"
    ).innerHTML = "";

    alert("Sesión cerrada correctamente");
}

// ======================
// CREAR TICKET
// ======================

document
    .getElementById("ticketForm")
    .addEventListener("submit", crearTicket);

async function crearTicket(event) {

    event.preventDefault();

    if (!token) {

        alert(
            "Debes iniciar sesión primero"
        );

        return;
    }

    const horas =
        parseInt(
            document.getElementById("horas").value
        );

    const minutos =
        parseInt(
            document.getElementById("minutos").value
        );

    // VALIDACIONES

    if (horas < 0 || minutos < 0) {

        alert(
            "El tiempo no puede ser negativo"
        );

        return;
    }

    if (minutos > 59) {

        alert(
            "Los minutos no pueden superar 59"
        );

        return;
    }

    if (horas > 48) {

        alert(
            "Las horas no pueden superar 48"
        );

        return;
    }

    const tiempoEstimado =
        horas + (minutos / 60);

    const ticket = {

        nombreSolicitante:
            document.getElementById(
                "nombreSolicitante"
            ).value,

        correo:
            document.getElementById(
                "correo"
            ).value,

        categoria:
            document.getElementById(
                "categoria"
            ).value,

        descripcion:
            document.getElementById(
                "descripcion"
            ).value,

        impacto:
            document.getElementById(
                "impacto"
            ).value,

        urgencia:
            document.getElementById(
                "urgencia"
            ).value,

        tiempoEstimado
    };

    const response = await fetch(
        `${API_URL}/tickets`,
        {
            method: "POST",

            headers: {

                "Content-Type":
                    "application/json",

                "Authorization":
                    token
            },

            body: JSON.stringify(ticket)
        }
    );

    await response.json();

    alert(
        "✅ Ticket creado correctamente"
    );

    cargarTickets();

    document
        .getElementById("ticketForm")
        .reset();
}

// ======================
// CARGAR TICKETS
// ======================

async function cargarTickets() {

    const response = await fetch(
        `${API_URL}/tickets`
    );

    const tickets = await response.json();

    const lista =
        document.getElementById(
            "listaTickets"
        );

    lista.innerHTML = "";

    tickets.forEach(ticket => {

        const div =
            document.createElement("div");

        let clasePrioridad =
            "prioridad-baja";

        if (
            ticket.prioridad === "Media"
        ) {
            clasePrioridad =
                "prioridad-media";
        }

        if (
            ticket.prioridad === "Alta"
        ) {
            clasePrioridad =
                "prioridad-alta";
        }

        if (
            ticket.prioridad === "Crítica"
        ) {
            clasePrioridad =
                "prioridad-critica";
        }

        const fecha =
            new Date(
                ticket.fechaCreacion
            );

        div.className =
            `ticket ${clasePrioridad}`;

        div.innerHTML = `

            <h3>
                ${ticket.nombreSolicitante}
            </h3>

            <p>
                <strong>Categoría:</strong>
                ${ticket.categoria}
            </p>

            <p>
                <strong>Estado:</strong>
                ${ticket.estado}
            </p>

            <p>
                <strong>Prioridad:</strong>
                ${ticket.prioridad}
            </p>

            <p>
                <strong>Fecha ingreso:</strong>
                ${fecha.toLocaleString()}
            </p>

            <button onclick="resolverTicket(${ticket.id})">
                Resolver
            </button>

            <button onclick="eliminarTicket(${ticket.id})">
                Eliminar
            </button>
        `;

        lista.appendChild(div);
    });
}

// ======================
// RESOLVER TICKET
// ======================

async function resolverTicket(id) {

    if (!token) {

        alert(
            "Debes iniciar sesión"
        );

        return;
    }

    await fetch(
        `${API_URL}/tickets/${id}`,
        {
            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json",

                "Authorization":
                    token
            },

            body: JSON.stringify({
                estado: "resuelto"
            })
        }
    );

    alert(
        "✅ Ticket resuelto correctamente"
    );

    cargarTickets();
}

// ======================
// ELIMINAR TICKET
// ======================

async function eliminarTicket(id) {

    if (!token) {

        alert(
            "Debes iniciar sesión"
        );

        return;
    }

    const confirmar =
        confirm(
            "¿Seguro que deseas eliminar este ticket?"
        );

    if (!confirmar) {
        return;
    }

    await fetch(
        `${API_URL}/tickets/${id}`,
        {
            method: "DELETE",

            headers: {
                "Authorization": token
            }
        }
    );

    alert(
        "🗑️ Ticket eliminado correctamente"
    );

    cargarTickets();
}

// ======================
// INICIAR APP
// ======================

cargarTickets();