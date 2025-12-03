//const { createElement } = require("react");
let tituloDocumento = document.getElementById("textoDocumento")
let cuerpo = document.getElementById("cuerpo")
let cabecilla = document.getElementById("cabecera")
let boton = document.getElementById("aquiHayUnBoton")
let barraBusqueda = document.getElementById("barraDeBusqueda")
let controlarVerInfo = false
let tipoUsuario 

let miCarrito = []
let verAnadirAlCarroBoton = true
let perfilPropio = true



function ocultarBarraBusqueda(){
    barraBusqueda.firstElementChild.nextElementSibling.setAttribute("class", "d-none")
    barraBusqueda.firstElementChild.setAttribute("class", "d-none")
    barraBusqueda.parentNode.parentElement.setAttribute("class", "d-none")
}

function verCarrito(event){
    let nodoClick
    if(event){
        nodoClick = event.target

        if(nodoClick.id == "botonCarro"){

            miCarrito = JSON.parse(localStorage.getItem("carrito")) || []
            let obtenerCarro = document.getElementById("carrito")

                let preciosAcumular = 0
                let div = document.createElement("div")

                let p = document.createElement("p")
                p.textContent = "TOTAL: "
                p.setAttribute("class", "me-3")

                let total = document.createElement("p")


                for (let i = 0; i < miCarrito.length; i++) {
                        let precioStr = miCarrito[i].precio;   
                        let limpio = precioStr.replace("€", "").trim();
                        let precio = parseFloat(limpio);
                        preciosAcumular +=  precio
                        console.log(precio); 
                }

                total.textContent = preciosAcumular + "€"
                total.setAttribute("id", "precioTotalCarro")
                total.setAttribute("class", preciosAcumular)
                div.setAttribute("class", "d-flex justify-content-center mt-3")

                div.appendChild(p)
                div.appendChild(total)

                obtenerCarro.appendChild(div)

                let botonComprarTodo = document.createElement("button")
                botonComprarTodo.textContent = "Comprar todo"
                botonComprarTodo.setAttribute("class", "mb-3 btn btn-warning btn-xs d-block mx-auto")
                botonComprarTodo.setAttribute("id", "botonCoprarTodo")
                //botonComprarTodo.setAttribute("class", "col-md-4 botonQuitarJuego")
                //botonComprarTodo.setAttribute("id", i)
                obtenerCarro.appendChild(botonComprarTodo)

            if(obtenerCarro.className == "row text-light bg-dark mb-5 true"){
            let otroDiv = document.createElement("div")
            otroDiv.setAttribute("class", "row d-flex justify-content-center mb-3")
            for (let i = 0; i < miCarrito.length; i++) {
                let raya = document.createElement("hr")
                raya.setAttribute("class", "hr hr-blurry text-light mb-1 mt-1 col-md-12")

                let raya2 = document.createElement("hr")
                raya2.setAttribute("class", "hr hr-blurry text-light mb-1 mt-1 col-md-12")

                otroDiv.appendChild(raya)

                let pElementGame = document.createElement("p")
                pElementGame.textContent = miCarrito[i].nombre
                pElementGame.setAttribute("class", "col-md-4 mt-2")
                pElementGame.setAttribute("id", miCarrito[i].idUsuarioVendedor)
                pElementGame.setAttribute("name", miCarrito[i].id)
                otroDiv.appendChild(pElementGame)

                let pElementPrecio = document.createElement("p")
                pElementPrecio.textContent = miCarrito[i].precio
                pElementPrecio.setAttribute("class", "col-md-4 mt-2 precio")
                pElementPrecio.setAttribute("id", miCarrito[i].precio)
                otroDiv.appendChild(pElementPrecio)

                let boton = document.createElement("button")
                boton.textContent = "X"
                boton.setAttribute("class", "col-md-4 botonQuitarJuego")
                boton.setAttribute("id", i)
                otroDiv.appendChild(boton)
                
                otroDiv.appendChild(raya2)
            }
            obtenerCarro.appendChild(otroDiv)
            let botonQuitarJuego = document.getElementsByClassName("botonQuitarJuego")  

            for (let i = 0; i < botonQuitarJuego.length; i++) {
                botonQuitarJuego[i].addEventListener("click", quitarJuegoDelCarri)
            }
            
            obtenerCarro.className = "row text-light border border-2 bg-dark border-warning mb-5"
        }
        else{
            let nodoHijo = obtenerCarro.firstElementChild

            while(nodoHijo != null){
                let nodoSiguiente = nodoHijo.nextElementSibling
                obtenerCarro.removeChild(nodoHijo)
                nodoHijo = nodoSiguiente
            }
            obtenerCarro.className = "row text-light bg-dark mb-5 true"

        }
        }
    }
}

function quitarJuegoDelCarri(event){
    let nodoClick
    if(event){
        nodoClick = event.target

        miCarrito.splice(nodoClick.id, 1);
        localStorage.setItem("carrito", JSON.stringify(miCarrito))

        console.log(nodoClick.id)

        nodoClick.parentNode.removeChild(nodoClick.previousElementSibling)
        nodoClick.parentNode.removeChild(nodoClick.previousElementSibling)
        nodoClick.parentNode.removeChild(nodoClick.previousElementSibling)
        nodoClick.parentNode.removeChild(nodoClick.nextElementSibling)
        nodoClick.parentNode.removeChild(nodoClick)

        let precioTotal = document.getElementById("precioTotalCarro")
        let preciosAcumular = 0
        for (let i = 0; i < miCarrito.length; i++) {
            let precioStr = miCarrito[i].precio;   
            let limpio = precioStr.replace("€", "").trim();
            let precio = parseFloat(limpio);
            preciosAcumular +=  precio
            console.log(precio); 
        }
        precioTotal.textContent = preciosAcumular + "€"
    }
}

document.body.addEventListener('click', crearFormmularioJuegoNuevo)
document.body.addEventListener('click', crearFormmularioUsuarioNuevo)
document.body.addEventListener('click', cambiarPagina)
//cuerpo.addEventListener('click', añadirAlCarro)

let usuarioComprador

function limpiarPantalla(){
    while (cuerpo.firstChild) {
        cuerpo.removeChild(cuerpo.firstChild);
    }
}

function barraBusquedaCrear(){
    barraBusqueda.innerHTML = '<input type="text" class="form-control" placeholder="Buscar juego" style="max-width: 250px;"><button id="buscar" class="btn btn-warning">Buscar</button>'
    barraBusqueda.parentNode.parentElement.setAttribute("class", "bg-dark pt-2 pb-2")
}

function botonCrear(){
    boton.innerHTML = '<button id="juegoNuevo" class="btn btn-warning mb-5">Subir juego nuevo</button>'
}

async function cambiarPagina(event){
    let nodoClick
    if(event){
        nodoClick = event.target
        if(nodoClick.textContent == "JUEGOS"){
            barraBusquedaCrear()
            nodoClick.setAttribute("class", "col-md-3 text-warning")
            nodoClick.nextElementSibling.setAttribute("class", "col-md-3")
            nodoClick.nextElementSibling.nextElementSibling.setAttribute("class", "col-md-3")
            nodoClick.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute("class", "col-md-3")
            cuerpo.removeChild(cuerpo.firstElementChild)
            barraBusqueda.firstElementChild.nextElementSibling.setAttribute("class", "btn btn-warning")
            barraBusqueda.firstElementChild.setAttribute("class", "form-control")
            document.getElementById("juegoNuevo").setAttribute("class", "btn btn-warning")

            barraBusqueda.firstElementChild.placeholder = "Buscar juego"
            mostrarTodosLosJuegos()
            document.getElementById("juegoNuevo").textContent = "Subir juego nuevo"
        }
        if(nodoClick.textContent == "USUARIOS"){
            barraBusquedaCrear()
            nodoClick.setAttribute("class", "col-md-3 text-warning")
            nodoClick.previousElementSibling.setAttribute("class", "col-md-3")
            nodoClick.nextElementSibling.setAttribute("class", "col-md-3")
            nodoClick.nextElementSibling.nextElementSibling.setAttribute("class", "col-md-3")

            perfilPropio = false

            barraBusqueda.firstElementChild.nextElementSibling.setAttribute("class", "btn btn-warning")
            barraBusqueda.firstElementChild.setAttribute("class", "form-control")
            document.getElementById("juegoNuevo").setAttribute("class", "btn btn-warning")

            cuerpo.removeChild(cuerpo.firstElementChild)
            
            barraBusqueda.firstElementChild.placeholder = "Buscar usuario"
            todosLosUsuarios()  
            document.getElementById("juegoNuevo").textContent = "Subir usuario nuevo"
        }
        if(nodoClick.textContent == "ETIQUETAS"){
            ocultarBarraBusqueda()
            nodoClick.setAttribute("class", "col-md-3 text-warning")
            nodoClick.previousElementSibling.setAttribute("class", "col-md-3")
            nodoClick.nextElementSibling.setAttribute("class", "col-md-3")
            nodoClick.previousElementSibling.previousElementSibling.setAttribute("class", "col-md-3")

            verEtiquetas()
        } 
        if(nodoClick.textContent == "PERFIL"){
            cabecilla.firstElementChild.textContent = "PERFIL"
            cabecilla.innerHTML = ""
            perfilPropio = true
            nodoClick.setAttribute("class", "col-md-3 text-warning")
            nodoClick.previousElementSibling.setAttribute("class", "col-md-3")
            nodoClick.previousElementSibling.previousElementSibling.setAttribute("class", "col-md-3")
            perfilDelUsuario(localStorage.getItem("id_usuario"))
            
            if(localStorage.getItem("cabeceras") == "JUEGOS,USUARIOS,ETIQUETAS,PERFIL"){
            //cabecilla.removeChild(cabecilla.firstElementChild)
            nodoClick.setAttribute("class", "col-md-3 text-warning")
            nodoClick.previousElementSibling.setAttribute("class", "col-md-3")
            nodoClick.previousElementSibling.previousElementSibling.setAttribute("class", "col-md-3")
            nodoClick.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute("class", "col-md-3")
            document.getElementById("juegoNuevo").setAttribute("class", "d-none")
            }
            if(localStorage.getItem("cabeceras") == "TUS JUEGOS,ESTADISTICAS,PERFIL"){
            //cabecilla.removeChild(cabecilla.firstElementChild)
            aquiHayUnBoton.removeChild(aquiHayUnBoton.firstElementChild)
            nodoClick.setAttribute("class", "col-md-4 text-warning")
            nodoClick.previousElementSibling.setAttribute("class", "col-md-4")
            nodoClick.previousElementSibling.previousElementSibling.setAttribute("class", "col-md-4")
            //barraBusqueda.firstElementChild.nextElementSibling.setAttribute("class", "d-none")
            //barraBusqueda.firstElementChild.setAttribute("class", "d-none")
            //document.getElementById("juegoNuevo").setAttribute("class", "d-none")
            }
            else{
           // nodoClick.setAttribute("class", "col-md-3 text-warning")
            //nodoClick.previousElementSibling.setAttribute("class", "col-md-3")
            //nodoClick.previousElementSibling.previousElementSibling.setAttribute("class", "col-md-3")
            //perfilDelUsuario(localStorage.getItem("id_usuario"))
            }
        }
        if(nodoClick.textContent == "TIENDA"){
           // cuerpo.removeChild(cuerpo.firstElementChild)
            nodoClick.setAttribute("class", "col-md-3 text-warning")
            nodoClick.nextElementSibling.setAttribute("class", "col-md-3")
            nodoClick.nextElementSibling.nextElementSibling.setAttribute("class", "col-md-3")
            limpiarPantalla()
            mostrarTodosLosJuegosComprador()
        }
        if(nodoClick.textContent == "BIBLIOTECA"){
            ocultarBarraBusqueda()
            nodoClick.setAttribute("class", "col-md-3 text-warning")
            nodoClick.nextElementSibling.setAttribute("class", "col-md-3")
            nodoClick.previousElementSibling.setAttribute("class", "col-md-3")
            limpiarPantalla()
            binliotecaDelUsuario()

        }
        if(nodoClick.textContent == "Opciones del perfil"){
            opvionesDePerfil()
        }
        if(nodoClick.textContent == "TUS JUEGOS"){
            botonCrear()
            nodoClick.setAttribute("class", "col-md-4 text-warning")
            nodoClick.nextElementSibling.setAttribute("class", "col-md-4")
            nodoClick.nextElementSibling.nextElementSibling.setAttribute("class", "col-md-4")
            nodoClick.setAttribute("class", "col-md-4 text-warning")
            limpiarPantalla()
            juegosDessarollador()
        }
        if(nodoClick.textContent == "ESTADISTICAS"){
            botonCrear()
            nodoClick.setAttribute("class", "col-md-4 text-warning")
            nodoClick.nextElementSibling.setAttribute("class", "col-md-4")
            nodoClick.previousElementSibling.setAttribute("class", "col-md-4")
            limpiarPantalla()
            topJuegos()
        }
        if(nodoClick.textContent == "Buscar"){
            funcionBusqueda()
        }
        if(nodoClick.textContent == "Registrate aquí"){
            crearFormmularioUsuarioNuevo
        }
        if(nodoClick.textContent == "Cerrar Sesion"){
            miCarrito = JSON.parse(localStorage.getItem("carrito")) || []
            console.log(miCarrito.length)
            
            await borrarCarritoBackend()
            if(miCarrito.length != 0){
                await guardarCarritoBackend()
            }
            localStorage.clear()
            mostrarModal("Cerrando sesión")

            setTimeout(() => {
                window.location.reload();
            }, 3000);
            
        }
        if(nodoClick.textContent == "Comprar todo"){
            procesoComprarJuegos()
        }
        if(nodoClick.textContent == "Crear Etiqueta Nueva"){
            crearFormularioEtiqueta()
        }       
    }
}

