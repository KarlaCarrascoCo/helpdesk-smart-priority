const API_URL = "http://localhost:3000";

const loginForm = document.getElementById("loginForm");

const ticketForm = document.getElementById("ticketForm");

const loginContainer = document.getElementById("loginContainer");

const ticketsContainer = document.getElementById("ticketsContainer");


// ============================
// LOGIN
// ============================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(

            `${API_URL}/login`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    usuario,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(
                data.error ||
                "Error login"
            );

            return;
        }


        // GUARDAR TOKEN

        localStorage.setItem(

            "token",

            data.token
        );


        // MOSTRAR LOGIN EXITOSO

        loginContainer.innerHTML = `

            <h2>Inicio de Sesión</h2>

            <p style="
                color: green;
                font-weight: bold;
            ">

                ✅ Bienvenida ${data.usuario}

                <br>

                Sesión iniciada correctamente

            </p>

            <button onclick="cerrarSesion()">

                Cerrar Sesión

            </button>
        `;


        // MOSTRAR SISTEMA

        ticketForm.style.display = "flex";

        ticketsContainer.style.display = "flex";


        cargarTickets();

    } catch (error) {

        console.error(error);

        alert("Error servidor");
    }
});


// ============================
// LOGOUT
// ============================

function cerrarSesion() {

    localStorage.removeItem("token");

    alert(
        "Sesión cerrada correctamente"
    );

    location.reload();
}


// ============================
// CREAR TICKET
// ============================

ticketForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombreSolicitante =
        document.getElementById(
            "nombreSolicitante"
        ).value;

    const correo =
        document.getElementById(
            "correo"
        ).value;

    const categoria =
        document.getElementById(
            "categoria"
        ).value;

    const descripcion =
        document.getElementById(
            "descripcion"
        ).value;

    const impacto =
        document.getElementById(
            "impacto"
        ).value;

    const urgencia =
        document.getElementById(
            "urgencia"
        ).value;

    const horas =

        parseInt(
            document.getElementById(
                "horas"
            ).value
        ) || 0;


    const minutos =

        parseInt(
            document.getElementById(
                "minutos"
            ).value
        ) || 0;


    const tiempoEstimado =
        horas + (minutos / 60);


    try {

        const response = await fetch(

            `${API_URL}/tickets`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    Authorization:
                        localStorage.getItem(
                            "token"
                        )
                },

                body: JSON.stringify({

                    nombreSolicitante,
                    correo,
                    categoria,
                    descripcion,
                    impacto,
                    urgencia,
                    tiempoEstimado
                })
            }
        );


        const data = await response.json();

        if (!response.ok) {

            alert(
                data.error ||
                "Error creando ticket"
            );

            return;
        }


        alert(
            "✅ Ticket creado correctamente"
        );

        ticketForm.reset();

        cargarTickets();

    } catch (error) {

        console.error(error);

        alert(
            "Error creando ticket"
        );
    }
});


// ============================
// CARGAR TICKETS
// ============================

async function cargarTickets() {

    try {

        const response = await fetch(

            `${API_URL}/tickets`
        );

        const tickets =
            await response.json();


        ticketsContainer.innerHTML = "";


        tickets.forEach(ticket => {

            const card =
                document.createElement("div");


            card.className =
                `ticket ${ticket.prioridad}`;


            card.innerHTML = `

                <h3>
                    ${ticket.nombreSolicitante}
                </h3>

                <p>
                    <strong>ID:</strong>
                    ${ticket.id}
                </p>

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

                    ${new Date(
                        ticket.fechaCreacion
                    ).toLocaleString()}
                </p>

                <button onclick="
                    resolverTicket(${ticket.id})
                ">
                    Resolver
                </button>

                <button onclick="
                    editarTicket(${ticket.id})
                ">
                    Editar
                </button>

                <button onclick="
                    eliminarTicket(${ticket.id})
                ">
                    Eliminar
                </button>
            `;


            ticketsContainer.appendChild(card);
        });

    } catch (error) {

        console.error(error);
    }
}


