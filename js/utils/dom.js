import { getNombre, limpiarStorage} from './storage.js'
import { eliminar1Producto, eliminarTotal, limpiarCarrito } from './carrito.js' 

export function getElementos() {
    return {
        main: document.getElementById("main"),
        carrito: document.getElementById("carrito"),
        span: document.querySelector(".username"),
        username: document.getElementById("username"),
        output: document.getElementById("output"),
        mostrarMenu: document.getElementById("mostrarMenu"),
        listaProductos: document.getElementById("listaProductos")
    }
}

export function mostrarNombreUsuario(span) {
    span.innerText = getNombre()
}

export function actualizarVistaFinal (output, comprado,total) {
    output.innerHTML = ""
    output.innerHTML = `
        <h3> Gracias <span class="username">${getNombre()}</span> por su compra de: </h3>
        <ul>
            ${comprado.map(c => `<li>${c.nombre} - x${c.cant} - $${c.precio}</li>`).join("")}
        </ul>
        <p> Total a pagar: $${total}</p>
        <button id="volverIndex">Volver al inicio</button>
    `
    limpiarStorage()
    document.getElementById("volverIndex").addEventListener("click",() => {
        location.href = "/index.html"
    })
}

export function vistaPreviaCarrito (output, comprado, total, finalizar) {
    output.innerHTML = `
        <ul class="vistaPreviaCarrito">
            ${comprado.map((c, index) => `
                <li>
                    ${c.nombre} - x${c.cant} - $${c.precio * c.cant}
                    <button class="btnEliminar" data-index="${index}">Eliminar 1 producto</button>
                    <button class="btnEliminarTotal" data-index="${index}">Eliminar toda la cantidad</button>
                </li>
            `).join("")}
        </ul>
        <p>Total: $${total}</p>
        <button id="limpiarCarrito">Limpiar carrito</button>
        <button id="terminarCompra">Comprar</button>
    `
    const btnEliminar = document.querySelectorAll(".btnEliminar")
    if (btnEliminar) {
        btnEliminar.forEach((btn) => {
            btn.addEventListener("click" ,(e) => {
                const index = parseInt(e.target.dataset.index)
                const producto = comprado[index]
                const res = eliminar1Producto(producto)
                if (res.success) {
                    vistaPreviaCarrito(output, res.comprado, res.total, finalizar)
                    Toastify({
                        duration: 1000,
                        text: `${res.message}`,
                        gravity: "bottom",
                        position: "center"
                    }).showToast()
                }
                else {
                    Toastify({
                        duration: 1000,
                        text: `${res.message}`,
                        gravity: "bottom",
                        position: "center",
                        style: {
                            background: "linear-gradient(to right, #ff0000ff, #bf0000ff)",
                        }
                    }).showToast()
                }
            })
        })
    }
    const btnEliminarTotal = document.querySelectorAll(".btnEliminarTotal")
    if (btnEliminarTotal) {
        btnEliminarTotal.forEach((btn) => {
            btn.addEventListener("click",(e) => {
                const index = parseInt(e.target.dataset.index)
                const producto = comprado[index]
                const res = eliminarTotal(producto)
                if (res.success) {
                    vistaPreviaCarrito(output, res.comprado, res.total, finalizar)
                    Toastify({
                        duration: 1000,
                        text: `${res.message}`,
                        gravity: "bottom",
                        position: "center"
                    }).showToast()
                }
                else {
                    Toastify({
                        duration: 1000,
                        text: `${res.message}`,
                        gravity: "bottom",
                        position: "center",
                        style: {
                            background: "linear-gradient(to right, #ff0000ff, #bf0000ff)",
                        }
                    }).showToast()
                }
            })
        })
    }
    const btnLimpiarCarrito = document.getElementById("limpiarCarrito")
    if (btnLimpiarCarrito) {
        btnLimpiarCarrito.addEventListener("click", () => {
            const res = limpiarCarrito()
            if (res.success) {
                vistaPreviaCarrito(output, res.comprado, res.total, finalizar)
                Toastify({
                        duration: 1000,
                        text: `${res.message}`,
                        gravity: "bottom",
                        position: "center"
                }).showToast()
            }
        })
    }
    const btnTerminar = document.getElementById("terminarCompra")
    if (btnTerminar) {
        btnTerminar.addEventListener("click", finalizar)
    }
}
//Esta funcion es para crear el listado de productos y devuelve el boton de "agregar al carrito" 
export function crearElementoProducto(producto, listaProductos, esOferta) {
    const col = document.createElement("div")
    col.className = "col-12 col-md-4 col-lg-3 mb-4"
    //en div class=" bg-warning text-dark position-absolute top-0 end-0 m-2">¡OFERTA!</div>' puedo agregar badge para otro estilo
    col.innerHTML = `
        <div class= "card h-100">
            ${esOferta ? '<div class="badge bg-warning text-dark position-absolute top-0 end-0 m-2">¡OFERTA!</div>' : ''}
            <img src="../assets/productos/${producto.imagen}" class="card-img-top" alt="imagen de un/a ${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bolder text-light">${producto.nombre}</h5>
                <p class="card-text text-muted small">${producto.categoria}</p>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="h4 mb-0 verde-claro">$${producto.precio}</span>
                        <small class="text-muted">Stock: ${producto.stock}</small>
                    </div>
                    <button class="agregarBtn btn btn-primary w-100">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `
    listaProductos.appendChild(col)
    return col.querySelector(".agregarBtn")
}