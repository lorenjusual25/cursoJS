import { getComprado,getTotal } from "./utils/storage.js"
import { getElementos, mostrarNombreUsuario, vistaPreviaCarrito, actualizarVistaFinal, crearElementoProducto } from "./utils/dom.js"
import { agregarCarrito } from "./utils/carrito.js"
import { obtenerProductos } from "./utils/fetch.js"

const btnInicio = document.getElementById("btnInicio").addEventListener("click",() => {
    location.href = "inicio.html"
})

const elementos = getElementos()

let productos;

let comprado = getComprado()

let total = getTotal()

mostrarNombreUsuario(elementos.span)

obtenerProductos().then(data => {
    productos = data.filter(p => p.oferta)
    mostrarProductos()
})
.catch(error => console.error(error))

function mostrarProductos () {
    productos.forEach(p => {
        const button = crearElementoProducto(p, elementos.ofertasProductos,true)
        button.addEventListener("click", () => {
            const estadoAct = agregarCarrito(p,comprado,total)
            comprado = estadoAct.comprado
            total = estadoAct.total
            vistaPreviaCarrito(elementos.output, comprado, total, finalizar)
        })
    })
}

function finalizar () {
    actualizarVistaFinal(elementos.output, comprado, total, elementos.mostrarMenu)
}