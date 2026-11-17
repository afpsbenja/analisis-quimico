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
            setTimeout(escribirConsola, 55);
        } else {
            outputElement.innerHTML += "<br>";
            lineaActual++;
            caracterActual = 0;
            setTimeout(escribirConsola, 600);
        }
    } else {
        mainContent.classList.remove("hidden");

        setTimeout(() => {
            const labCard = document.getElementById("lab-card-box");
            if (labCard) {
                labCard.classList.remove("hidden");
                labCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }, 3500);

        setTimeout(() => {
            const btnReveal = document.getElementById("btn-reveal");
            if (btnReveal) {
                btnReveal.classList.remove("hidden");
                btnReveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }, 7000);
    }
}

window.onload = escribirConsola;

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

document.getElementById("btn-reveal").addEventListener("click", function() {
    this.style.display = "none";
    const finalStage = document.getElementById("final-stage");
    finalStage.classList.remove("hidden");
    finalStage.scrollIntoView({ behavior: "smooth" });
});

// SOLO EL BOTÓN "SÍ" ABRE EL POP-UP
document.getElementById("btn-yes").addEventListener("click", function(e) {
    e.stopPropagation();
    document.getElementById("response-msg").classList.remove("hidden");
    this.innerText = "¡ENLACE CONFIRMADO! 💍";
    document.getElementById("celebration-modal").classList.remove("hidden");
});

// BOTÓN PARA CERRAR EL POP-UP
document.getElementById("close-modal").addEventListener("click", function(e) {
    e.stopPropagation();
    document.getElementById("celebration-modal").classList.add("hidden");
});

// EL BOTÓN "NO" SOLO SE PONE GRIS Y CAMBIA EL TEXTO
const btnNo = document.getElementById("btn-no");

btnNo.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.add("disabled-btn");
    this.innerText = "Excepción no controlada: Solo puedes decir SÍ";
});




