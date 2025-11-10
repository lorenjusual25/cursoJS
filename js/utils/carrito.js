import { setItems } from "./storage.js"

export function agregarCarrito (producto, compradoActual, totalActual) {
    const comprado = [...compradoActual,producto]
    const total = totalActual + producto.precio
    setItems(comprado,total)
    return {comprado, total}
}