const CLAVE = 'vetsystem_pacientes';

export function guardarPaciente(paciente) {
    const pacientes = obtenerPacientes();
    pacientes.push(paciente);
    localStorage.setItem(CLAVE, JSON.stringify(pacientes));
}

export function obtenerPacientes() {
    const datos = localStorage.getItem(CLAVE);
    return datos ? JSON.parse(datos) : [];
}

export function eliminarPaciente(id) {
    const pacientes = obtenerPacientes().filter(p => p.id !== id);
    localStorage.setItem(CLAVE, JSON.stringify(pacientes));
}