async function borrarCarritoBackend() {
        try {
            const peticion = await fetch("https://owlstore.zapto.org/api/cart/borrar/" + localStorage.getItem("id_usuario"), {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

            if (peticion.ok) {
            } 
            else {
                const errorData = await peticion.json();
            }

        } catch (error) {
            console.error(error);
        }
    }

async function guardarCarritoBackend() {

    miCarrito = JSON.parse(localStorage.getItem("carrito")) || []
      
    if(miCarrito.length != 0){
    
    for (let i = 0; i < miCarrito.length; i++) {
        
    let datosCarritoFrontend = {
        nombre_juegp: miCarrito[i].nombre,
        precio_juego: miCarrito[i].precio,
        id_juego: miCarrito[i].id,
        idUsuarioVendedor: miCarrito[i].idUsuarioVendedor,
        id_usuario_comprador: localStorage.getItem("id_usuario")
    }

    try{

        let rep = await fetch("https://owlstore.zapto.org/api/cart/subir", {
            method: "POST",
            body: JSON.stringify(datosCarritoFrontend),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                "Content-type": "application/json"
            }
        });
            const datos = await rep.json();

            if (!rep.ok) {
                (datos.rep || "Error al procesar la solicitud");
                return;
            }

    }

    catch (error) {
        console.error('Error de red o parseo: ', error);
    }
    }
    }
    else{
        console.log("El carrito está vacío, no hay nada que guardar en el backend.");
    }
        
}

async function procesoComprarJuegos() {

    let carrito = document.getElementById("carrito")

    let nodoHijo = carrito.firstElementChild

    while(nodoHijo != null){
        let nodoSiguiente = nodoHijo.nextElementSibling
        carrito.removeChild(nodoHijo)
        nodoHijo = nodoSiguiente
    }

    carrito.className = "row text-light bg-dark mb-5 true"

  mostrarModal("Comprando juegos");

  // Recuperar billetera y carrito
  let miBilletera = parseFloat(localStorage.getItem("billeteraUsuario")) || 0;
  let miCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Calcular el total del carrito
  let precioTotal = miCarrito.reduce((total, item) => {
    const numero = parseFloat(item.precio.match(/\d+(\.\d+)?/)[0]);
    return total + numero;
  }, 0);

  // Validar fondos
  if (precioTotal > miBilletera) {
    alert("No tienes duficiente dinero!!!!");
    return;
  }

  // Recorrer el carrito y procesar cada juego
  for (let juego of miCarrito) {
    const numero = parseFloat(juego.precio.match(/\d+(\.\d+)?/)[0]);
    const idDelVendedor = juego.idUsuarioVendedor;
    const idDelJuego = juego.id;

    // 💰 Dar dinero al creador/vendedor
    try {
      let rep = await fetch(`https://owlstore.zapto.org/api/user/obtenerDineroVenta/${idDelVendedor}/${numero}`, {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          'Accept': 'application/json',
          "Content-type": "application/json"
        }
      });
      const datos = await rep.json();

      if (!rep.ok) {
        return;
      }
    } catch (error) {
      console.error('Error al darle dinero al creador:', error);
      return;
    }

    // 📈 Registrar venta del juego
    try {
      let rep = await fetch(`https://owlstore.zapto.org/api/game/venta/${idDelJuego}`, {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          'Accept': 'application/json',
          "Content-type": "application/json"
        }
      });
      const datos = await rep.json();

      if (!rep.ok) {
        return;
      }
    } catch (error) {
      console.error('Error al registrar venta del juego:', error);
      return;
    }
  }

  // 💸 Actualizar billetera del comprador
  let billeteraActual = parseFloat(localStorage.getItem("billeteraUsuario")) || 0;
  let resultado = parseFloat((billeteraActual - precioTotal).toFixed(2));
  if (resultado < 0) resultado = 0;

  localStorage.setItem("billeteraUsuario", resultado);

  let ruta = `https://owlstore.zapto.org/api/user/actuazilarBilletera/${localStorage.getItem("id_usuario")}`;
  let actualizarLaBilletera = { billetera: resultado };

  try {
    let rep = await fetch(ruta, {
      method: "PUT",
      body: JSON.stringify(actualizarLaBilletera),
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Accept': 'application/json',
        "Content-type": "application/json"
      }
    });
    const datos = await rep.json();

    if (!rep.ok) {
      return;
    }
  } catch (error) {
    console.error('Error al actualizar billetera:', error);
    return;
  }

  // 📚 Subir juegos a la biblioteca del usuario
  for (let juego of miCarrito) {
    let ruta2 = "https://owlstore.zapto.org/api/library/subir";
    let subirJuegosABiblioteca = {
      id_user: localStorage.getItem("id_usuario"),
      id_game: juego.id
    };

    try {
      let rep = await fetch(ruta2, {
        method: "POST",
        body: JSON.stringify(subirJuegosABiblioteca),
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          'Accept': 'application/json',
          "Content-type": "application/json"
        }
      });
      const datos = await rep.json();

      if (!rep.ok) {
        return;
      }
    } catch (error) {
      console.error('Error al subir juego a la biblioteca:', error);
      return;
    }
  }

  mostrarModal("¡Juegos comprados con éxito!");

  localStorage.removeItem("carrito");
}

//PARTE ADMIN

async function funcionBusqueda() {
    limpiarPantalla()

    let ruta

    if(barraBusqueda.firstElementChild.placeholder == "Buscar juego"){
        ruta = "https://owlstore.zapto.org/api/game/busqueda/" + barraBusqueda.firstElementChild.value
    }
    else{
        ruta = "https://owlstore.zapto.org/api/user/busqueda/" + barraBusqueda.firstElementChild.value
    }

    tituloDocumento.textContent = "Resultados de la búsqueda"

    const peticion = await fetch(ruta, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json'
        }
    });

    let datos = await peticion.json()

    if(barraBusqueda.firstElementChild.placeholder == "Buscar juego"){

    let contenedorDeCards = document.createElement("div") 
    contenedorDeCards.setAttribute("class", "row ms-5 me-5 pt-5")
    let raya = document.createElement("hr")
    raya.setAttribute("class", "hr hr-blurry text-light mb-5")
    contenedorDeCards.appendChild(raya)
    
    for(let i = 0; i < datos.length; i++){
        let card = document.createElement("div") 

        if(datos.length > 1){
            card.setAttribute("class", "col-md-4 d-flex justify-content-center")
        }
        else{
             card.setAttribute("class", "d-flex justify-content-center")
        }

        if(localStorage.getItem("cabeceras") == "JUEGOS,USUARIOS,ETIQUETAS,PERFIL"){

                    card.innerHTML = '<div onclick="infoJuegoUsuario('+ datos[i].id_juego + ')" class="card text-light border border-2 border-warning mb-5">'
        + '<div class="d-flex justify-content-center">'
        + '<img src="./img/controller.png" alt="Portada del videojuego ' + datos[i].nombre_juego + '" style="width: 250px; height: 200px;" class="card-img-top">'
        + '</div>'
        +   '<div class="card-body">'
        +   '<h5 class="card-title text-center">' + datos[i].nombre_juego + '</h5>'
        +   '<hr class="hr hr-blurry"/>'
        + '<div class="d-flex justify-content-center">'
        + '<p class = "cambiarColor">Ver Info</p>'
        + '</div>'
        +   '<a href="#" id="' + datos[i].id_juego +'" class="btn btn-warning d-flex justify-content-center rounded-pill mt-5 mb-2">Actualizar juego</a>'
        +   '<a href="#" class="btn btn-danger d-flex justify-content-center rounded-pill" onclick = "borrarJuego('+ datos[i].id_juego +')">Borrar juego</a>'
        +   '</div>'
        +   '</div>'

        }
        else{
                    card.innerHTML = '<div onclick="infoJuegoUsuario('+ datos[i].id_juego + ')" class="card text-light border border-2 border-warning mb-5">'
        + '<div class="d-flex justify-content-center">'
        + '<img src="./img/controller.png" alt="Portada del videojuego ' + datos[i].nombre_juego + '" style="width: 250px; height: 200px;" class="card-img-top">'
        + '</div>'
        +   '<div class="card-body">'
        +   '<h5 class="card-title text-center">' + datos[i].nombre_juego + '</h5>'
        +   '<hr class="hr hr-blurry"/>'
        + '<div class="d-flex justify-content-center">'
        + '<p class = "cambiarColor">Ver Info</p>'
        + '</div>'
        +   '</div>'
        +   '</div>'
        }

        contenedorDeCards.appendChild(card)
    }
    cuerpo.appendChild(contenedorDeCards)

    }

    else{

        let contenedorDeCards = document.createElement("div");
        contenedorDeCards.setAttribute("class", "row ms-5 me-5 pt-5");

        let raya = document.createElement("hr")
        raya.setAttribute("class", "hr hr-blurry text-light mb-5")
        contenedorDeCards.appendChild(raya)

        for(let i = 0; i < datos.length; i++){

        let card = document.createElement("div");

        if(datos.length > 1){
            card.setAttribute("class", "col-md-4 d-flex justify-content-center")
        }
        else{
             card.setAttribute("class", "d-flex justify-content-center")
        }

            card.innerHTML = '<div onclick="perfilDelUsuario('+ datos[i].id + ')" class="card text-light border border-2 bg-dark border-warning mb-5" style="width: 18rem;">'
                        +   '<div class="d-flex justify-content-center">'
                        +   '<img src="./img/perfil.jpg" alt="Imagen de perfil del usuario '+ datos[i].nombre_usuario +'" style="width: 250px; height: 200px;" class="card-img-top">'
                        +   '</div>'
                        +   '<div class="card-body">'
                        +   '<h5 class="card-title text-center">' + datos[i].nombre_usuario + '</h5>'
                        +   '<hr class="hr hr-blurry"/>'
                        +   '<div class="d-flex justify-content-center">'
                        +   '<p class = "cambiarColor">Ver Info</p>'
                        +   '</div>'
                        +   '<a href="#" id=" ' + datos[i].id + '" class="btn btn-warning d-flex justify-content-center rounded-pill mt-5 mb-2">Actualizar usuario</a>'
                        +   '<a href="#" class="btn btn-danger d-flex justify-content-center rounded-pill" onclick="borrarUsuario(${datos.data[i].id})">Borrar usuario</a>'
                        +   '</div>'
                        +   '</div>'
                        
            

            contenedorDeCards.appendChild(card);
    }

        cuerpo.appendChild(contenedorDeCards);
    }
}

