const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticketController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", ticketController.obtenerTickets);

router.post(
    "/",
    authMiddleware,
    ticketController.crearTicket
);

router.put(
    "/:id",
    authMiddleware,
    ticketController.actualizarTicket
);

router.delete(
    "/:id",
    authMiddleware,
    ticketController.eliminarTicket
);

module.exports = router;