// ============================
// RESOLVER TICKET
// ============================

async function resolverTicket(id) {

    try {

        const response = await fetch(

            `${API_URL}/tickets/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json",

                    Authorization:
                        localStorage.getItem(
                            "token"
                        )
                },

                body: JSON.stringify({

                    estado: "resuelto"
                })
            }
        );


        if (response.ok) {

            alert(
                "✅ Ticket resuelto correctamente"
            );

            cargarTickets();

        } else {

            alert(
                "Error resolviendo ticket"
            );
        }

    } catch (error) {

        console.error(error);
    }
}


// ============================
// EDITAR TICKET
// ============================

async function editarTicket(id) {

    try {

        const response = await fetch(

            `${API_URL}/tickets`
        );

        const tickets = await response.json();

        const ticket = tickets.find(

            t => t.id === id
        );

        if (!ticket) {

            alert(
                "Ticket no encontrado"
            );

            return;
        }


        const nombreSolicitante = prompt(

            "Nombre solicitante:",

            ticket.nombreSolicitante
        );

        if (!nombreSolicitante) return;


        const correo = prompt(

            "Correo:",

            ticket.correo
        );

        if (!correo) return;


        const categoria = prompt(

            "Categoría (red, hardware, software, cuenta, impresora):",

            ticket.categoria
        );

        if (!categoria) return;


        const descripcion = prompt(

            "Descripción:",

            ticket.descripcion
        );

        if (!descripcion) return;


        const impacto = prompt(

            "Impacto (bajo, medio, alto):",

            ticket.impacto
        );

        if (!impacto) return;


        const urgencia = prompt(

            "Urgencia (baja, media, alta):",

            ticket.urgencia
        );

        if (!urgencia) return;


        const tiempoEstimado = prompt(

            "Tiempo estimado:",

            ticket.tiempoEstimado
        );

        if (!tiempoEstimado) return;


        const actualizarResponse = await fetch(

            `${API_URL}/tickets/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json",

                    Authorization:
                        localStorage.getItem(
                            "token"
                        )
                },

                body: JSON.stringify({

                    nombreSolicitante,
                    correo,
                    categoria,
                    descripcion,
                    impacto,
                    urgencia,

                    tiempoEstimado:
                        Number(tiempoEstimado)
                })
            }
        );


        if (actualizarResponse.ok) {

            alert(
                "✅ Ticket actualizado correctamente"
            );

            cargarTickets();

        } else {

            alert(
                "Error actualizando ticket"
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Error servidor"
        );
    }
}


// ============================
// ELIMINAR TICKET
// ============================

async function eliminarTicket(id) {

    const confirmar = confirm(

        "¿Desea eliminar este ticket?"
    );

    if (!confirmar) {

        return;
    }


    try {

        const response = await fetch(

            `${API_URL}/tickets/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization:
                        localStorage.getItem(
                            "token"
                        )
                }
            }
        );


        if (response.ok) {

            alert(
                "✅ Ticket eliminado correctamente"
            );

            cargarTickets();

        } else {

            alert(
                "Error eliminando ticket"
            );
        }

    } catch (error) {

        console.error(error);
    }
}


// ============================
// INICIO
// ============================

const token = localStorage.getItem("token");


if (token) {

    loginContainer.innerHTML = `

        <h2>Inicio de Sesión</h2>

        <p style="
            color: green;
            font-weight: bold;
        ">

            ✅ Sesión iniciada correctamente

        </p>

        <button onclick="cerrarSesion()">

            Cerrar Sesión

        </button>
    `;

    ticketForm.style.display = "flex";

    ticketsContainer.style.display = "flex";

    cargarTickets();

} else {

    ticketForm.style.display = "none";

    ticketsContainer.style.display = "none";
}