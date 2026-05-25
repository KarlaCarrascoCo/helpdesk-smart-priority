const formulario = document.getElementById(
    "ticketForm"
);

const listaTickets = document.getElementById(
    "listaTickets"
);

// COLOR PRIORIDAD
function obtenerClasePrioridad(prioridad) {

    if (prioridad === "Baja") {
        return "prioridad-baja";
    }

    if (prioridad === "Media") {
        return "prioridad-media";
    }

    if (prioridad === "Alta") {
        return "prioridad-alta";
    }

    return "prioridad-critica";
}

// FORMATEAR FECHA
function formatearFecha(fecha) {

    return new Date(fecha).toLocaleString(
        "es-CL"
    );
}

// CARGAR TICKETS
async function cargarTickets() {

    const response = await fetch(
        "http://localhost:3000/tickets"
    );

    const tickets = await response.json();

    listaTickets.innerHTML = "";

    tickets.forEach(ticket => {

        const clasePrioridad =
            obtenerClasePrioridad(
                ticket.prioridad
            );

        listaTickets.innerHTML += `

            <div class="ticket ${clasePrioridad}">

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
                    ${formatearFecha(
                        ticket.fechaCreacion
                    )}
                </p>

            </div>
        `;
    });
}

// CREAR TICKET
formulario.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const horas = Number(
            document.getElementById(
                "horas"
            ).value
        );

        const minutos = Number(
            document.getElementById(
                "minutos"
            ).value
        );

        const tiempoEstimado =
            horas + (minutos / 60);

        const nuevoTicket = {

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

            tiempoEstimado:
                tiempoEstimado
        };

        await fetch(
            "http://localhost:3000/tickets",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "token-seguro-123"
                },

                body: JSON.stringify(
                    nuevoTicket
                )
            }
        );

        formulario.reset();

        cargarTickets();
    }
);

// INICIAR
cargarTickets();