import { iniciarFormulario } from './formulario.js';
import { obtenerRazas, renderizarTarjetas } from './api.js';
import { obtenerPacientes } from './storage.js';

async function iniciarApp() {
    iniciarFormulario(mostrarPacientesGuardados);

    const razas = await obtenerRazas();
    renderizarTarjetas(razas);

    mostrarPacientesGuardados();
}

function mostrarPacientesGuardados() {
    const pacientes = obtenerPacientes();
    const contenedor = document.getElementById('contenedor-tarjetas');

    if (pacientes.length === 0) return;

    contenedor.innerHTML = '';
    pacientes.forEach(p => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta');
        tarjeta.innerHTML = `
            <h3>${p.nombreMascota}</h3>
            <p><strong>Dueño:</strong> ${p.nombreDueno}</p>
            <p><strong>Especie:</strong> ${p.especie}</p>
            <p><strong>Cita:</strong> ${p.fechaCita}</p>
            <p><strong>Consulta:</strong> ${p.tipoConsulta}</p>
            <p class="tarjeta-tipo">Registrado: ${p.fechaRegistro}</p>
            <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
        `;
        contenedor.appendChild(tarjeta);
    });

    contenedor.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => {
            import('./storage.js').then(({ eliminarPaciente }) => {
                eliminarPaciente(btn.dataset.id);
                mostrarPacientesGuardados();
            });
        });
    });
}

iniciarApp();