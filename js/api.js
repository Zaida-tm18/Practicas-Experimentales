const URL_API = 'https://dog.ceo/api/breeds/list/all';

export async function obtenerRazas() {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = `
        <p class="estado-carga" role="status" aria-live="polite">
            Cargando razas disponibles...
        </p>`;

    try {
        const respuesta = await fetch(URL_API);
        if (!respuesta.ok) throw new Error('Error al conectar con la API');
        const datos = await respuesta.json();
        const razas = Object.keys(datos.message).slice(0, 12);
        return razas;
    } catch (error) {
        console.error('API error:', error);
        return [];
    }
}

export function renderizarTarjetas(razas) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';

    if (razas.length === 0) {
        contenedor.innerHTML = `
            <div class="estado-vacio" role="status" aria-live="polite">
                <p>No se pudieron cargar las razas. Verifica tu conexión.</p>
            </div>`;
        return;
    }

    razas.forEach(raza => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta');
        tarjeta.innerHTML = `
            <h3>${raza.charAt(0).toUpperCase() + raza.slice(1)}</h3>
            <p class="tarjeta-tipo">Raza canina</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}