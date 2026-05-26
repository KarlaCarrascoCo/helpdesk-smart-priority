const express = require("express");

const path = require("path");

const app = express();

const ticketRoutes = require("./routes/ticketRoutes");

const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);

app.use("/tickets", ticketRoutes);

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Servidor funcionando en puerto ${PORT}`);
});