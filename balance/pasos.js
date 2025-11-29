// ---- Selección de vistas ----
const vistas = [
    document.querySelector('.formato'), // Balance
    document.querySelector('.estado'),  // Estado Resultados
    document.querySelector('.flujo')    // Flujo Efectivo
];

let indiceVista = 0; // Inicia en Balance General (vista 0)

// Botones
const btnAnterior = document.querySelector('.previous_step');
const btnSiguiente = document.querySelector('.next_step');

// Función que muestra la vista correcta
function mostrarVista(index) {
    vistas.forEach((vista, i) => {
        if (i === index) {
            vista.style.display = "block";
        } else {
            vista.style.display = "none";
        }
    });

    // Actualizar bolas de progreso
    actualizarIndicador(index);
}

// Función para marcar la bola activa
function actualizarIndicador(index) {
    const balls = document.querySelectorAll('.ball');

    balls.forEach((ball, i) => {
        if (i === index) {
            ball.classList.add('active_ball');
        } else {
            ball.classList.remove('active_ball');
        }
    });
}

// Botón siguiente
btnSiguiente.addEventListener('click', () => {
    if (indiceVista < vistas.length - 1) {
        indiceVista++;
        mostrarVista(indiceVista);
    }
});

// Botón anterior
btnAnterior.addEventListener('click', () => {
    if (indiceVista > 0) {
        indiceVista--;
        mostrarVista(indiceVista);
    }
});

// Iniciar mostrando Balance General
mostrarVista(indiceVista);
