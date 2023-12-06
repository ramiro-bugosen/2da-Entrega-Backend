export const productCreateError = ()=>{
    return 
    `
    Todos los campos son obligatorios:
    -title
    -description
    -code
    -category
    -thumbnail
    -stock
    -status
    `
}

export const addToCartError = ()=>{
    return
    `
    No se ha podido agregar el producto al carrito, por favor, verifica el stock.
    `
}

export const updateProductError = ()=>{
    return
    `
    No se pudo actualizar el producto, verifica que todo los campos modificados sean correctos
    `
}
