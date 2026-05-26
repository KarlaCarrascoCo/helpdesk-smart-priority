const ticketService = require("../services/ticketService");

const priorityService = require("../services/priorityService");


// GET

exports.obtenerTickets = (req, res) => {

    const tickets = ticketService.obtenerTickets();

    res.json(tickets);
};


// POST

exports.crearTicket = (req, res) => {

    const {

        nombreSolicitante,
        correo,
        categoria,
        descripcion,
        impacto,
        urgencia,
        tiempoEstimado

    } = req.body;


    if (

        !nombreSolicitante ||

        !correo ||

        !categoria ||

        !descripcion ||

        !impacto ||

        !urgencia ||

        tiempoEstimado === undefined

    ) {

        return res.status(400).json({

            error: "Todos los campos son obligatorios"
        });
    }


    const prioridad = priorityService.calcularPrioridad(

        impacto,
        urgencia,
        categoria,
        tiempoEstimado
    );


    const nuevoTicket = ticketService.crearTicket({

        nombreSolicitante,
        correo,
        categoria,
        descripcion,
        impacto,
        urgencia,
        tiempoEstimado,
        prioridad
    });

    res.status(201).json(nuevoTicket);
};


// PUT

exports.actualizarTicket = (req, res) => {

    const { id } = req.params;

    const ticketActualizado = ticketService.actualizarTicket(

        id,
        req.body
    );

    if (!ticketActualizado) {

        return res.status(404).json({

            error: "Ticket no encontrado"
        });
    }

    res.json(ticketActualizado);
};


// DELETE

exports.eliminarTicket = (req, res) => {

    const { id } = req.params;

    ticketService.eliminarTicket(id);

    res.json({

        mensaje: "Ticket eliminado correctamente"
    });
};