async function mostrarTodosLosJuegos(){
    tituloDocumento.textContent = "Gestión de juegos"
//aquiHayUnBoton
    let menu = document.getElementById("menu")
    menu.firstElementChild.setAttribute("class", "col-md-3 text-warning")

    cabecilla.innerHTML = '<h5 class = "text-light mt-3 mb-4">JUEGOS SUBIDOS EN LA WEB <hr></h5>'

    if(cuerpo.firstElementChild){
        //cuerpo.removeChild(cuerpo.firstElementChild)
    }

        const peticion = await fetch("https://owlstore.zapto.org/api/game", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json'
        }
    });

    let datos = await peticion.json()
    
    let contenedorDeCards = document.createElement("div") 
    contenedorDeCards.setAttribute("class", "row ms-5 me-5 pt-5")
    let raya = document.createElement("hr")
    raya.setAttribute("class", "hr hr-blurry text-light mb-5")
    contenedorDeCards.appendChild(raya)

    for(let i = 0; i < datos.data.length; i++){
    
        let card = document.createElement("div") 
        card.setAttribute("class", "col-md-4 d-flex justify-content-center")

        card.innerHTML = '<div onclick="infoJuegoUsuario('+ datos.data[i].id_juego + ')" class="card text-light border border-2 border-warning mb-5">'
        + '<div class="d-flex justify-content-center">'
        + '<img src="./img/controller.png" alt="Portada del videojuego '+ datos.data[i].nombre_juego +'" style="width: 250px; height: 200px;" class="card-img-top">'
        + '</div>'
        +   '<div class="card-body">'
        +   '<h5 class="card-title text-center">' + datos.data[i].nombre_juego + '</h5>'
        +   '<hr class="hr hr-blurry"/>'
        + '<div class="d-flex justify-content-center">'
        + '<p class = "cambiarColor">Ver Info</p>'
        + '</div>'
        +   '<a href="#" id="' + datos.data[i].id_juego +'" class="btn btn-warning d-flex justify-content-center rounded-pill mt-5 mb-2">Actualizar juego</a>'
        +   '<a href="#" class="btn btn-danger d-flex justify-content-center rounded-pill" onclick = "borrarJuego('+ datos.data[i].id_juego +')">Borrar juego</a>'
        +   '</div>'
        +   '</div>'

        contenedorDeCards.appendChild(card)
    }
    cuerpo.appendChild(contenedorDeCards)
}

 async function crearFormmularioJuegoNuevo(event){
    tituloDocumento.textContent = "Subir/Actualizar juego"
    let nodoClick

    if(event){
        nodoClick = event.target

        let todoslosGeneros = []
        let obtenerEtiquetas = await fetch("https://owlstore.zapto.org/api/tags")
        let etiquetas = await obtenerEtiquetas.json()

        for (let i = 0; i < etiquetas.data.length; i++) {
            todoslosGeneros.push(etiquetas.data[i].nombre_etiqueta)
        }

        if(nodoClick.textContent == "Subir juego nuevo"){

            cuerpo.removeChild(cuerpo.firstElementChild)
            let formulario = document.createElement("form")
            formulario.setAttribute("class", "text-light border border-5 rounded border-warning pt-5 pb-5 pe-3 ps-3 mt-5")

            formulario.innerHTML = '<legend class = "mb-3"><div class="d-flex justify-content-center">Subir videojuego nuevo</div><hr class="hr hr-blurry"/></legend><label for="inputPassword5" class="form-label">Nombre del juego</label>'
                + '<input id="nombre_juego" type="text" class="form-control mb-2" placeholder="Nombre del juego">'
                + '<label for="inputPassword5" class="form-label">Fecha de salida</label>'
                + '<input id="fecha_salida" type="text" class="form-control mb-2" placeholder="/aaaa/mm/dd">'
                + '<label for="inputPassword5" class="form-label">Precio del juego</label>'
                + '<input id="precio" type="text" class="form-control mb-2" placeholder="Precio">'
                + '<label for="inputPassword5" class="form-label">Genero del juego</label>'

                let select = document.createElement("select")
                select.setAttribute("class", "form-control mb-2")
                select.setAttribute("id", "genero")

                for(let i = 0; i < todoslosGeneros.length; i++){
                    let option = document.createElement("option")
                    option.setAttribute("value", todoslosGeneros[i])
                    option.textContent = todoslosGeneros[i]
                    select.appendChild(option)
                }

                formulario.appendChild(select)

               formulario.innerHTML += '<label for="inputPassword5" class="form-label">Limite de edad</label>'
                + '<input id="pegi" type="text" class="form-control mb-2" placeholder="pegi">'
                + '<label class="form-label">Descripción del juego</label>'
                + '<textarea id="descripcion" type="text" class="form-control mb-3" placeholder="Descripción"></textarea>'
                + '<button id = "subirJuegoALaWeb" type="submit" class="btn btn-warning d-flex justify-content-center rounded-pill">Subir juego</button>'
                + '<p id="errorJuego" class="text-danger mt-3 text-center"></p>'

            cuerpo.appendChild(formulario)
            let botonSubirJuegoAccion = document.getElementById("subirJuegoALaWeb")
            botonSubirJuegoAccion.addEventListener("click", acionSubirJuego)

        }
        if(nodoClick.textContent == "Actualizar juego"){

            try {
                const peticion = await fetch("https://owlstore.zapto.org/api/game/" + nodoClick.id, {
                method: "GET",
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                    'Accept': 'application/json'
                }
                });
                let datos = await peticion.json();

                if (!peticion.ok) {
                    console.error("Error:", datos);
                    return;
                }

            cuerpo.removeChild(cuerpo.firstElementChild)
            let formulario = document.createElement("form")
            formulario.setAttribute("class", "text-light rounded border border-5 border-warning pt-5 pb-5 pe-3 ps-3")

            formulario.innerHTML = '<legend class = "mb-3"><div class="d-flex justify-content-center">Actualizar videojuego: '+ datos.nombre_juego +'</div><hr class="hr hr-blurry"/></legend><label for="inputPassword5" class="form-label">Nombre del juego (antiguo)</label>'
                + '<input id="nombre_juego" type="text" class="form-control mb-2" placeholder="Nombre del juego" value = "'+ datos.nombre_juego +'">'
                + '<label for="inputPassword5" class="form-label">Fecha de salida (antiguo)</label>'
                + '<input id="fecha_salida" type="text" class="form-control mb-2" placeholder="/aaaa/mm/dd" value = "'+ datos.fecha_salida +'">'
                + '<label for="inputPassword5" class="form-label">Precio del juego (antiguo)</label>'
                + '<input id="precio" type="text" class="form-control mb-2" placeholder="Precio" value = "'+ datos.precio +'">'
                + '<label for="inputPassword5" class="form-label">Genero del juego (antiguo)</label>'
                
                let select = document.createElement("select")
                select.setAttribute("class", "form-control mb-2")
                select.setAttribute("id", "genero")

                for(let i = 0; i < todoslosGeneros.length; i++){
                    let option = document.createElement("option")
                    option.setAttribute("value", todoslosGeneros[i])
                    if(todoslosGeneros[i] == datos.genero){
                        option.setAttribute("selected", true)
                    }
                    option.textContent = todoslosGeneros[i]
                    select.appendChild(option)
                }

                formulario.appendChild(select)

                formulario.innerHTML += '<label for="inputPassword5" class="form-label">Limite de edad (antiguo)</label>'
                + '<input id="pegi" type="text" class="form-control mb-2" placeholder="pegi" value = "'+ datos.pegi +'">'
                + '<label class="form-label">Descripción del juego (Antiguo)</label>'
                + '<textarea id="descripcion" type="text" class="form-control mb-3" placeholder="Descripción">'+ datos.descripcion +'</textarea>'
                + '<button id = "subirJuegoALaWeb" type="submit" class="btn btn-warning d-flex justify-content-center rounded-pill">Subir juego actualizado</button>'
                + '<p id="errorJuego" class="text-danger mt-3 text-center"></p>'

            setIdFabricante(datos.id_usuario_publicador)
            setIdJuego(datos.id_juego)

            cuerpo.appendChild(formulario)
            let botonSubirJuegoAccion = document.getElementById("subirJuegoALaWeb")
            botonSubirJuegoAccion.addEventListener("click", acionSubirJuego)
                        }
            catch (error) {
                console.error("Error de red o servidor:", error);
            }
        }
    }
}

    async function borrarJuego(id){
        let confirmacion = confirm("¿Seguro que quieres eliminar este juego?");
            if (confirmacion == true){

                try {
                    const peticion = await fetch("https://owlstore.zapto.org/api/game/" + id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token"),
                        'Accept': 'application/json'
                    }
                });

                    if (peticion.ok) {
                        mostrarModal("Juego eliminado correctamente");
                        setTimeout(() => {
                          location.reload();   
                        }, 3000);
                        
                    } else {
                    }
                } catch (error) {
                    console.error('Error de red o parseo: ', error);
                }
        }
    }

