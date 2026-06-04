const URL_BASE = 'https://fakestoreapi.com';

export async function obtenerProductos() {
    const res = await fetch(`${URL_BASE}/products`);
    const datos = await res.json();
    return datos;
}

export async function obtenerProductoPorId(id: number) {
    const res = await fetch(`${URL_BASE}/products/${id}`);
    const datos = await res.json();
    return datos;
}