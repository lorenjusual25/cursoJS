let nombre = "cliente"

let input = document.getElementById("usernameInput")

let botonGuardar = document.getElementById("usernameGuardar")

let boton = document.getElementById("irComprar")

input.addEventListener("input", function () {
    nombre = this.value
})

botonGuardar.addEventListener("click", () => {
    alert("Nombre guardado: " + nombre)
    localStorage.setItem("nombre",nombre)
})

boton.addEventListener("click",() => {
    location.href = "/pages/inicio.html"
})