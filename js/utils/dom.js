import { getNombre, limpiarStorage } from './storage.js'

export function getElementos() {
    return {
        span: document.getElementById("username"),
        username: document.getElementById("username"),
        output: document.getElementById("output"),
        mostrarMenu: document.getElementById("mostrarMenu"),
        listaProductos: document.getElementById("listaProductos"),
        ofertasProductos: document.getElementById("ofertasProductos")
    }
}

export function mostrarNombreUsuario(span) {
    span.innerText = getNombre()
}

export function actualizarVistaFinal (output, comprado,total, mostrarMenu) {
    mostrarMenu.innerHTML = ""
    output.innerHTML = ""
    output.innerHTML = `
        <h3> Gracias ${getNombre()} por su compra: </h3>
        <ul>
            ${comprado.map(c => `<li>${c.nombre} - ${c.precio}</li>`).join("")}
        </ul>
        <p> Total a pagar: $${total}</p>
        <button id="volverIndex">Volver al inicio</button>
    `
    limpiarStorage()
    document.getElementById("volverIndex").addEventListener("click",() => {
        location.href = "../index.html"
    })
}

export function vistaPreviaCarrito (output, comprado, total, finalizar) {
    output.innerHTML = `
        <h4>Vista previa del carrito</h4>
        <ul>
            ${comprado.map(c => `<li>${c.nombre} - $${c.precio}</li>`).join("")}
        </ul>
        <p>Total: $${total}</p>
        <button id="terminarCompra">Dejar de comprar</button>
    `
    const btnTerminar = document.getElementById("terminarCompra")
    if (btnTerminar) {
        btnTerminar.addEventListener("click", finalizar)
    }
}
//Esta funcion es para crear el listado de productos y devuelve el boton de "agregar al carrito" 
export function crearElementoProducto(producto, listaGeneral, esOferta) {
    const li = document.createElement('li')
    li.className = esOferta ? "ofertaLi" : "productoLi"
    li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">${producto.nombre}</h5>
            <span class="badge bg-success rounded-pill">$${producto.precio}</span>
        </div>
        <p class="text-muted small">${producto.categoria}</p>
    `
    const img = document.createElement('img')
    img.src = `../assets/${producto.imagen}`
    img.alt = `imagen de ${producto.nombre}`
    img.className = 'productoImg img-fluid rounded my-2'
    const button = document.createElement('button')
    button.className = 'agregarBtn btn btn-primary w-100'
    button.innerText = 'Agregar al carrito'
    li.appendChild(img)
    li.appendChild(button)
    listaGeneral.appendChild(li)
    return button
}