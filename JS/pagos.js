var cardDrop = document.getElementById('card-dropdown');
var activeDropdown = ''
cardDrop.addEventListener('click',function(){
  var node = '';
  for (let i = 0; i < this.childNodes.length-1; i++)
    node = this.childNodes[i];
    if (node.className === 'dropdown-select-pagos') {
      node.classList.add('visible');
       activeDropdown = node; 
    };
});

window.onclick = function(e) {
  //console.log(e.target.tagName)
  //console.log('dropdown');
  //console.log(activeDropdown)
  if (e.target.tagName === 'LI' && activeDropdown){
    if (e.target.innerHTML === 'Master Card') {
      document.getElementById('credit-card-image').src = 'https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png';
          activeDropdown.classList.remove('visible');
      activeDropdown = null;
      e.target.innerHTML = document.getElementById('current-card').innerHTML;
      document.getElementById('current-card').innerHTML = 'Master Card';
    }
    else if (e.target.innerHTML === 'American Express') {
         document.getElementById('credit-card-image').src = 'https://dl.dropboxusercontent.com/s/f5hyn6u05ktql8d/amex-icon-6902.png';
          activeDropdown.classList.remove('visible');
      activeDropdown = null;
      e.target.innerHTML = document.getElementById('current-card').innerHTML;
      document.getElementById('current-card').innerHTML = 'American Express';      
    }
    else if (e.target.innerHTML === 'Visa') {
         document.getElementById('credit-card-image').src = 'https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png';
          activeDropdown.classList.remove('visible');
      activeDropdown = null;
      e.target.innerHTML = document.getElementById('current-card').innerHTML;
      document.getElementById('current-card').innerHTML = 'Visa';
    }
  }
  else if (e.target.className !== 'dropdown-btn-pagos' && activeDropdown) {
    activeDropdown.classList.remove('visible');
    activeDropdown = null;
  }
}

function redirectCuenta (){
    window.location.replace("../html/micuenta.html");
}


function redirect(){
    window.location.replace("../html/paneladmin.html");
}

function redirectIndex(){
    window.location.replace("../index.html");
}

//Variables Carrito

const carrito = document.querySelector('#carrito');
const contenedorCarrito = $("#lista-carrito tbody");
const listaProductos = $("#listaProductos");
let productosCarrito = [];
var totalCompra = 0;

$(".agregar-carrito").click(agregarCarrito);
carrito.addEventListener('click' , eliminaProd);
document.addEventListener('DOMContentLoaded', () => {

    productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    calculoTotal()
    carritoHtml();
})

function calculoTotal (){
    productosCarrito.forEach(function(prod) {
        totalCompra += parseInt(prod.precio);
    });
    total = document.getElementById("totalCompraGral");
    total.innerHTML = `${totalCompra}`;
}

function agregarCarrito (e){
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")){
        const prodSelect = e.target.parentElement.parentElement;
        buscaDatos(prodSelect);
    }
}

function eliminaProd(e) {  

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

