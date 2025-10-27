//variables
const btnInicio = document.getElementById("btnInicio").addEventListener("click",() =>{
    location.href = "../pages/inicio.html"
})

let span = document.getElementById("username")

let comprado = JSON.parse(localStorage.getItem("comprado")) || [] //aprendido del profe

let total = parseInt(localStorage.getItem("total")) || 0 //Uso parseInt por que los precios que puse son todos enteros
const ofertasProductos = document.getElementById("ofertasProductos")

let productosEnOferta = [
    {
        nombre: "Sanguche-completo",
        precio: 2800,
        categoria: "Comida"
    },
    {
        nombre: "Lasagna-casera",
        precio: 4200,
        categoria: "Comida"
    },
    {
        nombre: "Combo-dulce",
        precio: 2200,
        categoria: "Comida"
    }
]
let output = document.getElementById("output")
//pequeña logica para poner el nombre en el h1
span.innerText = localStorage.getItem("nombre")?localStorage.getItem("nombre"):"cliente"

//logica para listar cada producto en oferta (igual que el de index)
productosEnOferta.forEach(p => {
    const li = document.createElement("li")
    li.className = "ofertaLi"
    li.innerHTML = `<p>Producto: ${p.nombre} - Precio: $${p.precio} - Categoria: ${p.categoria}</p>`
    const img = document.createElement("img")
    img.src = `../assets/${p.nombre}.png`
    img.alt = `imagen de ${p.nombre}`
    img.className = "ofertaImg"
    const button = document.createElement('button')
    button.className = 'agregarBtn'
    button.innerText = "Agregar al carrito"
    button.addEventListener("click",() => agregarCarrito(p))
    li.appendChild(img)
    li.appendChild(button)
    ofertasProductos.appendChild(li)
})

function agregarCarrito (productoElejido) {
    comprado.push(productoElejido)
    total+=productoElejido.precio
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
function actualizarVista () {
    let mostrarMenu = document.getElementById("mostrarMenu")
    mostrarMenu.innerHTML = ""
    output.innerHTML = ""
    output.innerHTML = `
        <h3> Gracias ${localStorage.getItem("nombre")?localStorage.getItem("nombre"):""} por su compra: </h3>
        <ul>
            ${comprado.map(c => `<li>${c.nombre} - ${c.precio}</li>`).join("")}
        </ul>
        <p> Total a pagar: $${total}</p>
    `
    localStorage.removeItem("nombre")
    localStorage.removeItem("comprado")
    localStorage.removeItem("total")
}