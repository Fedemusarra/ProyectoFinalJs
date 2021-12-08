function redirect(){
    window.location.replace("../html/paneladmin.html");
}

function redirectIndex(){
    window.location.replace("../index.html");
}

var mensaje = $(".mensaje");
var userInfo = {nombre: $("newNombre").val(), apellido: $("#newApellido").val(), dni: $("#newDni").val(), email: $("#newEmail").val(), user: $("#newUsuario").val(), pass: $("#newPassword").val()};


$("#btnRegistro").click(function (e){
    e.preventDefault();
    newUserName = $("#newNombre").val();
    newUserApellido = $("#newApellido").val();
    newUserDni = $("#newDni").val();
    newUserEmail = $("#newEmail").val();
    newUserUser = $("#newUsuario").val();
    newUserPass = $("#newPassword").val();

    let opcion = confirm("Confirma el registro del usuario " + newUserUser + "?");

    if (opcion == true){
        localStorage.setItem (newUserUser , newUserPass)
        mensaje.html("Registro completado correctamente, redireccionando..");
        $
        setTimeout (redirectIndex , 3000);
    }
    else (mensaje.html("Complete el registro nuevamente."));
})



