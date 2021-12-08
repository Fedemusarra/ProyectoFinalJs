function redirect(){
    window.location.replace("../html/paneladmin.html");
}

function redirectIndex(){
    window.location.replace("../index.html");
}

function redirectCuenta (){
    window.location.replace("../html/micuenta.html");
}

//Variables Carrito

const carrito = document.querySelector('#carrito');
const contenedorCarrito = $("#lista-carrito tbody");
const listaProductos = $("#listaProductos");
let productosCarrito = [];
var totalCompra = 0;
//const totalGral = $("#totaGral");

$(".agregar-carrito").click(agregarCarrito);
carrito.addEventListener('click' , eliminaProd);
document.addEventListener('DOMContentLoaded', () => {

    productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    productosCarrito.forEach(function(prod) {
        totalCompra += parseInt(prod.precio);
    });
    carritoHtml();
    total = document.getElementById("totalCompraGral");
    total.innerHTML = `${totalCompra}`;
})

function agregarCarrito (e){
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")){
        const prodSelect = e.target.parentElement.parentElement;
        buscaDatos(prodSelect);
    }
}

function eliminaProd(e) {  
    location.reload();
    if(e.target.classList.contains("borrarProd")){
        const prodId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter (prod => prod.id !== prodId);
        carritoHtml();

    }

}

function buscaDatos(prod){
    const datoProd = {
        imagen: prod.querySelector('img').src,
        titulo: prod.querySelector('h3 a').textContent,
        precio: prod.querySelector('.price-mob').textContent,
        id: prod.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = productosCarrito.some(prod => prod.id === datoProd.id);
    if (existe){
        const articulos = productosCarrito.map( prod => {
            if(prod.id === datoProd.id){
                prod.cantidad++;
                return prod;
            }
            else {
                return prod;
            }
        });
        productosCarrito = [...articulos];
    }
    else {
        productosCarrito = [...productosCarrito , datoProd];
    }

    console.log(productosCarrito);
    carritoHtml();
}

function carritoHtml() {

    //LIMPIAR HTML
    limpiarHTML();

    productosCarrito.forEach( prod => {
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${prod.imagen}" class="imagenCarrito"></td>
            <td>${prod.titulo}</td>
            <td>${prod.cantidad}</td>
            <td id="price">${prod.precio}</td>
            <td>
                <a href="#" class="borrarProd" data-id="${prod.id}"> X </a>
            </td>
        `;
        //AGREGA HTML AL TBODY
        contenedorCarrito.append(row);
    });

    //AGREGA EL CARRITO A LOCALSTORAGE
    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function limpiarHTML() {
    const listaProd = document.getElementById("carritoTbody");
    listaProd.innerHTML = ` `;
}