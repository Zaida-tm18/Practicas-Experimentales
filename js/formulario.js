import { guardarPaciente } from './storage.js';

const CAMPOS = {
    'nombre-mascota': { mensaje: 'El nombre debe tener al menos 2 caracteres.' },
    'nombre-dueno':   { mensaje: 'El nombre del dueño es obligatorio.' },
    'email':          { mensaje: 'Ingresa un correo electrónico válido.' },
    'password':       { mensaje: 'Mínimo 8 caracteres, una mayúscula y un número.' },
    'telefono':       { mensaje: 'Ingresa un teléfono válido (9-15 dígitos).' },
    'edad-mascota':   { mensaje: 'La edad debe estar entre 0 y 30 años.' },
    'fecha-cita':     { mensaje: 'Selecciona una fecha para la cita.' },
    'especie':        { mensaje: 'Selecciona la especie de la mascota.' },
};

function mostrarError(id, mensaje) {
    const span = document.getElementById(`${id}-error`);
    const input = document.getElementById(id);
    if (!span || !input) return;
    span.textContent = mensaje;
    span.classList.add('visible');
    input.setAttribute('aria-invalid', 'true');
}

function limpiarError(id) {
    const span = document.getElementById(`${id}-error`);
    const input = document.getElementById(id);
    if (!span || !input) return;
    span.textContent = '';
    span.classList.remove('visible');
    input.removeAttribute('aria-invalid');
}

function validarCampo(id) {
    const input = document.getElementById(id);
    if (!input) return true;
    if (!input.validity.valid) {
        mostrarError(id, CAMPOS[id].mensaje);
        return false;
    }
    limpiarError(id);
    return true;
}

function validarFormulario() {
    const resultados = Object.keys(CAMPOS).map(id => validarCampo(id));
    return resultados.every(Boolean);
}

function recopilarDatos() {
    const vacunas = [...document.querySelectorAll('input[name="vacunas"]:checked')]
        .map(cb => cb.value);
    const tipoConsulta = document.querySelector('input[name="tipo-consulta"]:checked');

    return {
        id: Date.now().toString(),
        nombreMascota:  document.getElementById('nombre-mascota').value.trim(),
        nombreDueno:    document.getElementById('nombre-dueno').value.trim(),
        email:          document.getElementById('email').value.trim(),
        telefono:       document.getElementById('telefono').value.trim(),
        edadMascota:    document.getElementById('edad-mascota').value,
        fechaCita:      document.getElementById('fecha-cita').value,
        peso:           document.getElementById('peso').value,
        especie:        document.getElementById('especie').value,
        tipoConsulta:   tipoConsulta ? tipoConsulta.value : '',
        vacunas,
        observaciones:  document.getElementById('observaciones').value.trim(),
        fechaRegistro:  new Date().toLocaleDateString('es-EC'),
    };
}

export function iniciarFormulario(onRegistro) {
    const form = document.getElementById('form-registro');
    const rangePeso = document.getElementById('peso');
    const valorPeso = document.getElementById('valor-peso');

    rangePeso.addEventListener('input', () => {
        valorPeso.textContent = rangePeso.value;
    });

    Object.keys(CAMPOS).forEach(id => {
        const input = document.getElementById(id);
        if (input) input.addEventListener('blur', () => validarCampo(id));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        const paciente = recopilarDatos();
        guardarPaciente(paciente);
        form.reset();
        valorPeso.textContent = '10';
        Object.keys(CAMPOS).forEach(id => limpiarError(id));

        if (typeof onRegistro === 'function') onRegistro();
        alert(`✅ ${paciente.nombreMascota} registrado correctamente.`);
    });
}