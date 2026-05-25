const ticketService = require("../services/ticketService");

// VALIDACIONES
function validarTicket(data) {

    if (
        !data.nombreSolicitante ||
        !data.correo ||
        !data.categoria ||
        !data.descripcion ||
        !data.impacto ||
        !data.urgencia ||
        !data.tiempoEstimado
    ) {
        return "Todos los campos son obligatorios";
    }

    // VALIDAR CORREO
    const regexCorreo = /\S+@\S+\.\S+/;

    if (!regexCorreo.test(data.correo)) {
        return "Correo inválido";
    }

    // VALIDAR IMPACTO
    const impactosValidos = ["bajo", "medio", "alto"];

    if (!impactosValidos.includes(data.impacto)) {
        return "Impacto inválido";
    }

    // VALIDAR URGENCIA
    const urgenciasValidas = ["baja", "media", "alta"];

    if (!urgenciasValidas.includes(data.urgencia)) {
        return "Urgencia inválida";
    }

    return null;
}

// LISTAR
function listarTickets(req, res) {

    const tickets = ticketService.obtenerTickets();

    res.status(200).json(tickets);
}

// CREAR
function crearTicket(req, res) {

    const error = validarTicket(req.body);

    if (error) {
        return res.status(400).json({
            error: error
        });
    }

    const nuevoTicket = ticketService.crearTicket(req.body);

    res.status(201).json(nuevoTicket);
}

// OBTENER POR ID
function obtenerTicket(req, res) {

    const ticket = ticketService.obtenerTicketPorId(req.params.id);

    if (!ticket) {
        return res.status(404).json({
            error: "Ticket no encontrado"
        });
    }

    res.status(200).json(ticket);
}

// ACTUALIZAR
function actualizarTicket(req, res) {

    const ticketActualizado = ticketService.actualizarTicket(
        req.params.id,
        req.body
    );

    if (!ticketActualizado) {
        return res.status(404).json({
            error: "Ticket no encontrado"
        });
    }

    res.status(200).json(ticketActualizado);
}

// ELIMINAR
function eliminarTicket(req, res) {

    const eliminado = ticketService.eliminarTicket(
        req.params.id
    );

    if (!eliminado) {
        return res.status(404).json({
            error: "Ticket no encontrado"
        });
    }

    res.status(200).json({
        mensaje: "Ticket eliminado correctamente"
    });
}

module.exports = {
    listarTickets,
    crearTicket,
    obtenerTicket,
    actualizarTicket,
    eliminarTicket
};