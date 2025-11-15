let nombre = "cliente"

let input = document.getElementById("usernameInput")

let botonGuardar = document.getElementById("usernameGuardar")

let boton = document.getElementById("irComprar")

input.addEventListener("input", function () {
    nombre = this.value
})

botonGuardar.addEventListener("click", () => {
    if (localStorage.getItem("nombre")) {
        Swal.fire({
            title: "Ya existe un nombre guardado",
            text: "Desea sobrescribirlo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Sí"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem("nombre", nombre)
                Swal.fire({
                    title: "Guardado!",
                    text: "El nombre de usuario ha sido guardado.",
                    icon: "success"
                });
            }
        })
    }
    else {
        localStorage.setItem("nombre", nombre)
        Swal.fire({
            title: "Guardado!",
            text: "El nombre de usuario ha sido guardado.",
            icon: "success"
        });
    }
})

boton.addEventListener("click",() => {
    location.href = "pages/productos.html"
})