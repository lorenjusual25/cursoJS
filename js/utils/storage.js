export function getComprado() {
    return JSON.parse(localStorage.getItem("comprado")) || []
}

export function getTotal() {
    return parseInt(localStorage.getItem("total")) || 0
}

export function getNombre() {
    return localStorage.getItem("nombre") || "cliente"
}

export function setComprado (comprado) {
    localStorage.setItem("comprado", JSON.stringify(comprado))
}

export function setTotal (total) {
    localStorage.setItem("total", total)
}

export function setNombre (nombre) {
    localStorage.setItem("nombre", nombre)
}

export function setItems (comprado, total) {
    setComprado(comprado)
    setTotal(total)
}

export function limpiarStorage() {
    localStorage.removeItem("comprado")
    localStorage.removeItem("total")
    localStorage.removeItem("nombre")
}