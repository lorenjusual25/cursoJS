import { getComprado,getTotal } from "./utils/storage.js"
import { getElementos, mostrarNombreUsuario, vistaPreviaCarrito, actualizarVistaFinal, crearElementoProducto } from "./utils/dom.js"
import { agregarCarrito } from "./utils/carrito.js"
import { obtenerProductos } from "./utils/fetch.js"

const elementos = getElementos()

let productos;

let comprado ;

let total;

mostrarNombreUsuario(elementos.span)

obtenerProductos().then(data => {
    productos = data
    mostrarProductos()
})
.catch(error => console.error(error))

function mostrarProductos () {
    productos.forEach(p => {
        const button = crearElementoProducto(p, elementos.listaProductos,p.oferta)//Se recibe el boton "agregar al carrito (con clases y texto)"
        button.addEventListener("click", () => {
            const estadoAct = agregarCarrito(p)
            if (estadoAct.success){
                comprado = estadoAct.comprado
                total = estadoAct.total
                vistaPreviaCarrito(elementos.output, comprado, total, finalizar)
            }
            else
                //luego pienso en una forma de notificar que el usuario supero el stock
                alert(estadoAct.message)
        })
    })
}

function finalizar () {
    actualizarVistaFinal(elementos.output, getComprado(), getTotal(), elementos.mostrarMenu)
}