async function acionSubirJuego(event) {
    event.preventDefault();

    let errorParrafo = document.getElementById("errorJuego");
    if (!errorParrafo) {
        errorParrafo = document.createElement("p");
        errorParrafo.id = "errorJuego";
        errorParrafo.className = "text-danger mt-3 text-center";
        event.target.closest("form")?.appendChild(errorParrafo);
    }
    errorParrafo.textContent = "";

    let metodo, ruta, texto = "";

    let nombre_juego = document.getElementById("nombre_juego");
    let fecha_salida = document.getElementById("fecha_salida");
    let precio = document.getElementById("precio");
    let genero = document.getElementById("genero");
    let selecionado = genero.options[genero.selectedIndex].value;
    let pegi = document.getElementById("pegi");
    let descripcion = document.getElementById("descripcion");

    let subirJuego = {};
    let nodoClick = event.target;

    if (nodoClick.textContent == "Subir juego") {
        texto = "Juego creado con éxito";
        metodo = "POST";
        ruta = "https://owlstore.zapto.org/api/game";
        subirJuego = {
            nombre_juego: nombre_juego.value,
            fecha_salida: fecha_salida.value,
            precio: precio.value,
            genero: selecionado,
            pegi: pegi.value,
            descripcion: descripcion.value,
            id_usuario_publicador: localStorage.getItem("id_usuario")
        };
    }

    if (nodoClick.textContent == "Subir juego actualizado") {
        texto = "Juego actualizado con éxito";
        metodo = "PUT";
        ruta = "https://owlstore.zapto.org/api/game/" + getIdJuego();
        subirJuego = {
            nombre_juego: nombre_juego.value,
            fecha_salida: fecha_salida.value,
            precio: precio.value,
            genero: selecionado,
            pegi: pegi.value,
            descripcion: descripcion.value,
            id_usuario_publicador: getIdFrabricante()
        };
    }

    try {
        let rep = await fetch(ruta, {
            method: metodo,
            body: JSON.stringify(subirJuego),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const datos = await rep.json();

if (!rep.ok) {
    if (datos.errors) {
        // Convertir los errores a lista con salto de línea
        let erroresArray = Object.values(datos.errors).flat();
        let listaErrores = erroresArray.map(err => `• ${err}`).join("\n");

        // Mostrar en HTML con <br>
        errorParrafo.innerHTML = listaErrores.replaceAll("\n", "<br>");
    } else {
        errorParrafo.textContent = datos.respuesta || "Error al procesar la solicitud.";
    }
    return;
}

        mostrarModal(texto);
        setTimeout(() => window.location.href = "./index.html", 3000);

    } catch (error) {
        console.error("Error de red:", error);
        errorParrafo.textContent = "Error al conectar con el servidor.";
    }
}
let idFabr

function getIdFrabricante(){
    return idFabr
}

function setIdFabricante(x){
    idFabr = x
}

let idJu

function getIdJuego(){
    return idJu
}

function setIdJuego(x){
    idJu = x
}

async function todosLosUsuarios() {
    tituloDocumento.textContent = "Gestión de usuarios"
    //cuerpo.removeChild(cuerpo.firstElementChild);
    cabecilla.innerHTML = '<h5 class = "text-light mt-3 mb-4">USUARIOS REGISTRADOS EN LA WEB<hr></h5>'
    
    const tok = localStorage.getItem("token");
    if (!tok) {
        alert("No has iniciado sesión.");
        return;
    }

    try {
        const peticion = await fetch("https://owlstore.zapto.org/api/user", {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + tok,
                'Accept': 'application/json'
            }
        });

        const datos = await peticion.json();

        if (!peticion.ok) {
            console.error("Error:", datos);
            return;
        }

        let contenedorDeCards = document.createElement("div");
        contenedorDeCards.setAttribute("class", "row ms-5 me-5 pt-5");

        let raya = document.createElement("hr")
        raya.setAttribute("class", "hr hr-blurry text-light mb-5")
        contenedorDeCards.appendChild(raya)

        for (let i = 0; i < datos.data.length; i++) {
            let card = document.createElement("div");
            card.setAttribute("class", "col-md-4 d-flex justify-content-center");

            card.innerHTML = '<div onclick="perfilDelUsuario('+ datos.data[i].id + ')" class="card text-light border border-2 bg-dark border-warning mb-5">'
                        +   '<div class="d-flex justify-content-center">'
                        +   '<img src="./img/perfil.jpg" alt="Imagen de perfil del usuario '+datos.data[i].nombre_usuario+'" style="width: 250px; height: 200px;" class="card-img-top">'
                        +   '</div>'
                        +   '<div class="card-body">'
                        +   '<h5 class="card-title text-center">' + datos.data[i].nombre_usuario + '</h5>'
                        +   '<hr class="hr hr-blurry"/>'
                        +   '<div class="d-flex justify-content-center">'
                        +   '<p class = "cambiarColor">Ver Info</p>'
                        +   '</div>'
                        +   '<a href="#" id=" ' + datos.data[i].id + '" class="btn btn-warning d-flex justify-content-center rounded-pill mt-5 mb-2">Actualizar usuario</a>'
                        +   '<a href="#" class="btn btn-danger d-flex justify-content-center rounded-pill" onclick="borrarUsuario(' + datos.data[i].id + ')">Borrar usuario</a>'
                        +   '</div>'
                        +   '</div>'
                        
            

            contenedorDeCards.appendChild(card);
        }

        cuerpo.appendChild(contenedorDeCards);
    } catch (error) {
        console.error("Error de red o servidor:", error);
    }
}

    async function borrarUsuario(id){
        let confirmacion = confirm("¿Seguro que quieres eliminar este usuario?");
            if (confirmacion == true){

                try {
                    const peticion = await fetch("https://owlstore.zapto.org/api/user/" + id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token"),
                        'Accept': 'application/json'
                    }
                });

                    if (peticion.ok) {
                        mostrarModal("Usuario eliminado correctamente");
                        setTimeout(() => {
                            location.reload(); 
                        }, 3000);
                        
                    } else {
                    }
                } catch (error) {
                    console.error('Error de red o parseo: ', error);
                }
        }
    }

 async function crearFormmularioUsuarioNuevo(event){
    tituloDocumento.textContent = "Subir/Actualizar usuario"
    let nodoClick

    if(event){
        nodoClick = event.target

        if(nodoClick.textContent == "Subir usuario nuevo" || nodoClick.textContent == "Registrate aquí"){

            cuerpo.removeChild(cuerpo.firstElementChild)
            let formulario = document.createElement("form")
            formulario.setAttribute("class", "text-light border border-5 rounded border-warning bg-dark pt-5 pb-5 pe-3 ps-3 mt-5")

            formulario.innerHTML = '<legend class = "mb-3"><div class="d-flex justify-content-center">Subir usuario nuevo</div><hr class="hr hr-blurry"/></legend><label for="inputPassword5" class="form-label">Nombre del usuario</label>'
                + '<input id="nombre_usuario" type="text" class="form-control mb-2" placeholder="Nombre del usuario">'
                + '<label for="inputPassword5" class="form-label">Apellidos del usuario</label>'
                + '<input id="apellidos" type="text" class="form-control mb-2" placeholder="Apellidos del usuario">'
                + '<label for="inputPassword5" class="form-label">Edad del usuario</label>'
                + '<input id="edad" type="text" class="form-control mb-2" placeholder="Edad del usuario">'
                + '<label for="inputPassword5" class="form-label">Username</label>'
                + '<input id="username" type="text" class="form-control mb-2" placeholder="Username">'

                + '<label for="inputPassword5" class="form-label">Password</label>'
                + '<input id="password" type="text" class="form-control mb-2" placeholder="Password">'
                
                + '<label for="inputPassword5" class="form-label">Email del usuario</label>'
                + '<input id="email" type="text" class="form-control mb-3" placeholder="Email">'

                + '<button id = "subirUsuarioALaWeb" type="submit" class="btn btn-warning d-flex justify-content-center rounded-pill">Crear usuario</button>'
                + '<p id="errorUsuario" class="text-danger mt-3 text-center"></p>';
            cuerpo.appendChild(formulario)
            let botonSubirUsuarioAccion = document.getElementById("subirUsuarioALaWeb")
            botonSubirUsuarioAccion.addEventListener("click", acionSubirUsuario)

        }
        if(nodoClick.textContent == "Actualizar usuario" || nodoClick.textContent == "Actualizar mi perfil"){
            let idSegunElBoton
            if(nodoClick.textContent == "Actualizar mi perfil"){
                idSegunElBoton = localStorage.getItem("id_usuario")
                usuarioComprador = true
            }

            else{
                idSegunElBoton = nodoClick.id
                usuarioComprador = false
            }

            try {
                const peticion = await fetch("https://owlstore.zapto.org/api/user/" + idSegunElBoton, {
                method: "GET",
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                    'Accept': 'application/json'
                }
                });
                let datos = await peticion.json();

                if (!peticion.ok) {
                    console.error("Error:", datos);
                    return;
                }

                cuerpo.removeChild(cuerpo.firstElementChild)
                let formulario = document.createElement("form")
                formulario.setAttribute("class", "text-light border border-5 rounded border-warning pt-5 pb-5 pe-3 ps-3")


                formulario.innerHTML = '<legend class = "mb-3"><div class="d-flex justify-content-center">Actualizar usuario: '+ datos.nombre_usuario +'</div><hr class="hr hr-blurry"/></legend><label for="inputPassword5" class="form-label">Nombre del usuario (Antiguo)</label>'
                    + '<input id="nombre_usuario" type="text" class="form-control mb-2" placeholder="Nombre del usuario" value = "'+ datos.nombre_usuario +'">'
                    + '<label for="inputPassword5" class="form-label">Apellidos del usuario (Antiguo)</label>'
                    + '<input id="apellidos" type="text" class="form-control mb-2" placeholder="Apellidos del usuario" value = "'+ datos.apellidos +'">'
                    + '<label for="inputPassword5" class="form-label">Edad del usuario (Antiguo)</label>'
                    + '<input id="edad" type="text" class="form-control mb-2" placeholder="Edad del usuario" value = "'+ datos.edad +'">'
                    + '<label for="inputPassword5" class="form-label">Username (Antiguo)</label>'
                    + '<input id="username" type="text" class="form-control mb-2" placeholder="Username" value = "'+ datos.username +'">'

                    + '<label for="password">Nueva contraseña (deja vacío si no la quieres cambiar)</label>'
                    + '<input id="password" type="password" class="form-control mb-2" placeholder="Nueva contraseña">'
                
                    + '<label for="inputPassword5" class="form-label">Email del usuario (Antiguo)</label>'
                    + '<input id="email" type="text" class="form-control mb-2" placeholder="Email" value = "'+ datos.email +'">'
                    + '<label class="form-label">Descripción del usuario (Antiguo)</label>'
                    + '<textarea id="descripcion" type="text" class="form-control mb-5" placeholder="Descripción">'+ datos.descripcion +'</textarea>'

                if(usuarioComprador == true){
                    formulario.innerHTML += '<div hidden> <label for="inputPassword5" class="form-label">Billetera del usuario (Antiguo)</label>'
                    + '<input id="billetera" type="text" class="form-control mb-2" placeholder="Billetera" value = "'+ datos.billetera +'">'
                    + '<label for="inputPassword5" class="form-label">Rol del usuario (Antiguo)</label>'
                    + '<input id="rol" type="text" class="form-control mb-3" placeholder="Rol" value = "'+ datos.rol +'">'
                    + '</div>'
                    + '<button id = "subirUsuarioALaWeb" type="submit" class="btn btn-warning d-flex justify-content-center rounded-pill">Actualizar perfil</button>'
                    + '<p id="errorUsuario" class="text-danger mt-3 text-center"></p>';
                }
                else{
                    let rolesArray = ["comprador", "vendedor", "admin"]
                    formulario.innerHTML += '<div> <label for="inputPassword5" class="form-label">Billetera del usuario (Antiguo)</label>'
                    + '<input id="billetera" type="text" class="form-control mb-2" placeholder="Billetera" value = "'+ datos.billetera +'">'
                    + '<label for="inputPassword5" class="form-label">Rol del usuario (Antiguo)</label>'

                    let select = document.createElement("select")
                    select.setAttribute("class", "form-control mb-3")
                    select.setAttribute("id", "rol")

                    for(let i = 0; i < rolesArray.length; i++){
                        let option = document.createElement("option")
                        option.setAttribute("value", rolesArray[i])
                        if(rolesArray[i] == datos.rol){
                            option.setAttribute("selected", true)
                        }
                        option.textContent = rolesArray[i]

                        select.appendChild(option)
                        
                    }

                    formulario.appendChild(select)

                    formulario.innerHTML += '<button id = "subirUsuarioALaWeb" type="submit" class="btn btn-warning d-flex justify-content-center rounded-pill">Subir usuario actualizado</button>'
                    + '<p id="errorUsuario" class="text-danger mt-3 text-center"></p>';
                }

                setIdUsuario(datos.id)

                cuerpo.appendChild(formulario)
                let botonSubirJuegoAccion = document.getElementById("subirUsuarioALaWeb")
                botonSubirJuegoAccion.addEventListener("click", acionSubirUsuario)
            }
            catch (error) {
                console.error("Error de red o servidor:", error);
            }
        }
    }
}

