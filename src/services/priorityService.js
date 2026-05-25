function calcularPrioridad(ticket) {

    let puntaje = 0;

    // IMPACTO
    if (ticket.impacto === "bajo") puntaje += 1;
    if (ticket.impacto === "medio") puntaje += 2;
    if (ticket.impacto === "alto") puntaje += 3;

    // URGENCIA
    if (ticket.urgencia === "baja") puntaje += 1;
    if (ticket.urgencia === "media") puntaje += 2;
    if (ticket.urgencia === "alta") puntaje += 3;

    // BONUS CATEGORIA
    if (
        ticket.categoria === "red" ||
        ticket.categoria === "cuenta"
    ) {
        puntaje += 1;
    }

    // BONUS TIEMPO
    if (ticket.tiempoEstimado > 4) {
        puntaje += 1;
    }

    // RESULTADO
    if (puntaje <= 3) return "Baja";
    if (puntaje <= 5) return "Media";
    if (puntaje === 6) return "Alta";

    return "Crítica";
}

module.exports = calcularPrioridad;