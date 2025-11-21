import { getComprado,getTotal } from "./utils/storage.js"
import { getElementos, mostrarNombreUsuario, vistaPreviaCarrito, actualizarVistaFinal, crearElementoProducto } from "./utils/dom.js"
import { agregarCarrito } from "./utils/carrito.js"
import { obtenerProductos } from "./utils/fetch.js"

const elementos = getElementos()

let productos;

const carrito = elementos.carrito
let carritoAbierto = false

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
                Toastify({
                    duration: 1000,
                    text: `${estadoAct.message}`,
                    gravity: "bottom",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast()
                //Si el carrito esta abierto, se actualiza la vista previa del carrito, sino, no muestra nada
                if (carritoAbierto) {
                    vistaPreviaCarrito(elementos.output, comprado, total, finalizar)
                }
            }
            else
                Toastify({
                    duration: 1000,
                    text: `${estadoAct.message}`,
                    gravity: "bottom",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, #ff0000ff, #bf0000ff)",
                    }
                }).showToast()
        })
    })
}

function abrirCarrito() {
    carritoAbierto = !carritoAbierto
    if (carritoAbierto) {
        comprado = getComprado()
        total = getTotal()
        elementos.output.classList.remove('hidden')
        vistaPreviaCarrito(elementos.output, comprado, total, finalizar)
    }
    else {
        elementos.output.innerHTML = ""
        elementos.output.classList.add('hidden')
    }
}

carrito.addEventListener("click",abrirCarrito)

function finalizar () {
    carritoAbierto = false
    actualizarVistaFinal(elementos.main, getComprado(), getTotal())
}