async function acionSubirUsuario(event) {
    event.preventDefault();

    // Crear o seleccionar el párrafo para mostrar errores
    let errorParrafo = document.getElementById("errorUsuario");
    if (!errorParrafo) {
        errorParrafo = document.createElement("p");
        errorParrafo.id = "errorUsuario";
        errorParrafo.className = "text-danger mt-3 text-center";
        event.target.parentNode.appendChild(errorParrafo);
    }
    errorParrafo.textContent = ""; // limpiar errores previos

    let metodo, ruta, texto = "";

    // Obtener valores del formulario
    const nombre_usuario = document.getElementById("nombre_usuario")?.value.trim() || "";
    const apellidos = document.getElementById("apellidos")?.value.trim() || "";
    const edad = document.getElementById("edad")?.value.trim() || "";
    const username = document.getElementById("username")?.value.trim() || "";
    const password = document.getElementById("password")?.value.trim() || "";
    const billetera = document.getElementById("billetera")?.value.trim() || "0";
    const descripcion = document.getElementById("descripcion")?.value.trim() || "Sin descripción";
    const email = document.getElementById("email")?.value.trim() || "";
    const email_verified_at = new Date();
    let selecionado = "";

    const nodoClick = event.target;

    // Preparar datos según acción
    let subirUsuario = {};

    if (nodoClick.textContent === "Crear usuario") {
        texto = "Usuario creado con éxito";
        metodo = "POST";
        ruta = "https://owlstore.zapto.org/api/user";

        subirUsuario = {
            nombre_usuario,
            apellidos,
            edad,
            username,
            password,
            billetera: "0",
            rol: "comprador",
            email,
            descripcion,
            email_verified_at: email_verified_at.toString()
        };
    } else if (nodoClick.textContent === "Subir usuario actualizado" || nodoClick.textContent === "Actualizar perfil") {
        texto = "Datos actualizados con éxito";
        metodo = "PUT";

        if (nodoClick.textContent === "Actualizar perfil") {
            ruta = "https://owlstore.zapto.org/api/user/" + localStorage.getItem("id_usuario");
            if (localStorage.getItem("cabeceras") === "JUEGOS,USUARIOS,ETIQUETAS,PERFIL") selecionado = "admin";
        } else {
            ruta = "https://owlstore.zapto.org/api/user/" + getIdUsuario();
            if (localStorage.getItem("cabeceras") === "JUEGOS,USUARIOS,ETIQUETAS,PERFIL") {
                let rolSelect = document.getElementById("rol");
                selecionado = rolSelect.options[rolSelect.selectedIndex].value;
            }
        }

        if (localStorage.getItem("cabeceras") === "TUS JUEGOS,ESTADISTICAS,PERFIL") selecionado = "vendedor";
        if (localStorage.getItem("cabeceras") === "TIENDA,BIBLIOTECA,PERFIL") selecionado = "comprador";

        subirUsuario = {
            nombre_usuario,
            apellidos,
            edad,
            username,
            password,
            billetera,
            rol: selecionado,
            email,
            descripcion,
            email_verified_at: email_verified_at.toString()
        };
    }

    try {
        const rep = await fetch(ruta, {
            method: metodo,
            body: JSON.stringify(subirUsuario),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });

        const datos = await rep.json();

        if (!rep.ok) {
            // ✅ Formatear errores de Laravel en lista con saltos de línea
            if (datos.errors) {
                const erroresArray = Object.values(datos.errors).flat();
                const listaErrores = erroresArray.map(err => `• ${err}`).join("<br>");
                errorParrafo.innerHTML = listaErrores;
            } else {
                errorParrafo.textContent = datos.mensaje || datos.respuesta || "❌ Error al procesar la solicitud.";
            }
            return;
        }

        mostrarModal(texto);

        // Redirigir tras éxito
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 3000);

    } catch (error) {
        console.error("Error de red o parseo:", error);
        errorParrafo.textContent = "🚫 Error al conectar con el servidor.";
    }
}

let idUsuario

function getIdUsuario(){
    return idUsuario
}

function setIdUsuario(x){
    idUsuario = x
}

async function verEtiquetas(){
    tituloDocumento.textContent = "Gestión de etiquetas"
    limpiarPantalla()

    barraBusqueda.firstElementChild.nextElementSibling.setAttribute("class", "d-none")
    barraBusqueda.firstElementChild.setAttribute("class", "d-none")
    document.getElementById("juegoNuevo").textContent = "Crear Etiqueta Nueva"

     cabecilla.innerHTML = '<h5 class = "text-light mt-3 mb-4">ETIQUETAS<hr></h5>'
    
    const tok = localStorage.getItem("token");
    if (!tok) {
        alert("No has iniciado sesión.");
        return;
    }

    try {
        const peticion = await fetch("https://owlstore.zapto.org/api/tags", {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + tok,
                'Accept': 'application/json'
            }
        });

        const datos = await peticion.json();

        if (!peticion.ok) {
            console.error("Error:", datos);
            return;
        }

        let contenedorDeCards = document.createElement("div");
        contenedorDeCards.setAttribute("class", "row ms-5 me-5 pt-5");

        let raya = document.createElement("hr")
        raya.setAttribute("class", "hr hr-blurry text-light mb-5")
        contenedorDeCards.appendChild(raya)

        for (let i = 0; i < datos.data.length; i++) {
            let card = document.createElement("div");
            card.setAttribute("class", "col-md-4 d-flex justify-content-center");

            card.innerHTML = '<div class="card text-light border border-2 bg-dark border-warning mb-5" style="width: 18rem;">'
                        +   '<div class="card-body">'
                        +   '<h5 class="card-title text-center">' + datos.data[i].nombre_etiqueta + '</h5>'
                        +   '<hr class="hr hr-blurry"/>'
                        +   '<a href="#" class="btn btn-danger d-flex justify-content-center rounded-pill" onclick="borrarEtiqueta(' + datos.data[i].id + ')">Borrar Etiqueta</a>'
                        +   '</div>'
                        +   '</div>'

            contenedorDeCards.appendChild(card);
        }

        cuerpo.appendChild(contenedorDeCards);
    } catch (error) {
        console.error("Error de red o servidor:", error);
    }

}

async function borrarEtiqueta(id) {
     let confirmacion = confirm("¿Seguro que quieres eliminar esta Etiqueta?");
            if (confirmacion == true){

                try {
                    const peticion = await fetch("https://owlstore.zapto.org/api/tag/borrar/" + id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token"),
                        'Accept': 'application/json'
                    }
                });

                    if (peticion.ok) {
                        mostrarModal("Etiqueta eliminada correctamente");
                        setTimeout(() => {
                             location.reload(); 
                        }, 3000);
                       
                    } else {
                    }
                } catch (error) {
                    console.error('Error de red o parseo: ', error);
                }
        }
}

    /*
            +   '<hr class="hr hr-blurry"/>'
        + '<div class="d-flex justify-content-center">'
        + '<p class = "cambiarColor">Ver Info</p>'
        + '</div>'
    */

function crearFormularioEtiqueta(){
    tituloDocumento.textContent = "Crear nueva etiqueta"
    limpiarPantalla()
    let formulario = document.createElement("form")
    formulario.setAttribute("class", "text-light border border-5 rounded border-warning pt-5 pb-5 pe-3 ps-3 mt-5")

    formulario.innerHTML = '<legend class = "mb-3"><div class="d-flex justify-content-center">Subir etiqueta nueva</div><hr class="hr hr-blurry"/></legend><label for="inputPassword5" class="form-label">Nombre etiqueta</label>'
        + '<input id="nombre_etiqueta" type="text" class="form-control mb-3" placeholder="Nombre Etiqueta">'
        + '<p id="errorEtiqueta" class="text-danger mt-2 text-center"></p>'
        + '<button id="subirEtiquetaALaWeb" type="submit" class="btn btn-warning d-flex justify-content-center rounded-pill">Crear etiqueta</button>'

    cuerpo.appendChild(formulario)
    let botonSubirEtiquetaAccion = document.getElementById("subirEtiquetaALaWeb")
    botonSubirEtiquetaAccion.addEventListener("click", acionSubirEtiqueta)
}

async function acionSubirEtiqueta(event){
    event.preventDefault()

    const errorParrafo = document.getElementById("errorEtiqueta")
    if (errorParrafo) errorParrafo.textContent = "" // limpiar errores anteriores

    const nombre_etiqueta = document.getElementById("nombre_etiqueta").value.trim()

    // ✅ Validación en frontend
    if (!nombre_etiqueta) {
        errorParrafo.textContent = "⚠️ El nombre de la etiqueta es obligatorio."
        return
    }

    const subirEtiqueta = { nombre_etiqueta }

    try{
        const rep = await fetch("https://owlstore.zapto.org/api/tag/subir", {
            method: "POST",
            body: JSON.stringify(subirEtiqueta),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })

        const datos = await rep.json()

        if (!rep.ok) {
            errorParrafo.textContent = datos.mensaje || datos.respuesta || "❌ Error al procesar la solicitud."
            console.error("Error:", datos)
            return
        }

        mostrarModal("Etiqueta creada con éxito")

        setTimeout(() => {
            window.location.href = "./index.html"
        }, 3000)

    } catch (error) {
        console.error('Error de red o parseo:', error)
        errorParrafo.textContent = "🚫 Error al conectar con el servidor."
    }
}

