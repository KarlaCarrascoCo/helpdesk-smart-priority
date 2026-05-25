const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("src/public"));

app.use("/tickets", ticketRoutes);
app.use("/login", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});