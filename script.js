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

class Usuario{
    constructor(usuario, password, email, ciudad, provincia){
        this.usuario = usuario;
        this.password = password;
        this.email = email
        this.ciudad = ciudad;
        this.provincia = provincia;
    }
}

// Función muestra de ofertas en pagina principal:

const mostrarProductosOferta = function(arrayProducto, elementoHTML){
    for(let producto of arrayProducto){

        if(producto.oferta == 'si'){
            elementoHTML.innerHTML += `
                
                <div class="card cardFlex" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="Cargar Imagen">
                    <div class="card-body">
                    <h5 class="card-subtitle mb-2 text-muted">Nombre: ${producto.nombre}</h5>
                    <p class="card-text">ID: ${producto.id}</p>
                    <p class="card-text">Tipo: ${producto.tipo}</p>
                    <p class="card-text">Stock: ${producto.stock}</p>
                    <p class="card-text">Precio: ${producto.precio}</p>
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
let arrayProductos = [];
let arrayCarrito = [];
let arrayUsuario = [];

// Recuperacion de usuarios guardados en local storage(junto con la conversion a objetos par apoder manipular) o creacion de "usuarios" en localStorage 
// en caso de que se ingrese por primera vez:
// Reemplazar por ternario

localStorage.getItem("usuarios") ? arrayUsuario = JSON.parse(localStorage.getItem("usuarios")) : localStorage.setItem("usuarios", JSON.stringify(arrayUsuario))

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
let elementoBuscar = document.getElementById("barraBusqueda")

if(elementoBuscar != null){
    elementoBuscar.addEventListener('submit', (event) => {
        event.preventDefault()
        let elemento = document.getElementById("valorBuscado").value

        for(let producto of arrayProductos){
            if(elemento === producto.tipo){
                
                // Agrego a HTML mediante DOM las tarjetas de los productos que coinciden con la búsqueda del usuario:
                productosTarjetas.innerHTML += `
                    <div class="card cardFlex m-3" style="width: 18rem;">
                        <img src="./img/mateProducto.jpeg" class="card-img-top" alt="imagen mate">
                        <div class="card-body">
                        <h5 class="card-subtitle mb-2 text-muted">Nombre: ${producto.nombre}</h5>
                        <p class="card-text">Tipo: ${producto.tipo}</p>
                        <p class="card-text">Stock: ${producto.stock}</p>
                        <p class="card-text">Precio: ${producto.precio}</p>
                        <button class="btn btn-primary btnVerProducto">Agregar al Carrito</button>
                        </div>
                    </div>
                    ` 
            }
        }
    })
}


// Evento "click" en boton para borrar de la pagina principal las tarjetas de productos buscados:
let borrarTarjetas = document.getElementById("reestablecer")

//Uso de operador logico &&

borrarTarjetas != null && borrarTarjetas.addEventListener('click', () => {
        for(let producto of arrayProductos){
                productosTarjetas.innerHTML = `` 
            }
    })


// Evento para guardar mediante formulario nuevos usuarios

let formularioUsuario = document.getElementById("formularioRegistro");
let mensajeRegistro = document.getElementById("registroExito")

if(formularioUsuario != null){
    formularioUsuario.addEventListener("submit", (event) =>{
        event.preventDefault()
        let usuario = document.getElementById("inputUsuario").value
        let password = document.getElementById("inputPassword").value
        let email = document.getElementById("inputEmail").value
        let ciudad = document.getElementById("inputCiudad").value
        let provincia = document.getElementById("inputProvincia").value
    
        const nuevoUsuario = new Usuario(usuario, password, email, ciudad, provincia)
        arrayUsuario.push(nuevoUsuario)

        // Guardado en localStorage el array con nuevo usuario registrado:
        localStorage.setItem("usuarios", JSON.stringify(arrayUsuario))
        formularioUsuario.reset()

        // Mensaje de registro correctamente
        mensajeRegistro.innerHTML = `
        <p>Usted se ha registrado correctamente</p>
        `
        mensajeRegistro.classList.add("registroExitoso")

    })
}


// Evento para buscar en array de usuarios(recuperado del localStorage) y poder iniciar sesión(si el usuario y contraseña estan correctos)

let ingresoUsuario = document.getElementById("formularioIngreso")
let ingresoMensaje = document.getElementById("mensajeInicioSesion")

if(ingresoUsuario){
    ingresoUsuario.addEventListener("submit", (event) =>{
        event.preventDefault()
        let usuarioIngreso = document.getElementById("inputUsuarioIngreso").value
        let usuarioPassword = document.getElementById("inputPasswordIngreso").value

        let usuarioRegistrado = arrayUsuario.find(usuario => usuario.usuario == usuarioIngreso)

            // Desestructuracion objeto usuarioRegistrado
            let{usuario} = usuarioRegistrado

            if(usuarioRegistrado && usuarioRegistrado.password === usuarioPassword){
                ingresoMensaje.innerHTML = `
                <p>Bienvenido ${usuario}, has iniciado la sesión.</p>
                `
                ingresoMensaje.classList.add("mensajeInicioSesion")
            }else{
                ingresoMensaje.innerHTML = `
                <p>Usuario o contraseña incorrectas</p>
                `
                ingresoMensaje.classList.add("mensajeInicioIncorrecto")
            }
    })
}

// Prueba para ver el total de usuarios registrados en el array
console.log(arrayUsuario)