// PARTE COMPRADOR
//hhhhhh
async function mejoresJuegos(x) {

    try {
        const peticion = await fetch("https://owlstore.zapto.org/api/game/best", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Accept': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error("Error al obtener los juegos más vendidos");
        }

        let datos = await peticion.json();

        console.log(datos);

        // Si la API devolvió una propiedad 'respuesta' (como mensaje de error)
        if (datos.respuesta) {
            console.warn(datos.respuesta);
            return;
        }

        // Aseguramos el orden descendente por ventas
        datos.sort((a, b) => b.ventas - a.ventas);

        // Nos aseguramos de tener al menos 3 juegos
        if (datos.length < 3) {
            console.warn("No hay suficientes juegos para mostrar el top 3.");
            return;
        }

        // Creamos el contenedor del carrusel
        let carrusel = document.createElement("div");
        carrusel.setAttribute("class", "d-flex justify-content-center bg-dark me-5 ms-5 pt-3 pb-3");
        carrusel.id = "masVendidos";

        carrusel.innerHTML = `
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

          <div class="carousel-indicators" style="margin-top: 90px;">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div class="carousel-inner">

            <!-- SLIDE PRINCIPAL -->
            <div class="carousel-item active">
              <div class="row">
                <div class="col-md-6">
                  <h5 class="ms-5 mb-3 text-light">LOS 3 JUEGOS MÁS VENDIDOS</h5>
                  <h6 class="ms-5 text-warning">NÚMERO 1</h6>
                  <img src="./img/controller.png" alt="Portada del videojuego ${datos[0].nombre_juego}" 
                       style="width: 250px; height: 200px;" class="card-img-top ms-5">
                  <div class="ms-5 text-light">
                    ${datos[0].nombre_juego}<br>
                    Ventas: ${datos[0].ventas}<br>
                    <hr>
                    <p class="cambiarColor" style="cursor:pointer" onclick="infoJuegoUsuario(${datos[0].id_juego})">
                      Ver más Info
                    </p>
                  </div>
                </div>

                <div class="col-md-6">
                  <br>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row align-items-center">
                        <h6 class="ms-3 mt-2 text-warning">NÚMERO 2</h6>
                        <img src="./img/controller.png" alt="Portada del videojuego ${datos[1].nombre_juego}" 
                             style="width: 150px; height: 100px;" class="card-img-top col-md-6 ms-3">
                        <div class="col-md-6 ms-3 text-light">
                          ${datos[1].nombre_juego}<br>
                          Ventas: ${datos[1].ventas}<br>
                          <hr>
                          <p class="cambiarColor" style="cursor:pointer" onclick="infoJuegoUsuario(${datos[1].id_juego})">
                            Ver más Info
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12 mt-3">
                      <div class="row align-items-center">
                        <h6 class="ms-3 text-warning">NÚMERO 3</h6>
                        <img src="./img/controller.png" alt="Portada del videojuego ${datos[2].nombre_juego}" 
                             style="width: 150px; height: 100px;" class="card-img-top col-md-6 ms-3">
                        <div class="col-md-6 ms-3 text-light">
                          ${datos[2].nombre_juego}<br>
                          Ventas: ${datos[2].ventas}<br>
                          <hr>
                          <p class="cambiarColor" style="cursor:pointer" onclick="infoJuegoUsuario(${datos[2].id_juego})">
                            Ver más Info
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SLIDE 2 -->
            <div class="carousel-item">
              <img src="./img/bienvenida.png" alt="Imagen de bienvenida juega seguro vive la emoción" 
                   style="width: 650px;" class="card-img-top col-md-6 ms-3">
            </div>

            <!-- SLIDE 3 -->
            <div class="carousel-item">
              <img src="./img/bienvenida.png" alt="Imagen de bienvenida juega seguro vive la emoción" 
                   style="width: 650px;" class="card-img-top col-md-6 ms-3">
            </div>

          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>

          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <br><br>
        `;

        x.appendChild(carrusel);

    } catch (error) {
        console.error("Ocurrió un error al cargar los mejores juegos:", error);
    }
}

async function mostrarTodosLosJuegosComprador(){
    barraBusqueda.innerHTML = '<input type="text" class="form-control" placeholder="Buscar juego" style="max-width: 250px;"><button id="buscar" class="btn btn-warning">Buscar</button>'
    barraBusqueda.parentNode.parentElement.setAttribute("class", "bg-dark pt-2 pb-2")


    tituloDocumento.textContent = "Tienda de videojuegos"
    cabecilla.innerHTML = '<h5 class = "text-light mt-3 mb-4">TIENDA <hr></h5>'
    let menu = document.getElementById("menu")
    menu.firstElementChild.setAttribute("class", "col-md-3 text-warning")

    let todoEnUnDiv = document.createElement("div")
    todoEnUnDiv.setAttribute("class", "text-light")

    if(cuerpo.firstElementChild){
        //cuerpo.removeChild(cuerpo.firstElementChild)
    }
///game/best
    mejoresJuegos(todoEnUnDiv)
    const peticion = await fetch("https://owlstore.zapto.org/api/game", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json'
        }
    });

    let datos = await peticion.json()
    let contenedorDeCards = document.createElement("div") 
    contenedorDeCards.setAttribute("class", "row")

    let filtrosTexto = document.createElement("h5")
    filtrosTexto.textContent = "BUSCAR POR GENERO"
    filtrosTexto.setAttribute("class", "mb-3 mt-5 ms-5")
    todoEnUnDiv.appendChild(filtrosTexto)

    let rayaa = document.createElement("hr")
    rayaa.setAttribute("class", "hr hr-blurry text-light mb-3 ms-5 me-5")
    todoEnUnDiv.appendChild(rayaa)

    let filtros = document.createElement("div")

    let obtenerEtiquetas = await fetch("https://owlstore.zapto.org/api/tags")
    let etiquetas = await obtenerEtiquetas.json()

    filtros.setAttribute("id", "filtros") 
    filtros.setAttribute("class", "row d-flex justify-content-center me-5 ms-5 pt-3")

    for (let i = 0; i < etiquetas.data.length; i++) {
        let botonesEtiquetas = document.createElement("button")
        botonesEtiquetas.setAttribute("class", "btn btn-warning btn-lg col-md-4 mb-3 ms-3 me-3")
        botonesEtiquetas.textContent = etiquetas.data[i].nombre_etiqueta
        filtros.appendChild(botonesEtiquetas)

    }

    todoEnUnDiv.appendChild(filtros)

    let raya = document.createElement("hr")
    raya.setAttribute("class", "hr hr-blurry text-light mb-5 ms-5 me-5")
    todoEnUnDiv.appendChild(raya)

    let textoJuegosNuevos = document.createElement("h5")
    textoJuegosNuevos.textContent = "JUEGOS NUEVOS"
    textoJuegosNuevos.setAttribute("class", "mt-5 ms-5 mb-5")
    todoEnUnDiv.appendChild(textoJuegosNuevos)

    for(let i = 0; i < datos.data.length; i++){
    
        let card = document.createElement("div") 
        card.setAttribute("class", "col-md-4 d-flex justify-content-center")

        card.innerHTML = '<div id = "juego" class="bg-dark card text-light border border-2 border-warning mb-5">'
        + '<div class = "'+ datos.data[i].id_juego +'"></div>'
        + '<div class = "'+ datos.data[i].id_usuario_publicador +'"></div>'
        + '<div class="d-flex justify-content-center">'
        + '<img src="./img/controller.png" alt="Portada del videojuego '+datos.data[i].nombre_juego+'" style="width: 250px; height: 200px;" class="card-img-top">'
        + '</div>'
        + '<div class="card-body">'
        + '<h5 class="card-title">' + datos.data[i].nombre_juego + '</h5>'
        + '<hr class="hr hr-blurry"/>'
        +'<div class = "justify-content-center">'
        + '<div class="d-flex justify-content-center">'
        + '<p class = "cambiarColor">Ver Info</p>'
        + '</div>'
        + '<div class="d-flex align-items-center gap-2">'
        + '<button class="btn btn-warning w-auto">Añadir al carro</button><div>' + datos.data[i].precio + '€</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'

        contenedorDeCards.appendChild(card)
    }
    todoEnUnDiv.appendChild(contenedorDeCards)

    cuerpo.appendChild(todoEnUnDiv)

    let fil = document.getElementById("filtros")
    fil.addEventListener("click", busquedaPorGenero)

    let cardsJuegos = document.querySelectorAll("#juego")
    for (let i = 0; i < cardsJuegos.length; i++) {
        cardsJuegos[i].addEventListener("click", clickJuego)
    }
}

async function perfilDelUsuario(id) {
    tituloDocumento.textContent = "Perfil de usuario"
    try {
        const peticion = await fetch("https://owlstore.zapto.org/api/user/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token"),
            'Accept': 'application/json'
        }
        });

        let datos = await peticion.json();

        if (!peticion.ok) {
            console.error("Error:", datos);
            return;
        }

        //cuerpo.removeChild(cuerpo.firstElementChild)
        if(localStorage.getItem("cabeceras") != "TUS JUEGOS,ESTADISTICAS,PERFIL"){
            ocultarBarraBusqueda()
        }

        limpiarPantalla()
        let contenido = ""
        let perfil = document.createElement("div")
        if(localStorage.getItem("cabeceras") != "TIENDA,BIBLIOTECA,PERFIL" && localStorage.getItem("cabeceras") != "TUS JUEGOS,ESTADISTICAS,PERFIL"){
            document.getElementById("aquiHayUnBoton").firstElementChild.setAttribute("class", "d-none")
        }
        if(perfilPropio == true){
            tituloDocumento.textContent = "Mi perfil"
            contenido += '<div class = "row"><button class="btn btn-warning col-md-12 mb-5">Opciones del perfil</button></div>'
        }                                                       

        contenido += '<div class = "row text-light"><img class = "col-md-4" src="./img/perfil.jpg" alt="" style="width: 120px;;" class="card-img-top"><p class = "col-md-4">Nombre de usuario: ' + datos.username +'</p><p class = "col-md-4">Saldo: ' + localStorage.getItem("billeteraUsuario") +'€</p></div><br><br><hr class="hr hr-blurry text-light"/><h5 class = "text-light">Descripción:</h5><p class = "text-light">' + datos.descripcion + '</p><br><br><hr class="hr hr-blurry text-light"/>'

        perfil.innerHTML = contenido
        cuerpo.appendChild(perfil)
    }
    catch (error) {
        console.error("Error de red o servidor:", error);
    }
    
}

async function busquedaPorGenero(event){
    let nodoClick
    if(event){
        nodoClick = event.target

        try {
            const peticion = await fetch("https://owlstore.zapto.org/api/game/genero/" + nodoClick.textContent, {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token"),
                'Accept': 'application/json'
            }
            });
            tituloDocumento.textContent = "Juegos de género: " + nodoClick.textContent
            let datos = await peticion.json();

            if (!peticion.ok) {
                console.error("Error:", datos);
                return;
            }

           // console.log(nodoClick.parentNode.parentNode.previousElementSibling.previousElementSibling.id)

          if(nodoClick.parentNode.previousElementSibling.previousElementSibling){

            nodoClick.parentNode.parentNode.removeChild(nodoClick.parentNode.parentNode.firstElementChild)
            nodoClick.parentNode.parentNode.removeChild(nodoClick.parentNode.parentNode.firstElementChild)
            nodoClick.parentNode.parentNode.removeChild(nodoClick.parentNode.parentNode.lastElementChild)
            nodoClick.parentNode.parentNode.removeChild(nodoClick.parentNode.parentNode.lastElementChild)

         }
        else{
            nodoClick.parentNode.parentNode.parentNode.removeChild(nodoClick.parentNode.parentNode.parentNode.lastElementChild)
        }

            let contenedorDeCards = document.createElement("div") 
            contenedorDeCards.setAttribute("class", "row")

            for(let i = 0; i < datos.data.length; i++){
    
                let card = document.createElement("div") 
                card.setAttribute("class", "col-md-4")

                card.innerHTML = '<div id = "juego" class="card card text-light border border-2 bg-dark border-warning mt-5 shadow p-3 mb-5 rounded" style="width: 18rem;">'
                + '<div class = "'+ datos.data[i].id_juego +'"></div>'
                + '<div class = "'+ datos.data[i].id_usuario_publicador +'"></div>'
                + '<div class="d-flex justify-content-center">'
                + '<img src="./img/controller.png" alt="Portada del videojuego '+datos.data[i].nombre_juego+'" style="width: 250px; height: 200px;" class="card-img-top">'
                + '</div>'
                + '<div class="card-body">'
                + '<h5 class="card-title">' + datos.data[i].nombre_juego + '</h5>'
                + '<hr class="hr hr-blurry"/>'
                + '<div class = "justify-content-center">'
                + '<div class="d-flex justify-content-center">'
                + '<p class = "cambiarColor">Ver Info</p>'
                + '</div>'
                + '<div class="d-flex align-items-center gap-2">'
                + '<button class="btn btn-warning w-auto">Añadir al carro</button><div>' + datos.data[i].precio + '€</div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'

                contenedorDeCards.appendChild(card)
                cuerpo.appendChild(contenedorDeCards)
        }

        let cardsJuegos = document.querySelectorAll("#juego")
        for (let i = 0; i < cardsJuegos.length; i++) {
            cardsJuegos[i].addEventListener("click", clickJuego)
        }
    }

    catch (error) {
        console.error("Error de red o servidor:", error);
    }
    }
}


