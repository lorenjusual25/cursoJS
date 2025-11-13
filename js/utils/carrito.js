import { setItems } from "./storage.js"

export function agregarCarrito (producto, compradoActual, totalActual) {
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
            comprado,
            total
        }
    }
    //si aun no existe ese producto en el carrito, se agrega a comprado
    else {
        //podria agregar la validacion de stock (si es que no hay stock) pero no sé

        comprado = [...compradoActual, {...producto, cant: 1 /*Se le asigna a cada producto el campo cant con valor 1*/}]
        //y esto se hace asi para que el array original sea inmutable
        total = totalActual + producto.precio
        setItems(comprado,total)
        return {
            success: true,
            comprado,
            total
        }
    }
}