//variables
let confirma;
let seAgregoAlgo = true
let total = 0
const nombre = prompt("Ingresar tu nombre")
let opcion = prompt(`Hola ${nombre} bienvenido a nuestra tienda de comida, aca tenes uno de nuestro productos a la venta: \n
    1. Hamburguesa - $5000 \n
    2. Pizza - $3000 \n
    3. Pancho - $2000 \n
    4. Gaseosa - $1000 \n
    Otra tecla para salir`)
let opcionNumero = parseInt(opcion)
const comidas = [
    {
        nombre: "Hamburguesa",
        precio: 5000
    },
    {
        nombre: "Pizza",
        precio: 3000
    },
    {
        nombre: "Pancho",
        precio: 2000
    },
    {
        nombre: "Gaseosa",
        precio: 1000
    }
]
//funciones
function mostrarMenu() {
    opcion = prompt(`Agrega otro producto o presiona otra tecla para salir: \n
    1. Hamburguesa - $5000 \n
    2. Pizza - $3000 \n
    3. Pancho - $2000 \n
    4. Gaseosa - $1000 \n`)
    opcionNumero = parseInt(opcion)
    elegir(opcion)
}
function elegir(opcion) {
    switch (opcion) {
        case "1":
            total += comidas[opcionNumero - 1].precio;
            break;
        case "2":
            total += comidas[opcionNumero - 1].precio;
            break;
        case "3":
            total += comidas[opcionNumero - 1].precio;
            break;
        case "4":
            total += comidas[opcionNumero - 1].precio;
            break;
        default:
            seAgregoAlgo = false
            console.log("Saliendo de la elección...")
    }
}
//programa principal
elegir(opcion)
if (seAgregoAlgo) {
    confirma = confirm("¿Queres agregar algo mas?")
    while (confirma) {
        mostrarMenu()
        confirma = confirm("¿Queres agregar algo mas?")
    }
}
console.log(`El total de tu compra es: $${total}`)