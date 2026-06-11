const URL_API = 'https://dog.ceo/api/breeds/list/all';

export async function obtenerRazas() {
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
        contenedor.innerHTML = '<p>No se pudieron cargar las razas.</p>';
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