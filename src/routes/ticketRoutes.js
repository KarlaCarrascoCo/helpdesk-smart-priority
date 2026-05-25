const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticketController");

const verificarToken = require("../middlewares/authMiddleware");

// GET TODOS
router.get("/", ticketController.listarTickets);

// GET POR ID
router.get("/:id", ticketController.obtenerTicket);

router.post(
    "/",
    verificarToken,
    ticketController.crearTicket
);

router.put(
    "/:id",
    verificarToken,
    ticketController.actualizarTicket
);

router.delete(
    "/:id",
    verificarToken,
    ticketController.eliminarTicket
);

module.exports = router;