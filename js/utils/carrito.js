import { setItems, getComprado, getTotal } from "./storage.js"

export function agregarCarrito (producto) { //tuve que elimnar de los parametros a compradoActual y totalActual porque no se quedaban con los ultimos datos
    const compradoActual = getComprado() //y no sé porqué
    const totalActual = getTotal()
    let comprado;
    let total;
    const productoExistente = compradoActual.find(p => p.nombre === producto.nombre)
    //si el producto ya existe en el carrito
    if (productoExistente) {
        //nos fijamos si la cantidad de veces comprado no supera el stock
        if (productoExistente.cant >= producto.stock) {
            //si supera, devolvemos de que no se pudo y mandamos un msg
            return {
                success:false,
                message: `Limite de stock alcanzado para ${producto.nombre}`
            }
        }
        //si el producto existe y no supera el stock, lo buscamos en el array original
        comprado = compradoActual.map(p => {
            if (p.nombre === producto.nombre) {
                //una vez encontrado, se le suma 1 a cant y no se agrega otro producto igual al carrito
                return {
                    ...p,
                    cant: p.cant+1
                }
            }
            //si no es el producto que buscamos, se devuelve normal
            return p
        })
        total = totalActual + producto.precio
        setItems(comprado,total)
        return {
            success:true,
            message: `Se ha agregado 1 unidad de ${producto.nombre} al carrito.`,
            comprado,
            total
        }
    }
    //si aun no existe ese producto en el carrito, se agrega a comprado
    else {
        //podria agregar la validacion de stock (si es que no hay stock) pero no sé

        comprado = [...compradoActual, {...producto, cant: 1}] /*Se le asigna a cada producto el campo cant con valor 1*/
        //y esto se hace asi para que el array original sea inmutable
        total = totalActual + producto.precio
        setItems(comprado,total)
        return {
            success: true,
            message: `${producto.nombre} agregado al carrito.`,
            comprado,
            total
        }
    }
}
//para la funcion de eliminar 1 cantidad intente seguir la misma logica que la funcion de agregar
export function eliminar1Producto (producto) {
    const compradoActual = getComprado()
    const totalActual = getTotal()
    let comprado;
    let total;
    const productoExistente = compradoActual.find(p => p.nombre === producto.nombre)
    if (productoExistente) {
        //si el producto existe y su cantidad es mayor a 1
        if (productoExistente.cant > 1) {
            //lo buscamos en el array actual y lo mandamos a la variable "comprado"
            comprado = compradoActual.map (p => {
                if (p.nombre === producto.nombre) {
                    return {
                        ...p,
                        cant: p.cant - 1
                    }
                }
                return p
            })
        }
        //si cant es menor a 1 (es decir solo puede ser 0 en otro caso), lo borro fisicamente
        else {
            comprado = compradoActual.filter(p => p.nombre !== producto.nombre)
        }
        total = totalActual - producto.precio
        setItems(comprado,total)
        return {
            success:true,
            message: `Se ha eliminado 1 unidad de ${producto.nombre} del carrito.`,
            comprado,
            total
        }
    }
    else { 
        return {
            success:false,
            message: `${producto.nombre} no encontrado`
        }
    }
}

export function eliminarTotal (producto) {
    const compradoActual = getComprado()
    const totalActual = getTotal()
    let comprado;
    let total;
    const productoExistente = compradoActual.find(p => p.nombre === producto.nombre)
    if (productoExistente) {
        total = totalActual - (productoExistente.precio * productoExistente.cant)
        comprado = compradoActual.filter(p => p.nombre !== producto.nombre)
        setItems(comprado,total)
        return {
            success: true,
            message: `${producto.nombre} eliminado`,
            comprado,
            total
        }
    }
    else {
        return {
            success:false,
            message: `${producto.nombre} no encontrado`
        }
    }
}

export function limpiarCarrito () {
    setItems([],0)
    return {
        success: true,
        message: "Carrito vaciado correctamente",
        comprado: [],
        total: 0
    }
}