async function binliotecaDelUsuario() {
    tituloDocumento.textContent = "Mi biblioteca"
    cabecilla.innerHTML = '<h5 class = "text-light mt-3 mb-4">BIBLIOTECA<hr></h5>'
        try {
        const peticion = await fetch("https://owlstore.zapto.org/api/library/" + localStorage.getItem("id_usuario"), {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token"),
            'Accept': 'application/json'
        }
        });

        let datos = await peticion.json();

        if (!peticion.ok) {
            console.error("Error:", datos);
            return;
        }

        let contenedorDeCards = document.createElement("div")
        contenedorDeCards.setAttribute("class", "row d-flex justify-content-center")

        for(let i = 0; i < datos.data.length; i++){
    
            let card = document.createElement("div") 
            card.setAttribute("class", "col-md-4 d-flex justify-content-center")

            card.innerHTML = '<div onclick="infoJuegoUsuario('+ datos.data[i].id_juego + ')" class="bg-dark card text-light border border-2 border-warning mt-5 juegosEnBibliotecaEstilo shadow p-3 mb-5 rounded" style="width: 18rem;">'
            + '<div class="d-flex justify-content-center">'
            + '<img src="./img/controller.png" alt="Portada del videojuego '+datos.data[i].nombre_juego+'" style="width: 250px; height: 200px;" class="card-img-top">'
            + '</div>'
            + '<div class="card-body">'
            +  '<h5 class="card-title">' + datos.data[i].nombre_juego + '</h5>'
            + '</div>'
            + '</div>'

            contenedorDeCards.appendChild(card)
        }

        cuerpo.appendChild(contenedorDeCards)


    }
    catch (error) {
        console.error("Error de red o servidor:", error);
    }
}

async function infoJuegoUsuario(id) {

    cabecilla.removeChild(cabecilla.firstElementChild)
    if(controlarVerInfo != false){
        ocultarBarraBusqueda()
        document.getElementById("juegoNuevo").setAttribute("class", "d-none")
    }


    let idePorAqui = "" + id

    limpiarPantalla()

        try {
        const peticion = await fetch("https://owlstore.zapto.org/api/game/" + idePorAqui, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token"),
            'Accept': 'application/json'
        }
        });

        let datos = await peticion.json();

        if (!peticion.ok) {
            console.error("Error:", datos);
            return;
        }
        const respuesta = await fetch("https://owlstore.zapto.org/api/user/" + datos.id_usuario_publicador);
        const dato = await respuesta.json();


        tituloDocumento.textContent = "Información del juego: " + datos.nombre_juego
        let div = document.createElement("div")
        div.setAttribute("id", "unJuego")
        let contenido ='<div class = "row text-light">'
            + '<div class = "col-md-6">'
            + '<h3 id = "' + datos.id_juego +'">' + datos.nombre_juego + '</h3><img src="./img/controller.png" alt="Portada del videojuego '+datos.nombre_juego+'" style="width: 150px;" class="card-img-top">'
            + '</div>'
        if(verAnadirAlCarroBoton == false){
            contenido +='<div class = "col-md-6">'
            + '<p>Género: ' + datos.genero + '</p><hr class="hr hr-blurry"/><p>Pegi: ' + datos.pegi + '</p><hr class="hr hr-blurry"/><p>Desarrollador: ' + dato.nombre_usuario + '</p><div>Precio: ' + datos.precio + '€</div>'
            + '</div>'
        }
        else{
            contenido +='<div class = "col-md-6">'
            + '<p>Género: ' + datos.genero + '</p><hr class="hr hr-blurry"/><p>Pegi: ' + datos.pegi + '</p><hr class="hr hr-blurry"/><p>Desarrollador: ' + dato.nombre_usuario + '</p><button class="mt-3 btn btn-warning w-auto">Añadir a mi carro</button><div>' + datos.precio + '€</div>'
            + '</div>'

        }
        contenido +='</div>'
            + '<h5 class = "text-light mt-5"><hr class="hr hr-blurry"/>Descripción: </h5><p class = "mt-3 ps-5 pt-4 pb-4 pe-5 text-light border border-2 bg-dark border-warning rounded">' + datos.descripcion + '</p>'

        div.innerHTML = contenido
        cuerpo.appendChild(div)

        let juegoAñadirEvento = document.getElementById("unJuego")
        juegoAñadirEvento.addEventListener("click", clickJuego)

    }
    catch (error) {
        console.error("Error de red o servidor:", error);
    }
}

function opvionesDePerfil(){
    tituloDocumento.textContent = "Opciones de perfil"
    limpiarPantalla()
    let div = document.createElement("div")
    div.innerHTML = '<div class = "row d-flex justify-content-center"><h5 class = "text-light mb-5">Opciones del perfil</h5><button class="btn btn-warning col-md-12 mb-3">Actualizar mi perfil</button><br><button class="btn btn-warning col-md-12 mb-3">Cerrar Sesion</button><br><button class="btn btn-danger col-md-12 mb-3">Eliminar cuenta</button></div>'
    cuerpo.appendChild(div)
}

function clickJuego(event){
    let nodoClick
    if(event){
        nodoClick = event.target

        if(nodoClick.textContent == "Ver Info"){
            infoJuegoUsuario(nodoClick.parentNode.parentNode.parentNode.parentNode.firstElementChild.className)
        } 

        if(nodoClick.textContent == "Añadir al carro"){

            let guardarCarritoLocal = {nombre: nodoClick.parentNode.parentNode.parentNode.firstElementChild.textContent, precio: nodoClick.nextElementSibling.textContent, id: nodoClick.parentNode.parentNode.parentNode.parentNode.firstElementChild.className, idUsuarioVendedor:nodoClick.parentNode.parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.className}
            miCarrito.push(guardarCarritoLocal)
            localStorage.setItem("carrito", JSON.stringify(miCarrito))
            mostrarModal("¡Juego añadido al carrito!")

        }

        if(nodoClick.textContent == "Añadir a mi carro"){
            let guardarCarritoLocal = {nombre: nodoClick.parentNode.previousElementSibling.firstElementChild.textContent, precio: nodoClick.nextElementSibling.textContent, id: nodoClick.parentNode.previousElementSibling.firstElementChild.id, idUsuarioVendedor:nodoClick.previousElementSibling.textContent}
            miCarrito.push(guardarCarritoLocal)
            localStorage.setItem("carrito", JSON.stringify(miCarrito))
            mostrarModal("¡Juego añadido al carrito!")
        }
    }
    console.log(miCarrito)
}


// VENDEDOR

async function juegosDessarollador() {
    tituloDocumento.textContent = "Mis juegos"
        let menu = document.getElementById("menu")
    menu.firstElementChild.setAttribute("class", "col-md-4 text-warning")
    cabecilla.innerHTML = '<h5 class = "text-light mt-3 mb-4">TUS JUEGOS<hr></h5>'
    try{

     const peticion = await fetch("https://owlstore.zapto.org/api/game/desarrollador/" + localStorage.getItem("id_usuario"), {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json'
        }
    });

    let datos = await peticion.json()
    
    let contenedorDeCards = document.createElement("div") 
    contenedorDeCards.setAttribute("class", "row d-flex justify-content-center")

    for(let i = 0; i < datos.data.length; i++){
    
        let card = document.createElement("div") 
        card.setAttribute("class", "col-md-4 d-flex justify-content-center")

        card.innerHTML = '<div onclick="infoJuegoUsuario('+ datos.data[i].id_juego + ')" class="bg-dark card text-light border border-2 border-warning mb-5">'
        + '<div class="d-flex justify-content-center">'
        + '<img src="./img/controller.png" alt="Portada del videojuego '+ datos.data[i].nombre_juego +'" style="width: 250px; height: 200px;" class="card-img-top">'
        + '</div>'
        +   '<div class="card-body">'
        +   '<h5 class="card-title text-center">' + datos.data[i].nombre_juego + '</h5>'
        +   '<hr class="hr hr-blurry"/>'
        + '<div class="d-flex justify-content-center">'
        + '<p class = "cambiarColor">Ver Info</p>'
        + '</div>'
        +   '<a href="#" id="' + datos.data[i].id_juego +'" class="btn btn-warning d-flex justify-content-center rounded-pill mt-5 mb-2">Actualizar juego</a>'
        +   '<a href="#" class="btn btn-danger d-flex justify-content-center rounded-pill" onclick = "borrarJuego('+ datos.data[i].id_juego +')">Borrar juego</a>'
        +   '</div>'
        +   '</div>'

        /*
         
        card.innerHTML = '<div class="card card text-light border border-2 bg-dark border-warning mt-5 shadow p-3 mb-5 rounded" style="width: 18rem" onclick = "infoJuegoUsuario('+ datos.data[i].id_juego +')" style="width: 18rem;">'
        + '<img src="..." class="card-img-top" alt="...">'
        + '<div class="card-body">'
        +  '<h5 class="card-title">' + datos.data[i].nombre_juego + '</h5>'
        +  '<p class="card-text">' + datos.data[i].descripcion + '</p>'
        + '<a href="#" id="' + datos.data[i].id_juego +'" class="btn btn-warning">Actualizar juego</a>'
        + '<a href="#" class="btn btn-danger" onclick = "borrarJuego('+ datos.data[i].id_juego +')">Borrar juego</a>'
        + '</div>'
        + '</div>'
*/
        contenedorDeCards.appendChild(card)
    }
    cuerpo.appendChild(contenedorDeCards)
    
}
catch(error){
    
    console.log(error)
}
}

async function topJuegos() {
    tituloDocumento.textContent = "Estadísticas de ventas"
    cabecilla.innerHTML = '<h5 class = "text-light mt-3 mb-4">ESTADISTICAS<hr></h5>'
  try {
    const peticion = await fetch("https://owlstore.zapto.org/api/game/mejoresJuegos/desarrollador/" + localStorage.getItem("id_usuario"), {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json'
      }
    });

    if (!peticion.ok) {
      throw new Error("Error en la respuesta: " + peticion.status);
    }

    let datos = await peticion.json();

    let contenedorDeCards = document.createElement("div") 
    let juegoMasVendido = document.createElement("div") 

    juegoMasVendido.innerHTML = '<h3 class = "text-light mb-4">Juego más vendido:</h3><div onclick="infoJuegoUsuario('+ datos[0].id_juego + ')" class="bg-dark card text-light border border-2 border-warning mb-5">'
        + '<div class="d-flex justify-content-center">'
        + '<img src="./img/controller.png" alt="Portada del videojuego '+ datos[0].nombre_juego +'" style="width: 250px; height: 200px;" class="card-img-top">'
        + '</div>'
        +   '<div class="card-body">'
        +   '<h5 class="card-title text-center">' + datos[0].nombre_juego + '</h5>'
        +   '<hr class="hr hr-blurry"/>'
        + '<div class="d-flex justify-content-center">'
        + '<p class = "cambiarColor">Ver Info</p>'
        + '</div>'
        + '<div class="d-flex justify-content-center">'
        + '<p>Ventas totales: '+ datos[0].ventas +'</p>'
        +   '</div>'
        +   '</div>'
        +   '</div>'

        // + '<p>Ventas totales: '+ datos[0].ventas +'</p>'

    cuerpo.appendChild(juegoMasVendido)

    contenedorDeCards.innerHTML= '<div class="d-flex justify-content-center mt-5 mb-5"><h3 class = "text-light">Tus 3 juegos con más ventas</h3></div>'
    contenedorDeCards.setAttribute("class", "row")

    for(let i = 0; i < datos.length; i++){
    
        let card = document.createElement("div") 
        card.setAttribute("class", "col-md-4 d-flex justify-content-center")

        card.innerHTML = '<div onclick="infoJuegoUsuario('+ datos[i].id_juego + ')" class="bg-dark card text-light border border-2 border-warning mb-5">'
        + '<div class="d-flex justify-content-center">'
        + '<img src="./img/controller.png" alt="Portada del videojuego '+ datos[i].nombre_juego +'" style="width: 250px; height: 200px;" class="card-img-top">'
        + '</div>'
        +   '<div class="card-body">'
        +   '<h5 class="card-title text-center">' + datos[i].nombre_juego + '</h5>'
        +   '<hr class="hr hr-blurry"/>'
        + '<div class="d-flex justify-content-center">'
        + '<p class = "cambiarColor">Ver Info</p>'
        + '</div>'
        + '<div class="d-flex justify-content-center">'
        + '<p>Ventas totales: '+ datos[i].ventas +'</p>'
        +   '</div>'
        +   '</div>'
        +   '</div>'

        contenedorDeCards.appendChild(card)
    }
    cuerpo.appendChild(contenedorDeCards)

  } catch (error) {
    console.log(error);
  }
}

