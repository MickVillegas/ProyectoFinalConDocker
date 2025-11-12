async function cambiarContraseña(event) {
event.preventDefault();

let correo = document.getElementById("correo").value;
let contrasenaNueva = document.getElementById("contrase").value;

cambioCont = {
    password: contrasenaNueva
}
  try {
        let rep = await fetch("https://owlstore.zapto.org/api/cambiarContrasenia/" + correo, {
            method: "PUT",
            body: JSON.stringify(cambioCont),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });


if (!rep.ok) {
    alert("Error");
}
else{
    window.location.href = "../index.html";
}
    } catch (error) {
        console.error("Error de red:", error);
    }
}

document.getElementById("subirContraseña").addEventListener("click", cambiarContraseña);