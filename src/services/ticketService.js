const fs = require("fs");
const path = require("path");

const calcularPrioridad = require("./priorityService");

const rutaArchivo = path.join(__dirname, "../data/tickets.json");

// LEER TICKETS
function obtenerTickets() {

    const data = fs.readFileSync(rutaArchivo);

    return JSON.parse(data);
}

// GUARDAR TICKETS
function guardarTickets(tickets) {

    fs.writeFileSync(
        rutaArchivo,
        JSON.stringify(tickets, null, 2)
    );
}

// CREAR TICKET
function crearTicket(ticket) {

    const tickets = obtenerTickets();

    const nuevoTicket = {
        id: tickets.length + 1,
        nombreSolicitante: ticket.nombreSolicitante,
        correo: ticket.correo,
        categoria: ticket.categoria,
        descripcion: ticket.descripcion,
        impacto: ticket.impacto,
        urgencia: ticket.urgencia,
        tiempoEstimado: ticket.tiempoEstimado,
        estado: "pendiente",
        prioridad: calcularPrioridad(ticket),
        fechaCreacion: new Date()
    };

    tickets.push(nuevoTicket);

    guardarTickets(tickets);

    return nuevoTicket;
}

// OBTENER POR ID
function obtenerTicketPorId(id) {

    const tickets = obtenerTickets();

    return tickets.find(ticket => ticket.id == id);
}

// ACTUALIZAR TICKET
function actualizarTicket(id, datosActualizados) {

    const tickets = obtenerTickets();

    const index = tickets.findIndex(ticket => ticket.id == id);

    if (index === -1) {
        return null;
    }

    tickets[index] = {
        ...tickets[index],
        ...datosActualizados
    };

    guardarTickets(tickets);

    return tickets[index];
}

// ELIMINAR TICKET
function eliminarTicket(id) {

    const tickets = obtenerTickets();

    const nuevosTickets = tickets.filter(
        ticket => ticket.id != id
    );

    if (tickets.length === nuevosTickets.length) {
        return false;
    }

    guardarTickets(nuevosTickets);

    return true;
}

module.exports = {
    obtenerTickets,
    crearTicket,
    obtenerTicketPorId,
    actualizarTicket,
    eliminarTicket
};