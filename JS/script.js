function redirect() {
    window.location.replace("../html/paneladmin.html");
}

function redirectIndex() {
    window.location.replace("../index.html");
}
$("#carrito").hide();

$("#carroLogo").click(function(e) {
    e.preventDefault()
    $("#carrito").toggle();
});

//Variables Carrito

const carrito = document.querySelector('#carrito');
const contenedorCarrito = $("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector('#boton-vaciar');
const listaProductos = $("#listaProductos");
let productosCarrito = [];

$(".agregar-carrito").click(agregarCarrito);
carrito.addEventListener('click', eliminaProd);
document.addEventListener('DOMContentLoaded', () => {

    productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHtml();
    obtenerDatos();

})


function vaciaCarrito() {
    productosCarrito = [];
    limpiarHTML();
}


function agregarCarrito(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const prodSelect = e.target.parentElement.parentElement;
        buscaDatos(prodSelect);
    }
}

function eliminaProd(e) {

    if (e.target.classList.contains("borrarProd")) {
        const prodId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(prod => prod.id !== prodId);
        carritoHtml();

    }

}

function buscaDatos(prod) {
    const datoProd = {
        imagen: prod.querySelector('img').src,
        titulo: prod.querySelector('h3').textContent,
        precio: prod.querySelector('.price-mob').textContent,
        id: prod.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = productosCarrito.some(prod => prod.id === datoProd.id);
    if (existe) {
        const articulos = productosCarrito.map(prod => {
            if (prod.id === datoProd.id) {
                prod.cantidad++;
                return prod;
            } else {
                return prod;
            }
        });
        productosCarrito = [...articulos];
    } else {
        productosCarrito = [...productosCarrito, datoProd];
    }

    console.log(productosCarrito);
    carritoHtml();
}

function carritoHtml() {

    //LIMPIAR HTML
    limpiarHTML();

    productosCarrito.forEach(prod => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${prod.imagen}" class="imagenCarrito"></td>
            <td>${prod.titulo}</td>
            <td>${prod.cantidad}</td>
            <td>${prod.precio}</td>
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

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function limpiarHTML() {
    const listaProd = document.getElementById("carritoTbody");
    listaProd.innerHTML = ` `;
}



//API

function obtenerDatos() {

    let url = `https://ws.smn.gob.ar/map_items/weather`;

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function() {

        if (this.status == 200 && this.readyState == 4) {

            let datos = JSON.parse(this.responseText);
            let datosBA = datos[56];
            console.log(datosBA);
            let city = document.querySelector('#city');
            let temp = document.querySelector('#temp');
            let hum = document.querySelector('#hum');
            city.innerHTML = `<p>Ciudad: ${datosBA.name}</p>`;
            temp.innerHTML = `<p>Temperatura: ${datosBA.weather.temp}</p>`
            hum.innerHTML = `<p>Humedad: ${datosBA.weather.humidity}%</p>`
        }

    }

}
// FIN API