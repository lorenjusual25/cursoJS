import { getComprado,getTotal } from "./utils/storage.js"
import { getElementos, mostrarNombreUsuario, vistaPreviaCarrito, actualizarVistaFinal, crearElementoProducto } from "./utils/dom.js"
import { agregarCarrito } from "./utils/carrito.js"
import { obtenerProductos } from "./utils/fetch.js"

const btnOfertas = document.getElementById("btnOfertas").addEventListener("click",() => {
    location.href = "ofertas.html"
})

const elementos = getElementos()

let productos;

let comprado = getComprado()

let total = getTotal()

mostrarNombreUsuario(elementos.span)

obtenerProductos().then(data => {
    productos = data.filter(p => !p.oferta)
    mostrarProductos()
})
.catch(error => console.error(error))

function mostrarProductos () {
    productos.forEach(p => {
        const button = crearElementoProducto(p, elementos.listaProductos,false)//Se recibe el boton "agregar al carrito (con clases y texto)"
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