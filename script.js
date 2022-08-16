// Clase Producto:

class Producto{
    constructor(nombre, tipo, stock, precio, marca, imagen){
        this.nombre = nombre;
        this.tipo = tipo;
        this.stock = stock;
        this.precio = precio;
        this.marca = marca
        this.imagen = imagen;
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

// Creacion de arreglo para cargar objetos:
let arrayProductos = [];
let arrayCarrito = [];
let arrayUsuario = [];

// Prueba fetch JSON local para carga de productos con funcion asincronica:

async function mostrarProductos(){
    const productos = await fetch("../json/productos.json")
    const productosParse = await productos.json()
    return productosParse
}

// Prueba fetch JSON local para carga de productos con clases en arrayProductos:

fetch("../json/productos.json")
.then(response => response.json())
.then(productos => productos.forEach(producto => {
    ({tipo, nombre, marca, peso, precio, stock, img} = producto)
    arrayProductos.push(new Producto(nombre, tipo, stock, precio, marca, img))
}))

// Captura de elemento por ID para agregar evento "input" y buscar producto deseado por el usuario:
let elementoBuscar = document.getElementById("barraBusqueda")

if(elementoBuscar != null){
    elementoBuscar.addEventListener('submit', (event) => {
        event.preventDefault()
        let elemento = document.getElementById("valorBuscado").value

        arrayProductos.forEach((producto, index) => {
            if(elemento === producto.tipo){
                
                // Agrego a HTML mediante DOM las tarjetas de los productos que coinciden con la búsqueda del usuario:
                productosTarjetas.innerHTML += `
                    <div class="card cardFlex m-3" id="producto${index}" style="width: 18rem;">
                        <img src="./img/${producto.imagen}" class="card-img-top img-tarjeta-producto" alt="">
                        <div class="card-body">
                            <h5 class="card-subtitle mb-2 text-muted">${producto.nombre}</h5>
                            <p class="card-text">Marca: ${producto.marca}</p>
                            <p class="card-text">Tipo: ${producto.tipo}</p>
                            <p class="card-text">Stock: ${producto.stock}</p>
                            <p class="card-text">Precio: ${producto.precio}</p>
                            <button class="btn btn-primary btnVerProducto">Agregar al Carrito</button>
                        </div>
                    </div>
                    ` 
            }
            
        });
    })
}


console.log(arrayProductos)

// Mostrar dinamicamente productos en pagina "Mostrar Productos"

let productosMostrar = document.getElementById("mostrarProductos")

console.log(arrayProductos)

mostrarProductos().then(productos =>{

    productos.forEach((producto, index) => { 
        if(productosMostrar){
            productosMostrar.innerHTML += `
                <div class="card cardFlex m-3" id="producto${index}" style="width: 18rem;">
                    <img src="../img/${producto.img}" class="card-img-top img-tarjeta-producto" alt="imagen mate">
                    <div class="card-body">
                        <h5 class="card-subtitle mb-2 text-muted">${producto.nombre}</h5>
                        <p class="card-text">Marca: ${producto.marca}</p>
                        <p class="card-text">Tipo: ${producto.tipo}</p>
                        <p class="card-text">Stock: ${producto.stock}</p>
                        <p class="card-text">Precio: ${producto.precio}</p>
                        <button class="btn btn-primary">Agregar al Carrito</button>
                    </div>
                </div>
            ` 
    }});
})


// Programa para agregar productos al carrito mediante evento "click"

mostrarProductos().then(productos =>{

    if(productosMostrar){
    
        arrayProductos.forEach((producto, index) => {
            document.getElementById(`producto${index}`).lastElementChild.lastElementChild.addEventListener("click", () => {
                let productoAgregar = producto
                arrayCarrito.push(productoAgregar)
        
                // Toastify para indicar que el producto se agrego al carro
                Toastify({
                    text: "Producto agregado al Carrito",
                    duration: 5000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
            })
        });
    }
})

// Funcion agregar ID automaticamente a producto

const agregarIdProducto = function(array){
    array.forEach((producto, index) => {
        producto.id = index
    });
}

// Recuperacion de usuarios guardados en local storage(junto con la conversion a objetos par apoder manipular) o creacion de "usuarios" en localStorage 
// en caso de que se ingrese por primera vez:

localStorage.getItem("usuarios") ? arrayUsuario = JSON.parse(localStorage.getItem("usuarios")) : localStorage.setItem("usuarios", JSON.stringify(arrayUsuario))

// Agregado automatico de ID a productos cargados
agregarIdProducto(arrayProductos)


// Captura de elemento HTML para mostrar productos en HTML:
let productosTarjetas = document.getElementById('tarjetasProductos')



// Evento "click" en boton para borrar de la pagina principal las tarjetas de productos buscados:
let borrarTarjetas = document.getElementById("reestablecer")

//Uso de operador logico &&

borrarTarjetas != null && borrarTarjetas.addEventListener('click', () => {
        arrayProductos.forEach(() => {
            productosTarjetas.innerHTML = ``
        });
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

        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones !',
            text: 'Usted se ha registrado de manera exitosa',
        })
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

        
        if(usuarioRegistrado && usuarioRegistrado.password === usuarioPassword){
                // Desestructuracion objeto usuarioRegistrado
                let{usuario} = usuarioRegistrado
                Swal.fire({
                    icon: 'success',
                    title: `Bienvenido ${usuario}!`,
                    text: 'Usted ha iniciado sesion de manera exitosa',
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Contraseña o usuario incorrectos',
                  })
            }
    })
}



// console.log(arrayProductos)