function redirect(){
    window.location.replace("../HTML/paneladmin.html");
}
function redirectIndex(){
    window.location.replace("../index.html");
}
var totalTime = 3;
function timer() {
            $("#btnIngreso").val(totalTime);
            if(totalTime==0){
                redirect();
            }else{
            totalTime-=1;
            setTimeout("timer()",1000);
            }
};
function timerGen() {
    $("#btnIngreso").val(totalTime);
    if(totalTime==0){
        redirectIndex();
    }else{
    totalTime-=1;
    setTimeout("timerGen()",1000);
    }
};

let user = "";
let pass = "";
let error = $("#error");
let welcome = $("#welcome");

$("#btnIngreso").click(function (e){
    e.preventDefault();
    let userUserLogin = $("#userLogin").val();
    let passUserLogin = $("#passwordLogin").val();
    for (let i = 0 ; i < localStorage.length ; i++){
        user = localStorage.key(i);
        pass = localStorage.getItem(user);
            if (user === userUserLogin && pass === passUserLogin){
                welcome.html("Bienvenido, " + userUserLogin + ".");
                $("#btnIngreso").delay(1000 , timerGen());           
                break;
            }
        }
    if ( userUserLogin === "admin" && passUserLogin === "admin"){
        welcome.html("Bienvenido ADMIN, accediendo al panel de control.");
        $("#btnIngreso").delay(1000 , timer());
    }   
    else if (user != userUserLogin && pass != passUserLogin){
        error.html("Datos incorrectos, reintente.").delay(2000).slideUp(400);
    }
})