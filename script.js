// 1. CONFIGURACIÓN DE TEXTOS DE CONSOLA (Efecto Máquina de Escribir)
const lineasConsola = [
    "> Iniciando protocolo de análisis molecular...",
    "> Cargando historial desde: 10 de Mayo [OK]",
    "> Evaluando compatibilidad Quimica + Informatica ... 100%",
    "> Calculando punto medio entre 14/10 y 04/01...",
    "> RESULTADO ENCONTRADO: 24 DE NOVIEMBRE."
];

const outputElement = document.getElementById("typewriter-output");
const mainContent = document.getElementById("main-content");

let lineaActual = 0;
let caracterActual = 0;

function escribirConsola() {
    if (lineaActual < lineasConsola.length) {
        if (caracterActual < lineasConsola[lineaActual].length) {
            outputElement.innerHTML += lineasConsola[lineaActual].charAt(caracterActual);
            caracterActual++;
            setTimeout(escribirConsola, 30); // Velocidad de tipeo (ms)
        } else {
            outputElement.innerHTML += "<br>";
            lineaActual++;
            caracterActual = 0;
            setTimeout(escribirConsola, 300); // Pausa entre líneas
        }
    } else {
        // Cuando termina de escribir todo, muestra las tarjetas principales
        mainContent.classList.remove("hidden");
    }
}

// Iniciar la animación al cargar la página
window.onload = escribirConsola;

// 2. CONTADOR EN TIEMPO REAL DESDE EL 10 DE MAYO DE 2026
// Nota: En JS los meses empiezan en 0 (Enero=0, Mayo=4)
const fechaConocidos = new Date(2026, 4, 10, 0, 0, 0);

function actualizarReloj() {
    const ahora = new Date();
    const diff = ahora - fechaConocidos;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / 1000 / 60) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerText = 
        `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(actualizarReloj, 1000);
actualizarReloj();

// 3. EVENTOS DE BOTONES (Equivalente a manejar interrupciones/inputs)
document.getElementById("btn-reveal").addEventListener("click", function() {
    this.style.display = "none"; // Oculta el botón tras presionarlo
    const finalStage = document.getElementById("final-stage");
    finalStage.classList.remove("hidden");
    finalStage.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("btn-yes").addEventListener("click", function() {
    document.getElementById("response-msg").classList.remove("hidden");
    this.innerText = "¡ENLACE CONFIRMADO!";
});

// Botón "No" esquivo por si intenta apretarlo de broma
const btnNo = document.getElementById("btn-no");
btnNo.addEventListener("mouseover", function() {
    this.innerText = "Excepción no controlada: Solo puedes decir SÍ";
});
