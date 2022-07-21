// Clase Producto:

class Producto{
    constructor(id, nombre, tipo, stock, precio, oferta = 'no'){
        this.id = id
        this.nombre = nombre;
        this.tipo = tipo;
        this.stock = stock;
        this.precio = precio;
        this.oferta = oferta;
    }
    
    // Metodo para calcular precio final con descuento:

    descuento(porcentaje) {
        let nuevoTotal = this.precio - ((porcentaje / 100) * this.precio )
        this.precioOferta = nuevoTotal
        return this.precioOferta
    }

}

// Función muestra de ofertas en pagina principal:

const mostrarProductosOferta = function(arrayProducto, elementoHTML){
    for(let producto of arrayProducto){

        if(producto.precioOferta != ""){
            elementoHTML.innerHTML += `
                
                <div class="card cardFlex" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="Cargar Imagen">
                    <div class="card-body">
                    <h5 class="card-subtitle mb-2 text-muted">Nombre: ${producto.nombre}</h5>
                    <p class="card-text">ID: ${producto.id}</p>
                    <p class="card-text">Tipo: ${producto.tipo}</p>
                    <p class="card-text">Stock: ${producto.stock}</p>
                    <p class="card-text">Precio Anterior: ${producto.precio}</p>
                    <p class="card-text">Precio Actual: ${producto.precioOferta}</p>
                    <button class="btn btn-primary">Agregar al Carrito</button>
                    </div>
                </div>
                ` 
        }
        
    } 
}

// Función para aplicar descuento a producto

function aplicarDescuento(arrayProductos){
    let idIngresado = parseInt(prompt('Ingrese el ID del producto al cual desea aplicarle el descuento: '))
    let porcentaje = parseInt(prompt('Ingrese el porcentaje de descuento a aplicar: '))
    const productoModificar = arrayProductos.find((producto) => producto.id === idIngresado)

    if(productoModificar != undefined){
        let nuevoPrecio = productoModificar.descuento(porcentaje)
        console.log(nuevoPrecio)
        productoModificar.precioOferta = nuevoPrecio
    }
    console.log(productoModificar)
}


// Creacion de arreglo para cargar objetos:
arrayProductos = [];

// Carga de obejtos a arreglo productos:
arrayProductos.push(new Producto(1, 'Matecito', 'mate', 7, 45, 'si'))
arrayProductos.push(new Producto(2, 'Lugares', 'yerba', 1, 32))
arrayProductos.push(new Producto(3, 'Calabaza', 'mate', 7, 56, 'si'))
arrayProductos.push(new Producto(4, 'Diaz', 'yerba', 7, 250))
arrayProductos.push(new Producto(5, 'Bombil', 'bombilla', 1, 19, 'si'))
arrayProductos.push(new Producto(6, 'Maderita', 'mate', 2, 27))
arrayProductos.push(new Producto(7, 'Super Bombilla', 'bombilla', 8, 22, 'si'))
arrayProductos.push(new Producto(8, 'Matero', 'mate', 4, 75))
arrayProductos.push(new Producto(9, 'Taragüi', 'yerba', 7, 460))
arrayProductos.push(new Producto(10, 'Premium Calabaza', 'mate', 3, 720))
arrayProductos.push(new Producto(11, 'Rosamonte', 'yerba', 12, 650, 'si'))
arrayProductos.push(new Producto(12, 'Bombillita', 'bombilla', 6, 32))
arrayProductos.push(new Producto(13, 'Stanley', 'termo', 2, 15000))
arrayProductos.push(new Producto(14, 'Lumilagro', 'termo', 16, 3000))

// Captura de elemento HTML para mostrar productos en HTML:
let productosTarjetas = document.getElementById('tarjetasProductos')


// Captura de elemento por ID para agregar evento "input" y buscar producto deseado por el usuario:
let elementoBuscar = document.getElementById("busquedaProductos")
elementoBuscar.addEventListener('input', () => {
    for(producto of arrayProductos){
        if(elementoBuscar.value === producto.tipo){

            // Agrego a HTML mediante DOM las tarjetas de los productos que coinciden con la búsqueda del usuario:
            productosTarjetas.innerHTML += `
                
                <div class="card cardFlex animacionTarjeta" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-subtitle mb-2 text-muted">Nombre: ${producto.nombre}</h5>
                    <p class="card-text">Tipo: ${producto.tipo}</p>
                    <p class="card-text">Stock: ${producto.stock}</p>
                    <p class="card-text">Precio: ${producto.precio}</p>
                    <button class="btn btn-primary" id="botonAgregar">Agregar al Carrito</button>
                    </div>
                </div>
                ` 
        }
    }
})

// Evento "click" en boton para borrar de la pagina principal las tarjetas de productos buscados:
let borrarTarjetas = document.getElementById("reestablecer")
borrarTarjetas.addEventListener('click', () => {
    for(producto of arrayProductos){
            productosTarjetas.innerHTML = `` 
        }
})

    