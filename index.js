//este programa solo deja comprar 1 vez, para comprar mas veces hay que recargar la pag
//variables
const btnOfertas = document.getElementById("btnOfertas").addEventListener("click",() => {
    location.href = "../pages/ofertas.html"
})

const productos = [
    {
        nombre: "Hamburguesa",
        precio: 5000,
        categoria: "Comida"
    },
    {
        nombre: "Pizza",
        precio: 3000,
        categoria: "Comida"
    },
    {
        nombre: "Pancho",
        precio: 2000,
        categoria: "Comida"
    },
    {
        nombre: "Gaseosa",
        precio: 1000,
        categoria: "Bebida"
    }
]

const listaProductos = document.getElementById('listaProductos')

let comprado = []

let total = 0

let nombre = "cliente"; //esta variable es solo para guardar en el localStorage, y se le da este valor inicial para evitar undefined

let span = document.getElementById("username")

let input = document.getElementById("usernameInput")

let guardarNombre = document.getElementById("usernameGuardar")

let output = document.getElementById("output")

//logica de ingreso de nombre
input.addEventListener("input",function() {
    nombre = this.value
})

span.innerText = localStorage.getItem("nombre")?localStorage.getItem("nombre"):"cliente"

guardarNombre.addEventListener("click",() => {
    localStorage.setItem("nombre",nombre)
    span.innerText = localStorage.getItem("nombre")
})

//logica de listar cada producto en la lista y agregarlo al carrito
//+ agregar lo comprado hasta ahora a localStorage para agregar ofertas si es que se quiere
productos.forEach(producto => {
    const li = document.createElement('li')
    li.innerHTML = `<p>Producto: ${producto.nombre} - Precio: $${producto.precio} - Categoria: ${producto.categoria}</p>`
    const button = document.createElement('button')
    button.className = 'agregar'
    button.innerText = "Agregar al carrito"
    button.addEventListener("click",() => agregarCarrito(producto))
    li.appendChild(button)
    listaProductos.appendChild(li)
})

function agregarCarrito(productoElejido) {
    comprado.push(productoElejido)
    total += productoElejido.precio
    localStorage.setItem("comprado",JSON.stringify(comprado))
    localStorage.setItem("total",total)
    output.innerHTML = `
        <h4>Vista previa del carrito</h4>
        <ul>
            ${comprado.map(c => `<li>${c.nombre} - $${c.precio}</li>`).join("")}
        </ul>
        <p>Total: $${total}</p>
        <button id="terminarCompra">Dejar de comprar</button>
    `
    if (document.getElementById("terminarCompra"))
        document.getElementById("terminarCompra").addEventListener("click",() => {
            actualizarVista()
        })
}
//logica de una vez que el usuario terminó con su compra, muestra una nueva pantalla con la info de su compra
function actualizarVista () {
    let mostrarMenu = document.getElementById("mostrarMenu")
    mostrarMenu.innerHTML = ""
    output.innerHTML = ""
    output.innerHTML = `
        <h3> Gracias ${localStorage.getItem("nombre")} por su compra: </h3>
        <ul>
            ${comprado.map(c => `<li>${c.nombre} - ${c.precio}</li>`).join("")}
        </ul>
        <p> Total a pagar: $${total}</p>
    `
    localStorage.removeItem("comprado")
    localStorage.removeItem("total")
    /*puse estas 2 lineas al final porque cuando paso de una pag a otra se me pierde el carrito si no le di a terminar compra.
    Entonces preferi sacarlas de localStorage una vez que el usuario le de a termminar de comprar. Y que se reinicie
    el proceso de compra*/
}