// LOGIN

    function obtenerNombresHeader(x){

        let nombreBotones = x.split(",")
        let menuBarDiv = document.getElementById("menu")

        if(x == "TIENDA,BIBLIOTECA,PERFIL"){
            for (let i = 0; i < nombreBotones.length; i++) {
                        
                let botonMenu = document.createElement("button")
                botonMenu.setAttribute("class", "col-md-3")
                botonMenu.textContent = nombreBotones[i]

                menuBarDiv.appendChild(botonMenu)
                        
            }

            let img = document.createElement("img")
            img.setAttribute("src", "./img/Proyecto nuevo.png")
            img.setAttribute("alt", "boton carrito de la compra")
            //img.textContent = "Carrito"
            img.setAttribute("class", "col-md-3 text-light mt-1 ms-4")
            img.setAttribute("id", "botonCarro")
            menuBarDiv.appendChild(img)

            let botonCarro = document.getElementById("botonCarro")
            
            botonCarro.addEventListener('click', verCarrito)

        }
         else if(x == "JUEGOS,USUARIOS,ETIQUETAS,PERFIL"){
            
            for (let i = 0; i < nombreBotones.length; i++) {
                        
            let botonMenu = document.createElement("button")
            botonMenu.setAttribute("class", "col-md-3")
            botonMenu.textContent = nombreBotones[i]

            menuBarDiv.appendChild(botonMenu)
                        
            }
        }

        else{
            
            for (let i = 0; i < nombreBotones.length; i++) {
                        
            let botonMenu = document.createElement("button")
            botonMenu.setAttribute("class", "col-md-4")
            botonMenu.textContent = nombreBotones[i]

            menuBarDiv.appendChild(botonMenu)
                        
            }
        }

    }

function loginVista() {
    tituloDocumento.textContent = "Iniciar sesión";
    let div = document.createElement("div");
div.innerHTML = `
    <h3 class="text-center mb-4">Iniciar sesión</h3>
    <hr>
    <div class="mb-3">
        <label for="inputEmail" class="form-label">Email</label>
        <input id="email" class="form-control" name="inputEmail" type="text">
    </div>
    <div class="mb-3">
        <label for="inputPassword" class="form-label">Contraseña</label>
        <input id="password" class="form-control" name="inputPassword" type="password">
    </div>
    <button type="submit" id="iniciarSesion" class="btn btn-warning">Iniciar sesión</button>
    <p id="errorLogin" class="text-danger mt-3 text-center"></p>
    <a href = "./recuperacionContrasenia.html" class="text-center cursor-pointer">¿Se te ha olvidado la contraseña?</a>
    <br>
    <div class="text-center mt-4">¿No tienes cuenta?</div>
    <p class="text-center cursor-pointer">Registrate aquí</p>
`;
    div.id = "login";
    div.setAttribute("class", "text-light pt-5 pb-3 pe-4 ps-4 rounded-3 border border-warning shadow-red p-3 mb-5 bg-dark rounded");
    cuerpo.appendChild(div);

    let botonIniciarSesion = document.getElementById("iniciarSesion");
    botonIniciarSesion.addEventListener('click', IniciarSesion);
}

       async function IniciarSesion(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorParrafo = document.getElementById("errorLogin");

    // Limpia errores previos
    errorParrafo.textContent = "";

    // Validaciones en el frontend
    if (!email || !password) {
        errorParrafo.textContent = "Todos los campos son obligatorios.";
        return;
    }

    // Validación básica de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        errorParrafo.textContent = "El formato del email no es válido.";
        return;
    }

    try {
        const respuesta = await fetch('https://owlstore.zapto.org/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Guardar token y continuar flujo
            localStorage.setItem("token", datos.access_token);
            localStorage.setItem("id_usuario", datos.id);
            localStorage.setItem("billeteraUsuario", datos.billetera);

            obtenerNombresHeader(datos.texto);

            const login = document.getElementById("login");
            cuerpo.removeChild(login);

            // Manejar roles
            if (datos.texto === "JUEGOS,USUARIOS,ETIQUETAS,PERFIL") {
                controlarVerInfo = true;
                verAnadirAlCarroBoton = false;
                localStorage.setItem("cabeceras", datos.texto);
                barraBusquedaCrear();
                botonCrear();
                mostrarTodosLosJuegos();
            } else if (datos.texto === "TIENDA,BIBLIOTECA,PERFIL") {
                localStorage.setItem("cabeceras", datos.texto);
                mostrarTodosLosJuegosComprador();

                const peticion = await fetch("https://owlstore.zapto.org/api/cart/" + localStorage.getItem("id_usuario"), {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Accept': 'application/json'
                    }
                });

                if (peticion.ok) {
                    const datosCar = await peticion.json();
                    miCarrito = [];

                    for (let i = 0; i < datosCar.data.length; i++) {
                        miCarrito.push({
                            nombre: datosCar.data[i].nombre_juegp,
                            precio: datosCar.data[i].precio_juego,
                            id: datosCar.data[i].id_juego,
                            idUsuarioVendedor: datosCar.data[i].idUsuarioVendedor
                        });
                    }
                    localStorage.setItem("carrito", JSON.stringify(miCarrito));
                }
            } else if (datos.texto === "TUS JUEGOS,ESTADISTICAS,PERFIL") {
                localStorage.setItem("cabeceras", datos.texto);
                botonCrear();
                juegosDessarollador();
            }
        } else {
            // Mostrar errores devueltos por Laravel
            errorParrafo.textContent = datos.mensaje || "Error al iniciar sesión.";
        }
    } catch (error) {
        console.error("Error en el login:", error);
        errorParrafo.textContent = "Error de conexión con el servidor.";
    }
}

 window.onload = (event) => {

    if(localStorage.getItem("cabeceras")){

        if(localStorage.getItem("cabeceras") == "JUEGOS,USUARIOS,ETIQUETAS,PERFIL"){
            controlarVerInfo = true
            let menu = document.getElementById("menu")
           // menu.firstElementChild.setAttribute("class", "col-md-3 text-warning")
            verAnadirAlCarroBoton = false
            obtenerNombresHeader(localStorage.getItem("cabeceras"))

            botonCrear()
            barraBusquedaCrear()
            mostrarTodosLosJuegos()
        }

        if(localStorage.getItem("cabeceras") == "TIENDA,BIBLIOTECA,PERFIL"){
            //botonCarrito()
            obtenerNombresHeader(localStorage.getItem("cabeceras"))
            mostrarTodosLosJuegosComprador()
        }

        if(localStorage.getItem("cabeceras") == "TUS JUEGOS,ESTADISTICAS,PERFIL"){

            obtenerNombresHeader(localStorage.getItem("cabeceras"))
            botonCrear()
            juegosDessarollador()
        }

    }
    else{
        loginVista()
    }

 }

    function mostrarModal(texto) {
      const modal = document.getElementById('modal');
      const modalTexto = document.getElementById('modal-texto');
      //const contenido = document.getElementById('contenido');

      modalTexto.textContent = texto;

      // Aplica el blur al contenido y muestra el modal
      cuerpo.classList.add('borroso');
      modal.style.display = 'block';

      // Ocultar todo después de 3 segundos
      setTimeout(() => {
        cuerpo.classList.remove('borroso');
        modal.style.display = 'none';
      }, 2000);
    }

    //mostrarModal("Hola Mundo")

//localStorage.clear()

//mick@example.com   mick

/*

php artisan tinker

use App\Models\User;
use Illuminate\Support\Facades\Hash;

User::create([
    'nombre_usuario' => 'User', 
    'apellidos' => 'u', 
    'edad' => '23', 
    'username' => 'User', 
    'email' => 'user@example.com', 
    'password' => Hash::make('user'), 
    'billetera' => '150.00',
    'rol' => 'comprador',
    'descripcion' => 'Usuario comprador frecuente'
]); 

User::create([
    'nombre_usuario' => 'Mick', 
    'apellidos' => 'Vikernes', 
    'edad' => '23', 
    'username' => 'Mick', 
    'email' => 'mick@example.com', 
    'password' => Hash::make('mick'), 
    'billetera' => '150.00',
    'rol' => 'admin',
    'descripcion' => 'Administrador del sistema'
]); 

User::create([
    'nombre_usuario' => 'Enrrique', 
    'apellidos' => 'Santos', 
    'edad' => '21', 
    'username' => 'Ensdan', 
    'email' => 'en@example.com', 
    'password' => Hash::make('en'), 
    'billetera' => '150.00',
    'rol' => 'vendedor',
    'descripcion' => 'Vendedor con experiencia en juegos de estrategia'
]); 

User::create([
    'nombre_usuario' => 'Enrri', 
    'apellidos' => 'San', 
    'edad' => '21', 
    'username' => 'Ens', 
    'email' => 'enrri@example.com', 
    'password' => Hash::make('enri'), 
    'billetera' => '150.00',
    'rol' => 'vendedor',
    'descripcion' => 'Desarrollador indie apasionado por la simulación'
]);



INSERT INTO games (nombre_juego, fecha_salida, precio, genero, pegi, ventas, id_usuario_publicador, descripcion) VALUES
('Shadow Realms', '2023-05-10', 49.99, 'RPG', 16, 0, 3, 'Un oscuro RPG de acción con múltiples finales.'),
('Cyber Drift', '2022-11-22', 39.99, 'Carreras', 12, 0, 3, 'Carreras futuristas en ciudades cibernéticas.'),
('Kingdom Clash', '2024-01-15', 59.99, 'Estrategia', 12, 0, 3, 'Juego de estrategia en tiempo real con multijugador.'),
('Void Walker', '2023-08-30', 29.99, 'Acción', 18, 0, 4, 'Explora dimensiones paralelas en este juego de acción.'),
('Pixel Builder', '2021-03-10', 19.99, 'Simulación', 3, 0, 4, 'Simulador de construcción con gráficos pixelados.'),
('Galactic Wars', '2022-09-01', 44.99, 'Shooter', 18, 0, 4, 'Shooter espacial con intensas batallas multijugador.');




INSERT INTO libraries (id_user, id_game) VALUES
(1, 1),  
(1, 2), 
(1, 4); 



INSERT INTO tags (id, nombre_etiqueta) VALUES
(1, "RPG"),  
(2, "Carreras"), 
(3, "Estrategia"),
(4, "Acción"),
(5, "Simulación"),
(6, "Shooter"); 



php artisan make:model Tag -fm
php artisan make:controller TagController
*/

