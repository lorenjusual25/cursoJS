export async function obtenerProductos () {
    try {
        const response = await fetch('../data/productos.json')
        const data = await response.json()
        return data
    }
    catch {
        console.error('Ocurrio un error',error)
        return []
    }
}