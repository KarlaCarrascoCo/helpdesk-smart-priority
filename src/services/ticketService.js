const fs = require("fs");

const path = require("path");

const priorityService = require("./priorityService");

const rutaTickets = path.join(
    __dirname,
    "../data/tickets.json"
);


// ============================
// OBTENER TICKETS
// ============================

function obtenerTickets() {

    try {

        const data = fs.readFileSync(
            rutaTickets,
            "utf-8"
        );

        return JSON.parse(data);

    } catch {

        return [];
    }
}


// ============================
// GUARDAR TICKETS
// ============================

function guardarTickets(tickets) {

    fs.writeFileSync(

        rutaTickets,

        JSON.stringify(
            tickets,
            null,
            2
        )
    );
}


// ============================
// CREAR TICKET
// ============================

function crearTicket(ticket) {

    const tickets = obtenerTickets();


    // ID UNICO

    const nuevoId =

        tickets.length > 0

            ? Math.max(
                ...tickets.map(t => t.id)
            ) + 1

            : 1;


    const nuevoTicket = {

        id: nuevoId,

        ...ticket,

        estado: "pendiente",

        fechaCreacion:
            new Date().toISOString()
    };

    tickets.push(nuevoTicket);

    guardarTickets(tickets);

    return nuevoTicket;
}


// ============================
// ACTUALIZAR TICKET
// ============================

function actualizarTicket(id, datos) {

    const tickets = obtenerTickets();

    const index = tickets.findIndex(

        t => t.id == id
    );

    if (index === -1) {

        return null;
    }


    tickets[index] = {

        ...tickets[index],

        ...datos
    };


    // RECALCULAR PRIORIDAD

    tickets[index].prioridad =

        priorityService.calcularPrioridad(

            tickets[index].impacto,

            tickets[index].urgencia,

            tickets[index].categoria,

            tickets[index].tiempoEstimado
        );


    guardarTickets(tickets);

    return tickets[index];
}


// ============================
// ELIMINAR TICKET
// ============================

function eliminarTicket(id) {

    const tickets = obtenerTickets();

    const nuevosTickets = tickets.filter(

        t => t.id != id
    );

    guardarTickets(nuevosTickets);
}


module.exports = {

    obtenerTickets,

    crearTicket,

    actualizarTicket,

    eliminarTicket
};