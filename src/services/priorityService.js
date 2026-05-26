exports.calcularPrioridad = (

    impacto,
    urgencia,
    categoria,
    tiempoEstimado

) => {

    let puntos = 0;


    // IMPACTO

    if (impacto === "alto") puntos += 3;

    if (impacto === "medio") puntos += 2;

    if (impacto === "bajo") puntos += 1;


    // URGENCIA

    if (urgencia === "alta") puntos += 3;

    if (urgencia === "media") puntos += 2;

    if (urgencia === "baja") puntos += 1;


    // CATEGORIA

    if (categoria === "red") puntos += 2;

    if (categoria === "hardware") puntos += 2;


    // TIEMPO

    if (tiempoEstimado >= 4) puntos += 3;

    else if (tiempoEstimado >= 2) puntos += 2;

    else puntos += 1;


    // PRIORIDAD

    if (puntos >= 10) return "Crítica";

    if (puntos >= 8) return "Alta";

    if (puntos >= 5) return "Media";

    return "Baja";
};