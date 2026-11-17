// ⚡ MODO PRUEBA: Ponlo en 'true' para probar rápido, y en 'false' para el 24 de noviembre
const MODO_PRUEBA = false; 

const velocidadTipeo = MODO_PRUEBA ? 1 : 55;
const pausaLinea = MODO_PRUEBA ? 10 : 600;
const esperaTarjeta = MODO_PRUEBA ? 100 : 3500;
const esperaBoton = MODO_PRUEBA ? 200 : 7000;

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
            setTimeout(escribirConsola, velocidadTipeo);
        } else {
            outputElement.innerHTML += "<br>";
            lineaActual++;
            caracterActual = 0;
            setTimeout(escribirConsola, pausaLinea);
        }
    } else {
        mainContent.classList.remove("hidden");

        setTimeout(() => {
            const labCard = document.getElementById("lab-card-box");
            if (labCard) {
                labCard.classList.remove("hidden");
                labCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }, esperaTarjeta);

        setTimeout(() => {
            const btnReveal = document.getElementById("btn-reveal");
            if (btnReveal) {
                btnReveal.classList.remove("hidden");
                btnReveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }, esperaBoton);
    }
}

// Arranca al instante sin esperar recursos externos
document.addEventListener("DOMContentLoaded", escribirConsola);

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

// SOLO EL BOTÓN "SÍ" ABRE EL POP-UP Y DISPARA EL CONFETI NATIVO
document.getElementById("btn-yes").addEventListener("click", function(e) {
    e.stopPropagation();
    document.getElementById("response-msg").classList.remove("hidden");
    this.innerText = "¡ENLACE CONFIRMADO! 💍";
    document.getElementById("celebration-modal").classList.remove("hidden");
    
    lanzarConfetiNativo();
});

// BOTÓN PARA CERRAR EL POP-UP Y VOLVER A VER LA PÁGINA
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

// FUNCIÓN PROPIA DE CONFETI (CERO DEPENDENCIAS EXTERNAS)
function lanzarConfetiNativo() {
    const colores = ['#ff66b2', '#00bcff', '#ffffff', '#3fb950'];
    for (let i = 0; i < 80; i++) {
        const particula = document.createElement('div');
        particula.style.position = 'fixed';
        particula.style.width = '8px';
        particula.style.height = '8px';
        particula.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        particula.style.left = Math.random() * 100 + 'vw';
        particula.style.top = '-10px';
        particula.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        particula.style.zIndex = '10000';
        particula.style.pointerEvents = 'none';
        document.body.appendChild(particula);

        const duracion = Math.random() * 2 + 1.5;
        const desplazamientoX = (Math.random() - 0.5) * 150;

        particula.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${desplazamientoX}px, 100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duracion * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => particula.remove(), duracion * 1000);
    }
}
